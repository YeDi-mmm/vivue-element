import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import i18n from '@/lang';
const { t } = i18n.global;
// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if ('') {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = 'token'
    }

    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      // 消息格式
      let formatMsg = (i18nKey) => `Error: ${res.code}, ${t(`dataInteraction.errorCodeMessage.${i18nKey}`) || res.message || 'Error'}`

      // 处理错误码对应的错误
      let handleErrorCode = function (i18nKey) {
        if (typeof i18nKey === 'number') {
          ElMessage.error(formatMsg(i18nKey))
        } else {
          i18nKey()
        } 
      }

      // “错误码-消息”对
      const code2Msg = new Map([
        [-1, 1001], // 修改失败
        [-2, 1002], // 账号不能为空
        [
          -3,
          () => {
            ElMessage.error(`Error: ${res.code}, ${t('dataInteraction.errorCodeMessage.1003', [res.message]) || res.message || 'Error'}`)
          }
        ], // 您的账号已在其他设备登录
      ])

      handleErrorCode(code2Msg.get(res.code) || code2Msg.get(null))

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    const { code, message } = error
    if (code === 'ECONNABORTED' || message.indexOf('timeout') !== -1) {
      // 请求超时
      ElMessage.error(t('dataInteraction.errorCodeMessage.1013') || 'Error')
    } else if (message.indexOf('Network Error') !== -1) {
      // 请求错误
      ElMessage.error(t('dataInteraction.errorCodeMessage.1004') || 'Error')
    } else {
      ElMessage.error(message)
    }
    return Promise.reject(error)
  }
)

export default service
