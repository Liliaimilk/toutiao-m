import request from '@/utils/request'

export const getSuggestion = q => {
    return request({
        methods: "GET",
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}

export const getSearchResult = params => {
    return request({
        methods: "GET",
        url: '/app/v1_0/search',
        params
    })
}