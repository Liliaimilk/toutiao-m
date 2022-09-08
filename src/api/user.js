// import store from '@/store'
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
        methods: 'GET',
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

// 关注用户
export const followUser = target => {
    return request({
        method: 'post',
        url: "/app/v1_0/user/followings",
        data: {
            target
        }
    })
}

// 取消用户
export const cancelFollowUser = target => {
    // 把methods的s去掉就不报错了挺离谱的
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`,
    })
}

//收藏文章
export const collectArt = target => {
    // 把methods的s去掉就不报错了挺离谱的
    return request({
        method: 'post',
        url: "/app/v1_0/article/collections",
        data: {
            target
        }
    })
}

// 取消收藏
export const cancelCollect = target => {
    // 把methods的s去掉就不报错了挺离谱的
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${target}`,
    })
}


//取消点赞
export const cancelGood = target => {
    // 把methods的s去掉就不报错了挺离谱的
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${target}`,
    })
}



// /点赞
export const goodjob = target => {
    // 把methods的s去掉就不报错了挺离谱的
    return request({
        method: 'POST',
        url: "/app/v1_0/article/likings",
        data: {
            target
        }
    })
}

//获取指定用户的信息
export const userMsg = target => {
    return request({
        methods: 'GET',
        url: `/app/v1_0/users/${target}`
    })
}
// 获取用户自己的信息
export const getSelfMsg = () => {
    return request({
        method: 'get',
        url: "/app/v1_0/user/profile"
    })
}

// 编辑用户昵称
export const editsUserMsg = data => {
    return request({
        method: 'patch',
        url: "/app/v1_0/user/profile",
        data
    })
}

// 编辑用户头像
export function updateUserPhoto(data) {
    return request({
        method: 'patch',
        url: '/app/v1_0/user/photo',
        data
    })
}

// 获取关注用户列表
export function followUserList(target) {
    return request({
        method: "get",
        url: '/app/v1_0/user/followings',
        target
    })
}