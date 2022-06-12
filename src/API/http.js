import axios from 'axios'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import store from '@/store/index'
const http = axios.create({
  baseURL: '/api',
  timeout: 3000
})
const mock = axios.create({
  baseURL: '/mock',
  timeout: 3000
})
http.interceptors.request.use(function (config) {
  NProgress.start()
  config.headers.userTempId = store.state.detail.uuId
  config.headers.token = store.state.user.token
  return config
}, function (error) {
  return Promise.reject(error)
})
http.interceptors.response.use(function (response) {
  NProgress.done()
  return response
}, function (error) {
  return Promise.reject(error)
})
export {
  http,
  mock
}
