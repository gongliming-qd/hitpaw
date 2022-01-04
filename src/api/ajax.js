import axios from 'axios'
import Vue from 'vue'
// import Router from '../router/index'
import qs from 'qs'
// import lodash from 'lodash'
var apiServe = require('../../config/apiServe')
// 每次请求携带cookies信息
axios.defaults.withCredentials = true

//
let baseURL = ''
process.env.NODE_ENV === 'development' ? baseURL = '/dev' : baseURL = apiServe.prodServe
export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  config.data = qs.stringify(config.data)
  //  携带token
  // config.headers.Authorization = window.sessionStorage.getItem('token')

  // get数组封装
  if (config.method === 'get') {
    // 1.  params是数组类型如arr=[1,2]，则转换成arr=1&arr=2,不转换会显示为arr[]=1&arr[]=2
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  return config
})

// 添加响应拦截器
http.interceptors.response.use( response => {
  // 对响应数据做点什么
  // if(response.data.results.message == 'token验证不通过' && response.data.state == 'false'){
  //     Vue.prototype.$message.warning('请重新登录哦!')
  //     Router.push('/login')
  // }else{
  //     return response;
  // }
  return response
},
error => {
     Vue.prototype.$message.error('服务器报错!')
  }
)
