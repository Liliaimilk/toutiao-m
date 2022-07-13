import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login/index.vue'
Vue.use(VueRouter)

// 路由表
const routes = [
    // 默认显示
    // {
    //     path: '/',
    //     redirect: '/login'
    // },

    {
        path: '/login',
        name: 'login',
        // component: Login
        // 默认显示 用这种写法上面不用引用
        component: () => import('@/views/login/index.vue'),

    },
    {
        path: '/',
        // name: 'layout',
        component: () => import('@/views/layout/index.vue'),
        redirect: '/home',
        children: [
            // {
            //     path: '/',
            //     redirect: '/home'
            // },
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home')
            },
            {
                path: 'qa',
                name: 'qa',
                component: () => import('@/views/QuestionAn')
            },
            {
                path: 'video',
                name: 'video',
                component: () => import('@/views/Video')
            },
            {
                path: 'my',
                name: 'my',
                component: () => import('@/views/My')
            },
        ]
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/components/searcch'),
    }
]
const router = new VueRouter({
    routes
})

export default router