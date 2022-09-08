import { login, getUserInfo } from "@/api/user";
import { getTimeSamp } from "@/utils/auth";
import { getItem, setItem, removeItem } from '@/utils/storage'

// token
const TOKEN_KEY = 'TOUTIAO_USER'

const state = {
    // 一个对象，存储当前用户登录的用户信息
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY),
    userInfo: {}
}
const mutations = {
    setUser(state, data) {
        state.user = data
        console.log(state.user);
        // 防止数据丢失，需要把数据存储到本地仓库
        setItem(TOKEN_KEY, state.user)
        // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))

    },
    // 获取个人信息
    getUser(state, data) {
        state.userInfo = data
    },
    // 退出登录
    logout() {
        removeItem(TOKEN_KEY)
        // 重新注入时间戳
        getTimeSamp()
        console.log(getTimeSamp());

    }
}
const actions = {
    // 获取token
    async getUserToken(context, user) {
        const { data } = await login(user);
        // console.log(data, '34');
        context.commit('setUser', data.data)
    },
    // 获取个人信息
    async getUserInfo(context) {
        const { data } = await getUserInfo()
        // console.log(data, '44');
        context.commit('getUser', data.data)
    }

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}