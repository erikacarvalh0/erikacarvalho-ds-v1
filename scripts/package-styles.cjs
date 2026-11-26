const fs = require('node:fs');
const sass = require('sass');
fs.mkdirSync('lib', { recursive: true });
fs.cpSync('src/style', 'lib/scss', { recursive: true });
fs.writeFileSync('lib/tokens.css', sass.compile('src/style/tokens.scss').css);
fs.writeFileSync('lib/styles.css', sass.compile('src/style/default.scss').css);
