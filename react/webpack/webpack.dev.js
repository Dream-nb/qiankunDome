const ip = require('ip');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const PATH_NODE_MODULES = path.resolve(__dirname, '../node_modules/');
const PATH_SRC = path.resolve(__dirname, '../src/');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
            ignoreOrder: true, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            // html插件
            template: path.resolve(__dirname, '../src/index.ejs'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            chunksSortMode: 'none',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/, // eslint检查
                enforce: 'pre',
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
                        loader: 'eslint-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                // exclude: /tinymce[\\/]skins[\\/]/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/, // 处理本地less样式文件，开启css module功能
                include: [PATH_SRC],
                exclude: [PATH_NODE_MODULES],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve('.cache-loader'),
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/, // 处理依赖包中的less样式文件，不开启css module功能
                include: [PATH_NODE_MODULES],
                exclude: [PATH_SRC],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve('.cache-loader'),
                        },
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
        ],
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
    },

    stats: {
        builtAt: true,
    },

    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        port: 10100,
        disableHostCheck: true,
        hot: true,
        headers:{
            "Access-Control-Allow-Origin": "*",
        }
    },
});
