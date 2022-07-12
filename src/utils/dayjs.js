import Vue from "vue";
import dayjs from "dayjs";
// 加载中文包
import 'dayjs/locale/zh-cn';
// 全局使用
dayjs.locale('zh-cn')

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
console.log(dayjs().format('YYYY-MM-DD'));
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})