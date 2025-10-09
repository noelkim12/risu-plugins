const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lightboard_nai_preset_manager.js',
    library: {
      type: 'var',
      name: 'LightboardNAIPresetManager'
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
      banner: `//@name Lightboard NAI Preset Manager
//@display-name Lightboard NAI Preset Manager_v0.3
//@version 0.3
//@description Lightboard NAI Preset Manager for RISU AI`,
      raw: true
    })
  ],
  // Babel 없이 ES6 모듈 직접 사용
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     }
  //   ]
  // }
};
