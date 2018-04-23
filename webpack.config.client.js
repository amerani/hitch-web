const webpack = require('webpack');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production'
const APP_DIR = path.resolve(__dirname, './src');
const MODULES_DIR = path.resolve(__dirname, './node_modules');

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: 'inline-source-map',
    entry: {
        client: `${APP_DIR}/client.tsx`,
        App: `${APP_DIR}/App.tsx`,
        AppBar: `${APP_DIR}/AppBar.tsx`,
        BottomNav: `${APP_DIR}/BottomNav.tsx`,
        Search: `${APP_DIR}/Search.tsx`,
        ListPage: `${APP_DIR}/ListPage.tsx`,
        LogInPage: `${APP_DIR}/LogInPage.tsx`,
        SignUpPage: `${APP_DIR}/SignUpPage.tsx`,
        TripPage: `${APP_DIR}/TripPage.tsx`,
        react: [
            'react', 'react-dom', 'react-router', 'react-router-dom', 'react-loadable'
        ],
        material: [
            'material-ui', 'material-ui-pickers'
        ],
        apollo: [
            'react-apollo', 'apollo-client', 'apollo-link-http', 'apollo-link', 'apollo-cache-inmemory',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
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
    optimization: {
        splitChunks: {
            name: false,
            chunks: "async",
            // cacheGroups: {
            //     commons: {
            //         name: "commons",
            //         chunks: "initial",
            //         minChunks: 3
            //     },
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name: "vendors",
            //         chunks: "all",
            //         priority: 10
            //     },
            //     default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true
            //     }
            // }
        }
    }
}