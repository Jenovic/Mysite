const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

/**
 * Webpack Development Configuration
 */
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: `${path.resolve(__dirname, './src/app')}/index.tsx`,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        APP_ENV: JSON.stringify(process.env.APP_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'src/app/tsconfig.json',
        },
      },
      {
        test: /\.s(a|c)ss$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(pdf|ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    port: process.env.APP_PORT,
    open: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    overlay: true,
    proxy: {
      '/api': `http://localhost:${process.env.API_PORT}`,
      '/docs': `http://localhost:${process.env.API_PORT}`,
    },
  },
};
