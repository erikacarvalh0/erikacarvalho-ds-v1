const assert = require('node:assert/strict');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { Card } = require('@erikacarvalho/react');
const render = props => renderToStaticMarkup(React.createElement(Card, props));
assert.ok(!render({children:'Content'}).includes('<header>'));
assert.ok(render({title:'Title',subtitle:'Subtitle'}).includes('<h3'));
assert.ok(render({customClass:'dashboard-card'}).includes('card dashboard-card'));
