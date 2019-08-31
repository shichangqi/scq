import Fly from 'flyio'
import { phoneUrl } from './api';

const request = new Fly()
const request1 = new Fly()

request.interceptors.request.use((req) => {
  if(req.url == phoneUrl){
    req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }else{
    req.headers['Content-Type'] = 'application/json'
  }
  return req
})

request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response)
  },
  (err, promise) => {
    switch (err.status) {
      //未授权或者token失效
      case 401:
        wx.redirectTo({ url: '/pages/authLogin/main' })
        break;
      //用户未注册
      case 403:
        // wx.redirectTo({url: '/pages/register/main'})
        break;
      //没有权限使用小程序
      case 405:
        // wx.reLaunch({url: '/pages/noPermission/main'})
        break;
      //其他错误提示  
      default:
      // toast(err.response.data.msg)

    }
    return promise.resolve(err.response)
  }
)



request1.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return req
})

request1.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response)
  },
  (err, promise) => {
    switch (err.status) {
      //未授权或者token失效
      case 401:
        wx.redirectTo({ url: '/pages/authLogin/main' })
        break;
      //用户未注册
      case 403:
        // wx.redirectTo({url: '/pages/register/main'})
        break;
      //没有权限使用小程序
      case 405:
        // wx.reLaunch({url: '/pages/noPermission/main'})
        break;
      //其他错误提示  
      default:
      // toast(err.response.data.msg)

    }
    return promise.resolve(err.response)
  }
)
export { request , request1}