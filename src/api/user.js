import store from '@/store'
import request from '@/utils/request'

export const login = data => {
    return request({
        method: 'POST',
        url: 'app/v1_0/authorizations',
        data
    })
}

export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: 'app/v1_0/sms/codes/' + mobile,
    })
}

export const getUserInfo = () => {
    return request({
        methods: 'GET',
        url: 'app/v1_0/user',
        // 身份认证，需要token才能拿到用户数据
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
        // 此种方法是在发起请求的时候，便把token放入配置请求
        // 很麻烦，所以有方法二见reques.js
    })
}

export const getChannelData = () => {
    return request({
        methods: 'GET',
        url: 'app/v1_0/user/channels'
    })
}