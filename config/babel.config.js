
// 这里的配置也可以放在package.json里面的'babel'字段里面
module.exports = {
    preset: [
        ["react-app", { "flow": false, "typescript": true }]
    ],
    plugins: [
        ['import', {libraryName: 'antd', style: true}],

    ]
}