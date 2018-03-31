const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            }
        ]
    }
}