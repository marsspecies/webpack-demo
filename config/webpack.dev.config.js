const webpack = require('webpack');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const merge = require('webpack-merge');

module.exports = env => {
    const baseConfig = require('./webpack.config')(env);

    const mergeStrategy = merge.strategy({
        'output.path': 'replace',
        'output.publicPath': 'replace',
        plugins: 'append',
        'module.rules': 'append'
    });
    const devConfig = {
        // entry: { 'watch-html': './watch-html.js' },
        /* 设置为development时打包出来的文件是不被压缩过的，可以分析打包的模块代码 */
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './',
            open: true,
            // port: '3000',
            inline: true, //设置为true，当源文件改变的时候会自动刷新
            historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
            hot: true, //允许热加载
            watchOptions: {
                ignored: /node_modules/,
                aggregateTimeout: 300,
                poll: 500
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
            // new OpenBrowserPlugin({
            //     url: `http://localhost:8000`
            // })
        ]
    };
    return mergeStrategy(baseConfig, devConfig);
};
