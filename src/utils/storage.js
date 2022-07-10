
// 本地存储 
export const setItem = (key, value) => {
    // 如果value值为数组或对象，需转为JSON字符
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// 本地获取
export const getItem = key => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }

}

// 删除
export const removeItem = key => {
    window.localStorage.removeItem(key)
}