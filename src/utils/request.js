import axios from 'axios'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { Toast } from 'vant'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log('response', response);
    // JS-SDK权限验证配置
    if (response.config.url === '/wx/config') {
      return res
    }
    // 统一身份认证 登录重定向
    if (typeof res.code !== 'undefined' && parseInt(res.code) === 302) {
      removeToken()
      window.location.href = response.data.response.redirect
      return false
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Toast({
        type: 'fail',
        message: res.message || '失败',
        duration: 3000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Toast({
      type: 'fail',
      message: error.message || '失败',
      duration: 3000,
    });
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
