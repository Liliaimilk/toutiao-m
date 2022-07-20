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
        // 默认显示 用这种写法不用引用组件，而是直接获取跳转的路径，减少消耗
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
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () => import('@/views/article'),
        props: true
    },
    {
        path: '/user/:userId',
        name: 'user',
        component: () => import('@/views/user'),
        props: true


    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/user-profile'),
        props: true
    }



]
const router = new VueRouter({
    routes
})

export default router