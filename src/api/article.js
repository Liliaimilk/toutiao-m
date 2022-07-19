import request from "@/utils/request"

export const getArticaleList = params => {
    return request({
        methods: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

export const getArticaleDetail = articleId => {
    return request({
        methods: 'GET',
        url: `/app/v1_0/articles/${articleId}`,
    })
}

// 获取指定用户的文章列表
export const getOrderUserArt = (userId, params) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/users/${userId}/articles`,
        params
    })
}