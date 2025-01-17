import { Commit } from 'vuex'
import { IDynamic } from '@/typings'
import service from './request'

const requireContext = require.context('.', false, /^\.\/(?![index|request]).*\.ts$/)
let services:IDynamic = {}
requireContext.keys().forEach((file:string) => {
  services = { ...services, ...requireContext(file).default }
})

const requireAPI = require.context('@/api', false, /\.ts$/)
const methods:IDynamic = {}
requireAPI.keys().forEach((file:string) => {
  const apiObject = requireAPI(file).default
  const fileName = file.replace(/\.\/|\.ts$/g, '')

  const tempMethods:IDynamic = {}
  for (const api of apiObject) {
    let { method, url, argsParams } = api.options
    method = (method || 'get').toLowerCase()

    let methodName:string = url.replace(/^\/|\/$/g, '').replace(/[\W|_]([a-zA-Z])/g, (_:string, letter:string) => {
      return letter.toUpperCase()
    })
    // console.log('methodName=', methodName)
    if (methodName in tempMethods) {
      methodName = `${method}${methodName.substring(0, 1).toUpperCase()}${methodName.substring(1)}`
    }

    tempMethods[methodName] = (commit:Commit, payload:IDynamic = {}, mutation:string = '') => {
      let options:IDynamic = {}
      let tempUrl:string = url
      if (method === 'get' && argsParams) {
        tempUrl = `${url}/${payload.id || payload}`
        options.url = tempUrl
      }

      let data:IDynamic = payload.data || payload || {}
      if (payload.params) {
        const { params, ...other } = payload
        options.params = params
        data = { ...other }
      } else if (method === 'get' && !argsParams) {
        options.params = { ...data }
        data = {}
      }
      options = { data, ...api.options, ...options }
      return service.request(commit, options, mutation)
    }
  }
  methods[fileName] = tempMethods
})

services = { ...methods, ...services }
// console.log('services=', services)
export {
  methods
}
export default services
