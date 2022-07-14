import axios from "axios";
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net/',

    // 自定义后端返回的原始数据，
    // data：后端返回的原始数据，就是JSON格式的字符串
    transformResponse: [function (data) {
        try {
            return JSONBig.parse(data)
        } catch (error) {
            return data
        }

        // axios默认会在内部这样来处理后端返回的数据
        // return JSON.parse(data)
    }]
})
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 此种方法为在请求拦截器时，给配置请求添加token认证
// 请求为三步L:发起请求-->请求拦截器--->服务端
// 方法一就时在发起请求时，添加token
request.interceptors.request.use((config) => {
    // config为请求的配置对象
    // console.log(config);
    // 获取token
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`

    }
    // 返回请求配置对象
    return config

}, (error) => {
    return Promise.reject(error)
})
export default request
// mp/v1_0/