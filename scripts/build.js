const webpack = require('webpack');
const configFactory = require('../config/webpack.prod.config');
const env = {
    NODE_ENV: 'production'
};
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
// webpack 函数需要传入一个配置对象， 同时传入回调函数就会执行webpack compiler
const config = configFactory(env);
webpack(config, (err, stats) => {
    // 编译错误不在err对象内，而是需要使用stats.hasErrors()单独处理
    if (err || stats.hasErrors()) {
        // 在这里处理错误
        console.log(err);
        console.log('---出现了编译错误--');
    } else {
        // 处理完成
        console.log('----编译完成');
    }
});
