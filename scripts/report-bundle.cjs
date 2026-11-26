const fs = require('node:fs');
for (const file of ['lib/index.cjs','lib/index.mjs']) {
 const data = fs.readFileSync(file);
 console.log(file, data.length, 'bytes', require('node:zlib').gzipSync(data).length, 'gzip bytes');
}
