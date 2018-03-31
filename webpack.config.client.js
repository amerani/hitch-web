const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/client.tsx',
    output: {
        path: path.resolve(__dirname, 'dist/client'),
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