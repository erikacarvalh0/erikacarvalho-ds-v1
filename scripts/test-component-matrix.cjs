const assert = require('node:assert/strict');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const ds = require('@erikacarvalho/react');
for(const [name,props,expected] of [
 ['Button',{text:'Matrix button',action:()=>{}},'Matrix button'],
 ['Card',{title:'Matrix card',subtitle:'Subtitle'},'Matrix card'],
 ['Accordion',{title:'Matrix accordion',children:'Content'},'Matrix accordion'],
 ['Link',{href:'/test',text:'Matrix link'},'Matrix link'],
 ['Input',{name:'matrix',label:'Matrix input'},'Matrix input'],
 ['Select',{name:'matrix',label:'Matrix select',options:['One','Two']},'Matrix select']
]) {
 assert.equal(typeof ds[name],'function',name);
 assert.ok(renderToStaticMarkup(React.createElement(ds[name],props)).includes(expected),name);
}
