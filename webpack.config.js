const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(css|less)$/i,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000',
    hot: true
  },
  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      title: 'Football Update WPA',
      template: path.resolve('public/index.html')
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    }),
    new CopyWebpackPlugin([
      { from: 'public/images', to: 'images' },
      { from: 'public/manifest', to: 'manifest' }
    ]),
    new webpack.HotModuleReplacementPlugin()
  ]
};
