const assert = require('node:assert/strict');
const React = require('react');
const {renderToString} = require('react-dom/server');
const {Select} = require('@erikacarvalho/react');
const render = () => renderToString(React.createElement(Select,{name:'month',label:'Month',options:['January','February']}));
assert.equal(render(),render());
assert.ok(render().includes('type="button"'));
assert.ok(render().includes('aria-expanded="false"'));
