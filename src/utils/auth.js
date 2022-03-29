import Cookies from 'js-cookie'

const TokenKey = 'XXX-PC-TOKEN'

export function getToken() {
  return Cookies.get(TokenKey, { path: process.env.VUE_APP_COMMON_PATH })
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { path: process.env.VUE_APP_COMMON_PATH })
}

export function removeToken() {
  return Cookies.remove(TokenKey, { path: process.env.VUE_APP_COMMON_PATH })
}
