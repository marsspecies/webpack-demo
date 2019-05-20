webpack 打包命令解释

带有打包进度
### webpack --progress

监听文件改变，webpack 给所有的文件安装一个 watcher，如果有任何改变，运行编译
### webpack --watch

开发工具调试开启源码 sourcemap
### webpack --devtool source-map

模块热替换，不重新加载整个网页，通过将已更新的模块替换老模块
### wepack-dev-server --hot

输出结果带色彩
### webpack --color

输出性能数据，可以看到每一步的耗时
### webpack --profile

默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
### webpack --display-modules

搭建本地服务,devServer 会默认开启监听模式
### webpack-dev-server

指定 host 和端口,host 为 0.0.0.0 时接受其他机器打开本服务，如果指定为自己设置的则其他机器无法访问本地服务，只共本地访问
### wepback-dev-server --host 0.0.0.0 --port 3000

配置环境变量,--env参数允许传入任意数量的环境变量，可以赋值，如果不赋值，则如下env.production默认值为true
### wepback --env.NODE_ENV=production --env.production
### wepback-dev-server --env.NODE_ENV=development --env.development

使用指定配置文件
### wepback --config webpack.prod.config.js
### wepback-dev-server --config webpack.dev.config.js
