import Vue from 'vue'
import Vuex from 'vuex'
import login from './moudles/login'
import getters from './getter'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        login
    },
    getters
})

export default store