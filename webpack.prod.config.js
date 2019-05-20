const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const merge = require('webpack-merge');

const mergeStrategy = merge.strategy({
    'entry.vendor': 'prepend',
    plugins: 'append',
    'module.rules': "append",
    'output.path': 'replace',
    'output.publicPath': 'replace'
});

module.exports = (env) => {
    const baseConfig = require('./webpack.config')('production');
    const prodConfig = {
        mode: 'production',
        plugins: [
            // 在build之前清空原来的文件
            new CleanWebpackPlugin({
                root: path.join(__dirname, 'dist'),
                verbose: true,
                dry: false
            }),
        ]
    };
    return mergeStrategy(baseConfig, prodConfig);
}