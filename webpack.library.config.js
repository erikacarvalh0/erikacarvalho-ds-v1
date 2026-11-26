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
  return [
    { ...common, output: { path: path.resolve(__dirname, 'lib'), filename: 'index.cjs', library: { type: 'commonjs2' }, publicPath: '' }, externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' } },
    { ...common, experiments: { outputModule: true }, output: { path: path.resolve(__dirname, 'lib'), filename: 'index.mjs', library: { type: 'module' }, publicPath: '' }, externalsType: 'module', externals: { react: 'react', 'react-dom': 'react-dom' } },
  ];
};
