import axios from "axios";
import store from '@/store'
axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net/'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 此种方法为在请求拦截器时，给配置请求添加token认证
// 请求为三步L:发起请求-->请求拦截器--->服务端
// 方法一就时在发起请求时，添加token
axios.interceptors.request.use((config) => {
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
export default axios
// mp/v1_0/