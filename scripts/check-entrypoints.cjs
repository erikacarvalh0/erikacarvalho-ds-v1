const assert=require('node:assert/strict');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{for(const [name,entry] of Object.entries(require('../package.json').exports)){
 if(typeof entry!=='object')continue;
 for(const key of ['types','import','require'])assert.ok(fs.existsSync(entry[key]),name+' '+key);
 const cjs=require(path.resolve(entry.require));
 const esm=await import(pathToFileURL(path.resolve(entry.import)).href);
 assert.ok(Object.keys(cjs).length,name);
 assert.deepEqual(Object.keys(cjs).filter(k=>k!=='__esModule').sort(),Object.keys(esm).sort(),name);
}})().catch(e=>{console.error(e);process.exitCode=1});
