const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, './'),
  entry: './app/demo.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'jsx-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'app'),
      },
    ],
  },
  node: {
    fs: 'empty' // fs not available on Glitch
  }
};