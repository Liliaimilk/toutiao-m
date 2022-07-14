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