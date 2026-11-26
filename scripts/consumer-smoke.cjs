const assert = require('node:assert/strict');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const library = require('../lib/index.cjs');
assert.equal(typeof library.Button, 'function');
assert.match(renderToStaticMarkup(React.createElement(library.Button, { text: 'ECDS smoke' })), /ECDS smoke/);
assert.ok(library.ButtonModule.Button === library.Button);
console.log('Consumer SSR smoke passed');
