const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, './'),
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'aframe-vimeo-component.js',
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
      },
    ],
  },
  node: {
    fs: 'empty' // fs not available on Glitch
  }
};