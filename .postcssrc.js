//将px转换成rem
module.exports = {
    plugins: {
        // 因为vue.cli内部已经配置了autoprefixer 插件
        //而这里又配置了一次，所以产生冲突，运行的时候会报错
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        'postcss-pxtorem': {
            // lib-flexable的rem适配方案，把一行分为10份，每份就是十分之一
            // 设计稿是750，应该为75，但是vant设置为37.5因为vant是基于375写的
            // 如何解决？
            // 通过查阅文档我们知道rootVlaue可以支持两种类型数值和函数
            // 且postcss-pxtorem处理每个CSS文件的时候都会来调用这个函数，他会把被处理
            // 的CSS文件相关信息通过参数传递给该函数

            // rootValue: 37.5,
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },

            // 配置要转换的CSS属性
            // *表示所有
            propList: ['*']
        }
    }
}