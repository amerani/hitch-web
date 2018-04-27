const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production'
const APP_DIR = path.resolve(__dirname, './src');
const MODULES_DIR = path.resolve(__dirname, './node_modules');

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: '  source-map',
    entry: {
        app: `${APP_DIR}/client.tsx`,
        react: [
            'react','react-dom','react-router-dom',
            'apollo-client', 'apollo-link-http',
            'apollo-cache-inmemory', 'react-apollo',
            'apollo-link'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                loader: 'ts-loader',
                exclude: [
                    /node_modules/,
                    `${APP_DIR}/server.tsx`
                ],
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.client.json')
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [APP_DIR, MODULES_DIR]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    optimization: {
          runtimeChunk: {
              name: "manifest"
          },
          splitChunks: {
              cacheGroups: {
                  vendor: {
                      test: /[\\/]node_modules[\\/]/,
                      name: "vendors",
                      priority: -20,
                      chunks: "initial"
                  },
                  commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                  }
              }
          }
     }
}