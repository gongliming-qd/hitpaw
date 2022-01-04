import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index.vue'
import vuex from '..//store/index'

import SubLayout from './subLayout'

Vue.use(Router)

// 解决路由按需导入刷新红色警告
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      component: Layout,
      children: [
        ...SubLayout,
        {
          path: '',
          redirect: 'productManage'
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/common/404/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const role = vuex.state.user.userName
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.path === '/login') {
    vuex.dispatch('setUserName', '')
    next()
  } else {
    next()
  }
})

export default router
