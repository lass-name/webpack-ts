import { Commit } from 'vuex'
import modules from '@/stores/modules'
import { IDynamic } from '@/typings'
import service from '@/services'

const genModules:IDynamic = {}
const getModules = (serviceObject:IDynamic, key:string = 'generator', namespace:string = 'common', actions:IDynamic = {}) => {
  if (serviceObject === undefined) {
    return
  }
  Object.keys(serviceObject).forEach((action:string) => {
    const customActions = modules[namespace] && modules[namespace].actions
    if (customActions && action in customActions) {
      return
    }
    const type = typeof serviceObject[action]
    if (type === 'function') {
      actions[action] = (context: {commit: Commit}, payload: IDynamic) => {
        return service[namespace][action](context.commit, payload)
      }
    } else if (type === 'object') {
      getModules(serviceObject[action], action, action)
    }
  })
  if (Object.keys(actions).length) {
    genModules[key] = { actions }
  }
}

getModules(service)

export default genModules
