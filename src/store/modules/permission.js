import { getUserRoles } from '@/api/user'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role === role)
  } else {
    return true
  }
}

/**
 * Use meta.role to determine if the current user has permission
 * @param routes
 */
function routeRedirect(routes) {
  const obj = routes.find(v => v.path && v.children && v.children.length)
  if (obj) {
    const redirect = obj.path === '/' ? `/${obj.children[0].path}` : `${obj.path}/${obj.children[0].path}`
    const index = routes.findIndex(v => v.path === '/')
    if (index > -1) {
      routes[index].redirect = redirect
    } else {
      const route = {
        path: '/',
        redirect: redirect,
        hidden: true
      }
      routes.unshift(route)
    }
  }
  return routes
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getUserRoles().then(res => {
        const { menus } = res.response
        const roles = menus.map(v => v.route)

        let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        accessedRoutes = routeRedirect(accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
