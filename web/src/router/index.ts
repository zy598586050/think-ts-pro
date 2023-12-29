/*
 * @Author: zhangyu
 * @Date: 2023-12-29 12:20:15
 * @LastEditTime: 2023-12-29 12:21:04
 */
import { createRouter, createWebHashHistory } from 'vue-router'

// 路由配置
const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component: () => import('@/views/index.vue')
    }
]

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router