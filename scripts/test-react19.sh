#!/usr/bin/env bash
set -euo pipefail
root="$(pwd)"
tmp="$(mktemp -d)"
pid=""
trap 'if [ -n "$pid" ]; then kill "$pid" || true; fi; rm -rf "$tmp"' EXIT
npm pack --pack-destination "$tmp"
cp "tests/browser/hydration.cjs" "$tmp/check.cjs"
cd "$tmp"
npm init -y >/dev/null
npm install --legacy-peer-deps next@15.5 react@19.1.0 react-dom@19.1.0 playwright ./*.tgz
npx playwright install --with-deps chromium
mkdir pages
cat > pages/index.js <<'EOF'
import { useState } from 'react';
import { Button } from '@erikacarvalho/react';
export default function Home() {
 const [count,setCount] = useState(0);
 return <><Button text="ECDS hydration smoke" action={()=>setCount(count+1)} /><p>Clicked: {count}</p></>;
}
EOF
cat > pages/_app.js <<'EOF'
import '@erikacarvalho/react/styles.css';
export default function App({Component,pageProps}) {return <Component {...pageProps}/>;}
EOF
npx next build
./node_modules/.bin/next start -p 4173 > server.log 2>&1 &
pid=$!
for i in $(seq 1 60); do if curl -fsS http://localhost:4173 >/dev/null; then break; fi; sleep 1; done
node check.cjs
if [ -f visual-smoke.png ]; then cp visual-smoke.png "$root/visual-smoke.png"; fi
