const path = require('path');

module.exports = {
  entry: './src/mon.js',
  output: {
    // libraryTarget:'umd',
    // umdNamedDefine: true,
    path: path.resolve(__dirname, 'lib'),
    filename: 'mon.js'
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader'}
    ]
  }
};