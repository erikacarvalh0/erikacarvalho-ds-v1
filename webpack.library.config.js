const path = require('path');
const base = require('./webpack.config');
const { exports: publicExports } = require('./package.json');
module.exports = (_, argv) => {
 const config = base(_, argv);
 const common = {mode:'production',resolve:config.resolve,module:config.module,optimization:{splitChunks:false,runtimeChunk:false}};
 const entries = [['index','./src/library.ts'], ...Object.entries(publicExports).filter(([key,value])=>key!=='.' && typeof value==='object' && value.types).map(([key,value])=>[key.slice(2),value.types.replace('./lib/types/','./src/').replace(/\.d\.ts$/,'.tsx')])];
 return entries.flatMap(([name,entry])=>[
 {...common,entry,output:{path:path.resolve(__dirname,'lib'),filename:name+'.cjs',library:{type:'commonjs2'},publicPath:''},externals:{react:'commonjs react','react-dom':'commonjs react-dom'}},
 {...common,entry,experiments:{outputModule:true},output:{path:path.resolve(__dirname,'lib'),filename:name+'.mjs',library:{type:'module'},publicPath:''},externalsType:'module',externals:{react:'react','react-dom':'react-dom'}}
 ]);
};
