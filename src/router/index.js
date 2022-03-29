import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
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
  {
    path: '/',
    component: Layout,
    redirect: '/pedigree',
    children: [{
      path: 'pedigree',
      name: 'ChangeLog',
      component: () => import('@/views/pedigree/index'),
      meta: { title: '谱系', icon: 'change', role: 'ChangeLog' }
    }]
  },
  {
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
        component: () => import('@/views/indexJc/index'),
        name: 'masterIndex',
        meta: { title: 'master端' },
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: process.env.VUE_APP_COMMON_PATH,
  mode: 'history', // require service support
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
