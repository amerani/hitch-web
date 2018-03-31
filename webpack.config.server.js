const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    target: 'node',
    entry: './src/server.js',
    output: {
        path: path.resolve(__dirname, 'dist/server'),
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

