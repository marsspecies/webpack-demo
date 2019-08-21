const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack.dev.config');
const opener = require('opener');
const net = require('net');

const env = {
    NODE_ENV: 'development'
};
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
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
// 使用了webpack-dev-server的api来手动启动服务，则config.devServer里的配置无效

const app = new DevServer(compiler, {
    //注意此处publicPath必填
    publicPath: config.output.publicPath,
    //HMR配置
    hot: true,
    open: true
});

function startServer(port, cb = (err, port) => {}) {
    var server = net.createServer().listen(port, '127.0.0.1');
    server.on('listening', function() {
        // 端口未被占用
        server.close(() => {
            cb(null, port);
        });
    });
    server.on('error', function(err) {
        if (err.code === 'EADDRINUSE') {
            // 端口已经被占用
            startServer(port + 1, cb);
        } else {
            cb(err);
        }
    });
}
startServer(3000, (err, port) => {
    if (err) {
        console.log(`server error: ${err} `);
    } else {
        app.listen(port, '127.0.0.1', function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`start server : http://localhost:${port}`);
                opener(`http://localhost:${port}`);
            }
        });
    }
});
