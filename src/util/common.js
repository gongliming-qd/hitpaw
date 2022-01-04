import lodash from 'lodash'
import axios from 'axios'
import store from '../store/index'
import Vue from 'vue'
var apiServe = require('../../config/apiServe')

// axios封装formdata
export const axiosFormData = async ({
  url,
  data
}) => {
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    Vue.prototype.$message.error('服务器报错!')
  });
  let results = await axios({
    method: 'post',
    url: process.env.NODE_ENV === 'development' ? `/dev${url}` : `${apiServe.prodServe}${url}`,
    data,
    headers: {
      //   Authorization: window.sessionStorage.getItem("token")
    }
  })
  return results
}

// 菜单重新渲染
export const setChangeMenu = () => {
  store.dispatch('setChangeMenu', store.state.changeMenu + 1)
}

// 对象中剔除数值等于空字符串的选项
export const objectDeleStringNone = (obj) => {
  // 1. 去除空的
  return lodash.pickBy(obj, item => item)
}

// 根据秒转换 小时 ： 分钟 ： 秒
export const timeTransformation = (val) => {
  var h = Math.floor(val / 3600);
  var m = Math.floor((val / 60 % 60));
  var s = Math.floor((val % 60));
  h < 10 ? h = `0${h}:` : `${h}:`
  m < 10 ? m = `0${m}:` : `${m}:`
  s < 10 ? s = `0${s}` : `${s}`
  return h + m + s
}

// 时间格式转换 : YYYY-MM-DD HH:mm:ss, 有time则处理time的时间, 没time为当前时间
export const getDate = (time) => {
  let myDate = new Date();
  if(time) myDate = new Date(time);
  let getFullYear = myDate.getFullYear()
  let Month =myDate.getMonth() + 1
  if(Month < 10) Month = '0' + Month
  let getDate = myDate.getDate()
  if(getDate < 10) getDate = '0' + getDate
  let getHours = myDate.getHours()
  if(getHours < 10) getHours = '0' + getHours
  let getMinutes = myDate.getMinutes()
  if(getMinutes < 10) getMinutes = '0' + getMinutes
  let getSeconds = myDate.getSeconds()
  if(getSeconds < 10) getSeconds = '0' + getSeconds
  return `${getFullYear}-${Month}-${getDate} ${getHours}:${getMinutes}:${getSeconds}`
}
