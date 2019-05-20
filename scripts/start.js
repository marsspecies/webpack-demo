const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const configFactory = require('../webpack.dev.config');

const env = {
    NODE_ENV: 'development'
};
// webpack 函数需要传入一个配置对象， 同时传入回调函数就会执行webpack compiler
const config = configFactory(env);
const compiler = webpack(config);
// 使用webpack-dev-server则不需要compiler.run 和 compiler.watch
// compiler.run((err, stats) => {
//     // 编译错误不在err对象内，而是需要使用stats.hasErrors()单独处理
//     if (err || stats.hasErrors()) {
//         // 在这里处理错误
//         console.log('---出现了编译错误--');
//     } else {
//         // 处理完成
//         console.log('----编译完成');
//     }
// });
// compiler.watch(
//     {
//         // watchOptions 示例
//         aggregateTimeout: 300,
//         poll: undefined
//     },
//     (err, stats) => {
//         // 在这里打印 watch/build 结果...
//         console.log(stats);
//     }
// );
console.log(config.devServer);
// 使用了webpack-dev-server的api来手动启动服务，则config.devServer里的配置无效

const app = new DevServer(compiler, {
    //注意此处publicPath必填
    publicPath: config.output.publicPath,
    //HMR配置
    hot: true,
    open: true
});

app.listen(9390, '127.0.0.1', function(err) {
    if (err) {
        console.log(err);
    }
});
