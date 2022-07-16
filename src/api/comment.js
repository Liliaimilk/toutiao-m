import request from "@/utils/request";
// 获取评论列表
export const commentList = params => {
    return request({
        methods: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}


// 点赞

export const commentGoodJob = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comment/likings',
        data: {
            target
        }
    })
}


//取消 点赞
export const cancelCommentgjob = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/comment/likings/${target}`,
    })
}


// 发布评论
export const postComment = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data
    })
}