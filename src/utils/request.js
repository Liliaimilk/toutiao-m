import axios from "axios";
import store from '@/store'
import JSONBig from 'json-bigint'
import { setTimeSamp } from "./auth";
import router from "@/router";
// import { mapGetters } from "vuex";
const timesamp = 3600
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net/',

    // 自定义后端返回的原始数据，
    // data：后端返回的原始数据，就是JSON格式的字符串
    transformResponse: [function (data) {
        try {
            // console.log(data);
            return JSONBig.parse(data)
        } catch (error) {
            // console.log('123');
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
    // 客户端主动验证
    if (isCheckTimeSamp()) {
        store.commit('login/logout')
        router.push('./login')
        return Promise.reject(new Error('登录超时'))
    }
    const { user } = store.getters
    console.log(store);
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`

    }
    // 返回请求配置对象
    return config

}, (error) => {
    // 系统返回检验
    if (error.response.data.code === 401) {
        store.commit('login/logout')
        router.push('./login')
        return Promise.reject(new Error('登录超时'))
    }
    return Promise.reject(error)
})


function isCheckTimeSamp() {
    return ((Date.now() - setTimeSamp()) * 1000 > timesamp)
}
export default request
// mp/v1_0/