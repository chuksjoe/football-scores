const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'less-loader', 'css-loader']
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, 'build/'),
        publicPath: '/build',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://localhost:3000/build/',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('public/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
