
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = require('./paths');
const merge = require('webpack-merge');

const mergeStrategy = merge.strategy({
    'entry.vendor': 'prepend',
    plugins: 'append',
    'module.rules': "append",
    'output.path': 'replace',
    'output.publicPath': 'replace'
});

module.exports = (env) => {
    const baseConfig = require('./webpack.config')(env);
    const prodConfig = {
        // mode: 'production',
        plugins: [
            // 在build之前清空原来的文件
            new CleanWebpackPlugin({
                root: paths.appBuild,
                verbose: true,
                dry: false
            }),
            // css压缩
            new optimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                // 引入cssnano配置压缩选项
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                // 是否将插件信息打印到控制台
                canPrint: true
            }),
            //HashedModuleIdsPlugin，推荐用于生产环境构建：使用这个可以实现缓存，那些没有改变的文件就不会随着每次构建而改变了，节约资源
            new webpack.HashedModuleIdsPlugin(),
            new BundleAnalyzerPlugin()
        ]
    };
    return mergeStrategy(baseConfig, prodConfig);
}