const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const PATH_NODE_MODULES = path.resolve(__dirname, '../node_modules/');
const PATH_SRC = path.resolve(__dirname, '../src/');

module.exports = merge(common, {
    output: {
        filename: 'static/[name].[hash].min.js',
        chunkFilename: 'static/[name].[hash].min.js',
        crossOriginLoading: 'anonymous',
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/[name].[hash].css',
            chunkFilename: 'static/[name].[hash].css',
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
        new ScriptExtHtmlWebpackPlugin({
            custom: {
                test: /\.js$/,
                attribute: 'crossorigin',
                value: 'anonymous',
            },
            preload: {
                test: /\.js$/,
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                // exclude: /tinymce[\\/]skins[\\/]/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/, // 处理本地less样式文件，开启css module功能
                include: [PATH_SRC],
                exclude: [PATH_NODE_MODULES],
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                    enforce: true,
                },
                antd: {
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    name: 'antd',
                    chunks: 'all',
                    enforce: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'async',
                    enforce: true,
                },
                default: false,
            },
        },
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    // 打包时候自动删除debugger和console的调用代码
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                    },
                    // 打包时自动删除注释，减小文件体积
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
});
