var path = require('path');

module.exports = {
  // https://webpack.js.org/guides/getting-started/
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
    open: true,
  }
};