const path = require('path');
const base = require('./webpack.config');
module.exports = (_, argv) => {
  const config = base(_, argv);
  return {
    mode: 'production',
    entry: './src/library.ts',
    resolve: config.resolve,
    module: config.module,
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'index.cjs',
      library: { type: 'commonjs2' },
      clean: true,
      publicPath: '',
    },
    externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' },
    optimization: { splitChunks: false, runtimeChunk: false },
  };
};
