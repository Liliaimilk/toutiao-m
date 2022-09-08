const getters = {
    user: state => state.login.user,//user就是token
    userInfo: state => state.login.userInfo
}
export default getters