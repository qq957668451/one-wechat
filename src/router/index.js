import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/proHome',
    children: [{
      path: 'proHome',
      name: 'ChangeLog',
      component: () => import('@/views/proHome/index'),
      meta: { title: '谱系', icon: 'change', role: 'ChangeLog' }
    }]
  }, {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: {
      title: '用户端',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/indexUser/index'),
        name: 'UserIndex',
        meta: { title: '用户首页' },
      },
    ]
  },
  {
    path: '/renbao',
    component: Layout,
    redirect: '/renbao/index',
    name: 'Renbao',
    meta: {
      title: '人保端',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/indexRb/index'),
        name: 'RenbaoIndex',
        meta: { title: '人保首页' },
      },
    ]
  },
  {
    path: '/master',
    component: Layout,
    redirect: '/master/index',
    name: 'master',
    meta: {
      title: 'master端',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        redirect: '/master/index/home',
        component: () => import('@/views/indexJc/index'),
        name: 'masterIndex',
        meta: { title: 'master端' },
        children: [{
          path: 'home',
          name: 'masterHome',
          component: () => import('@/views/indexJc/home/homeIndex'),
        }]
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: process.env.VUE_APP_COMMON_PATH,
  // mode: 'history', // require service support
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
