import axios, { AxiosRequestConfig, Canceler, AxiosResponse } from 'axios'
import { Commit } from 'vuex'

const axiosConfig:AxiosRequestConfig = {
  baseURL: '/api', // 配置全局代理地址 process.env 获取
  method: 'get',
  timeout: 30000, // 超时时间，默认 30s
  withCredentials: true // 跨域是否带Token
}

const pending:Array<{
  url:string,
  cancel:Function
}> = []

const CancelToken = axios.CancelToken
const removePending = (config:AxiosRequestConfig) => {
  for (let p in pending) {
    let item:any = p
    let list:any = pending[p]

    // 当前请求在数组中存在时执行函数体
    if (list.url === `${config.url}&request_type=${config.method}`) {
      // 执行取消
      list.cancel()
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

// const service = axios.create(axiosConfig)

// 添加请求拦截器
axios.interceptors.request.use((config:AxiosRequestConfig) => {
  removePending(config)
  config.cancelToken = new CancelToken((cancel:Canceler) => {
    pending.push({ url: `${config.url}&request_type=${config.method}`, cancel })
  })
  return config
}, (error:any) => {
  return Promise.reject(error)
})

// 返回状态判断（添加响应拦截器）
axios.interceptors.response.use((response:AxiosResponse) => {
  removePending(response.config)
  return response
}, (error:any) => {
  return Promise.reject(error)
})

const service = {
  request: (commit:Commit, options:AxiosRequestConfig, mutation:string) => {
    options.baseURL = options.baseURL || axiosConfig.baseURL
    return new Promise((resolve, reject) => {
      axios({ ...axiosConfig, ...options }).then(({ data }) => {
        // console.log(data)
        if (mutation) {
          commit(mutation, data)
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default service
