const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'async-node',
    entry: './src/server.tsx',
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json')
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
}

