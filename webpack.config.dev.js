const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: `${path.resolve(__dirname, './src/app/')}/index.tsx`,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        SITE_ENV: JSON.stringify(process.env.SITE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      //favicon: './src/app/assets/icon.png', /TO BE ADDED/
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
          configFile: 'tsconfig.json',
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
    port: process.env.SITE_PORT,
    open: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    overlay: true,
  },
};
