const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'risu-typewrite.js',
    library: {
      type: 'var',
      name: 'RisuTypewrite'
    },
    clean: true
  },
  mode: 'production',
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // 헤더 주석 제거
          },
        },
        extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `//@name Risu Typewrite
//@display-name Risu Typewrite_v0.1
//@version 0.1
//@description Risu Typewrite for RISU AI`,
      raw: true
    })
  ],
};
