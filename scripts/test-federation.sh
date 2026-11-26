#!/usr/bin/env bash
set -euo pipefail
root="$PWD"
tmp="$(mktemp -d)"
pid=""
trap 'if [ -n "$pid" ]; then kill "$pid" || true; fi; rm -rf "$tmp"' EXIT
yarn webpack --mode development --output-path "$tmp/remote"
cd "$tmp"
npm init -y >/dev/null
npm install react@18.3.1 react-dom@18.3.1 webpack@5 webpack-cli@5 playwright
npx playwright install --with-deps chromium
mkdir host
cat > index.js <<'EOF'
import('./bootstrap');
EOF
cat > bootstrap.js <<'EOF'
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Button} from 'ecds/Button';
createRoot(document.getElementById('root')).render(React.createElement(Button,{text:'Federated Button',action:()=>document.body.dataset.clicked='yes'}));
EOF
cat > webpack.config.js <<'EOF'
const {container:{ModuleFederationPlugin}}=require('webpack');
module.exports={mode:'development',entry:'./index.js',output:{path:require('path').resolve('host'),publicPath:'auto'},plugins:[new ModuleFederationPlugin({name:'host',remotes:{ecds:'ecds@http://localhost:1234/remoteEntry.js'},shared:{react:{singleton:true,requiredVersion:'^18.3.1'},'react-dom':{singleton:true,requiredVersion:'^18.3.1'}}})]};
EOF
npx webpack
echo '<div id="root"></div><script src="/host/main.js"></script>' > index.html
cat > server.cjs <<'EOF'
const http=require('http'),fs=require('fs'),path=require('path');
http.createServer((req,res)=>{const u=req.url.split('?')[0];const f=path.join(process.cwd(),u==='/'?'index.html':u.startsWith('/host/')?u.slice(1):'remote'+u);if(!fs.existsSync(f)){res.writeHead(404);return res.end()}res.setHeader('Content-Type',f.endsWith('.js')?'application/javascript':'text/html');fs.createReadStream(f).pipe(res)}).listen(1234);
EOF
node server.cjs &
pid=$!
node - <<'EOF'
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();try{const p=await b.newPage();await p.goto('http://localhost:1234');await p.getByRole('button',{name:'Federated Button'}).click();if(await p.locator('body').getAttribute('data-clicked')!=='yes')throw Error('Remote click failed')}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
EOF
