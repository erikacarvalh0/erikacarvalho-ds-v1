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
  const input = { ...common, entry: './src/atoms/Input/index.tsx' };
  const select = { ...common, entry: './src/atoms/Select/index.tsx' };
  return [
    { ...common, output: { path: path.resolve(__dirname, 'lib'), filename: 'index.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...common, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'index.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
    { ...button, output: { path: path.resolve(__dirname, 'lib'), filename: 'Button.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...button, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'Button.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
    { ...card, output: { path: path.resolve(__dirname, 'lib'), filename: 'Card.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...card, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'Card.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
    { ...input, output: { path: path.resolve(__dirname, 'lib'), filename: 'Input.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...input, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'Input.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
    { ...select, output: { path: path.resolve(__dirname, 'lib'), filename: 'Select.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...select, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'Select.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
  ];
};
