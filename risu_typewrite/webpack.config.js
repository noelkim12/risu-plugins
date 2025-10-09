const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { PLUGIN_NAME, PLUGIN_VERSION } = require('./src/constants');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'risu_typewrite.js',
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
      banner: `//@name ${PLUGIN_NAME}
//@display-name ${PLUGIN_NAME}_v${PLUGIN_VERSION}
//@version ${PLUGIN_VERSION}
//@description ${PLUGIN_NAME} for RISU AI`,
      raw: true
    })
  ],
};
