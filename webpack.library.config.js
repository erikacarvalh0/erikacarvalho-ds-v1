const path = require('path');
const base = require('./webpack.config');
module.exports = (_, argv) => {
  const config = base(_, argv);
  const common = {
    mode: 'production',
    entry: './src/library.ts',
    resolve: config.resolve,
    module: config.module,
    optimization: { splitChunks: false, runtimeChunk: false },
  };
  const button = { ...common, entry: './src/atoms/Button/index.tsx' };
  const card = { ...common, entry: './src/atoms/Card/index.tsx' };
  return [
    { ...common, output: { path: path.resolve(__dirname, 'lib'), filename: 'index.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...common, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'index.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
    { ...button, output: { path: path.resolve(__dirname, 'lib'), filename: 'Button.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...button, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'Button.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
    { ...card, output: { path: path.resolve(__dirname, 'lib'), filename: 'Card.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...card, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'Card.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
  ];
};
