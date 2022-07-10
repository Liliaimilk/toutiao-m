import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'
Vue.use(Vuex)

// token
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
    state: {
        // 一个对象，存储当前用户登录的用户信息
        // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
        user: getItem(TOKEN_KEY)
    },
    mutations: {
        setUser(state, data) {
            state.user = data
            console.log(state.user);
            // 防止数据丢失，需要把数据存储到本地仓库
            setItem(TOKEN_KEY, state.user)
            // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))

        }
    },
    actions: {

    }
})