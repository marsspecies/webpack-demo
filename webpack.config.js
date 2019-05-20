const webpack = require('webpack');
const path = require('path');
/* extract-text-webpack-plugin在webpack4中已经被弃用,可以通过npm i extract-text-webpack-plugin@next 下载最新的测试版，官方推荐使用extract-loader */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * entry: 入口，webpack执行构建的第一步将从构建开始，相当于输入
 *  在webpack里面一切皆模块，一个模块对应一个文件，webpack会从entry开始递归找出所有依赖的模块
 * chunk: 代码块，一个chunk由多个模块组成，用于代码分割
 * loader: 模块转换器，用于将模块的内容按照需求转换成新的内容
 * plugins: 扩展插件，在构建中的特定时机注入扩展逻辑，来改变构建结果，做我们想做的事情，达到我们想要的结果
 * module: 配置模块（也就是文件）的处理规则，会根据配置的loader去找出对应的转换规则，对module进行转换后，再解析出当前module依赖的module，这些模块会以entry为单位进行分组，一个entry所依赖的所有module被分到一个组也就是一个chunk,最后webpack会讲所有chunk转换为文件输出，在整个流程中，webpack会在恰当的时机执行plugin中的逻辑
 * resolve: 配置寻找模块的规则，比如给path起别名，在项目中模块引入的path会更方便简洁
 *  output: 输出结果，在webpack经过一系列的处理后得到我们最终想要输出的结果
 * devServer: 配置开发环境的服务
 * */

// 打包前先清空dist文件夹下的文件，保证dist下的都是最新打包输出的文件
const pathsToClean = ['dist'];
 
module.exports = (env) => {

    return {
        /* webpack在寻找相对路径的文件的时候会以context为根目录 */
        context: path.resolve(__dirname, './'),
        
        /* entry 的值类型 string为单入口， array和object 为多入口， string和array只会生成一个chunk,这时chunk的名称为main，如果entry是一个object，可能会出现多个chunk，这时的chunk名称是key值 */
        entry: './index.js',
        output: {
            /* 文件hash命名方式：hash --》跟整个项目的构建有关，构建生成的文件使用同一个hash值，只要项目里面的文件有更改整个项目构建的hash值都会变；chunkhash --》根据chunk的改变而改变，chunk是由一组有依赖关系的模块组成的，如果其中一个模块有改变，整个chunk的hash值都会改变 */
            // 开发环境不需要设置hash做缓存更新，因为已经做了监听
            filename: env.NODE_ENV === 'production'?'[name]_[contenthash:8].js': '[name].js',
            // 用于指定在运行过程中生成的chunk输出的文件名称，会在运行时生成chunk的场景有使用commonChunkPlugin提取公共部分代码、使用import('path/to/module')函数动态加载模块等
            chunkFilename: env.NODE_ENV === 'production'?'[name]_[contenthash:8].js': '[name].js',
            path: path.resolve(__dirname, './dist')
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        "file-loader",
                        "extract-loader",
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: true,
                                removeComments: false,
                                collapseWhitespace: false,
                                root: path.resolve(__dirname, 'assets'),
                                attrs: ['link:href']
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    // use: ExtractTextPlugin.extract(['css-loader'])
                    /* 生产环境使用推荐的 extract-loader */
                    use: env.NODE_ENV === 'production'?[
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name].[contenthash:8].[ext]'
                            }
                        }, 
                        // 把当前模块内容从js里面提取出来，单独生成一个文件
                        MiniCssExtractPlugin.loader, 
                        'css-loader' // 从数组的后面往前读取执行
                    ]:[
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|png)$/,
                    use: 'file-loader'
                }
            ]
        },
        plugins: [
            /* 最新版contenthash被弃用 */
            // new ExtractTextPlugin({
            //     filename: `assets/[name]_[chunkhash:8].css`
            // }),
            
            
            // html-webpack-plugin默认使用ejs做模版
            new HtmlWebpackPlugin({
                // 在ejs中可以通过htmlWebpackPlugin.options.title来获取
                title: 'this is a webpack-demo',
                // 模版文件路径
                template: './index.ejs',
                // 输出文件路径及名称
                filename: 'index.html',
                // 可选值true || 'head' || 'body' || false，将所有资源注入到输出的html文件里，传递true或'body'将所有javascript资源放在body元素底部，'head'将javasctipt资源放在head元素中
                inject: true,
                // templateParameters配置后，无法再通过htmlWebpackPlugin在模版里面来获取参数
                templateParameters: {
                    title: 'this is a webpack-demo',
                    author: 'zhangjing'
                },
                // 使用CSP内容安全策略
                meta: {
                    /* 'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
                    // Will generate: <meta http-equiv="Content-Security-Policy" content="default-src https:">
                    // Which equals to the following http header: `Content-Security-Policy: default-src https:`
                    'set-cookie': { 'http-equiv': 'set-cookie', content: 'name=value; expires=date; path=url' },
                    // Will generate: <meta http-equiv="set-cookie" content="value; expires=date; path=url">
                    // Which equals to the following http header: `set-cookie: value; expires=date; path=url` */
                  }
            }),
            // 提取css插入到html
            new MiniCssExtractPlugin({
                filename:  env.NODE_ENV === 'production'? 'assets/[name].[contenthash].css': 'assets/[name].css',
                chunkFilename: env.NODE_ENV === 'production'? '[id].[contenthash].css': '[id].css'
            })
        ]
    }
};
