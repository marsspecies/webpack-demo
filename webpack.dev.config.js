const webpack = require('webpack');

const merge = require('webpack-merge');

module.exports = env => {
    const baseConfig = require('./webpack.config')('development');

    const mergeStrategy = merge.strategy({
        'output.path': 'replace',
        'output.publicPath': 'replace',
        plugins: 'append',
        'module.rules': 'append'
    });
    const devConfig = {
        /* 设置为development时打包出来的文件是不被压缩过的，可以分析打包的模块代码 */
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            contentBase: './',
            open: true,
            // port: '3000',
            inline: true, //设置为true，当源文件改变的时候会自动刷新
            historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
            hot: true //允许热加载
        },
        plugins: [new webpack.HotModuleReplacementPlugin()]
    };
    return mergeStrategy(baseConfig, devConfig);
};
