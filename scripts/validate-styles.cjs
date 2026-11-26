const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sass = require('sass');
for (const name of ['styles.css','tokens.css']) {
  const css = fs.readFileSync(path.join('lib',name),'utf8');
  assert.ok(css.trim().length, name + ' is empty');
  for (const match of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const url = match[1].trim();
    if (/^(data:|https?:|\/\/|#)/i.test(url)) continue;
    assert.ok(!url.startsWith('/'), 'Nonportable asset: '+url);
    assert.ok(fs.existsSync(path.resolve('lib',url.split(/[?#]/)[0])), 'Missing asset: '+url);
  }
}
assert.equal(sass.compile('lib/scss/tokens.scss').css, fs.readFileSync('lib/tokens.css','utf8'));
console.log('Packaged styles validated');
