#!/usr/bin/env bash
set -euo pipefail
root="$(pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
npm pack --pack-destination "$tmp"
cd "$tmp"
npm init -y >/dev/null
npm install --ignore-scripts react@18.3.1 react-dom@18.3.1 ./*.tgz
node - <<'NODE'
const assert = require('node:assert/strict');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const lib = require('@erikacarvalho/react');
assert.ok(lib.Button);
assert.ok(lib.ButtonModule.Button === lib.Button);
assert.ok(renderToStaticMarkup(React.createElement(lib.Button, {children:'Smoke', text:'Smoke'})));
NODE
