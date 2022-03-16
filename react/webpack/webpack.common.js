const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const os = require('os');
const config = require('./config');
const { getPublishPath } = require('./utils/index');

const PATH_NODE_MODULES = path.resolve(__dirname, '../node_modules/');
const PATH_SRC = path.resolve(__dirname, '../src/');

const { name, port, publishPathPrefix } = config;

const publicPath = getPublishPath(name, publishPathPrefix, port);

module.exports = {
    entry: {
        octopus_static: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')],
    },

    plugins: [
        new ProgressBarPlugin(),
        // 在开发时不需要每个页面都引用React
        new webpack.ProvidePlugin({
            React: 'react',
        }),
    ],

    output: {
        library: 'ReactMicroApp',
        libraryTarget: 'umd',
        filename: 'static/[name].[hash].js',
        chunkFilename: 'static/[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: publicPath,
        jsonpFunction: 'octopus_static_Jsonp',
    },

    resolve: {
        alias: {
            util: path.resolve(__dirname, '../src/util/'),
            '@': path.resolve(__dirname, '../src/'),
        },
        extensions: ['.js', '.jsx'], // require时省略的扩展名,如：require('module') 不需要module.js
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 转化ES6语法
                include: [PATH_SRC],
                exclude: [PATH_NODE_MODULES],
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve('.cache-loader'),
                        },
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: os.cpus() - 1,
                            workerParallelJobs: 50,
                            poolTimeout: 2000,
                            poolParallelJobs: 50,
                            name: 'my-pool',
                        },
                    },
                    'babel-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 11920,
                            name: `static/img/[name].[ext]`,
                        },
                    },
                ],
            },
        ],
    },
};
