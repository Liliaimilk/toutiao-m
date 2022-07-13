import request from '../utils/request'

export const getAllChannel = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })

}

//线上添加频道
export const getUpdateChannel = channels => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels: [channels]
        }
    })

}

//线上删除频道
export const delChannel = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${target}`,
    })

}