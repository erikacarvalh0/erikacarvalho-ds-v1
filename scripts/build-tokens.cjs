const sass = require('sass');
const fs = require('node:fs');
fs.mkdirSync('lib', { recursive: true });
fs.writeFileSync('lib/tokens.css', sass.compile('src/style/tokens.scss').css);
