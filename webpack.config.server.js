const webpack = require('webpack');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: 'inline-source-map',
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
                    configFile: path.resolve(__dirname, 'tsconfig.server.json')
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
}

