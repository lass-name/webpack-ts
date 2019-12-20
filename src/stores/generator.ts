import { Commit } from 'vuex'
import modules from '@/stores/modules'
import { IDynamic, IModule } from '@/typings'
import service, { methods, generatorVuex } from '@/services'

// console.log('generator methods =', generatorVuex)

const genModules:IDynamic = {}
const getModules = (serviceObject:IDynamic, key:string = 'generator', namespace:string = 'common', module:IModule = { actions: {}, mutations: {}, getters: {}, state: {} }) => {
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
      let _mutationType:string = ''
      // console.log('generatorVuex=', generatorVuex[namespace])
      if (generatorVuex && generatorVuex[namespace] && action in generatorVuex[namespace]) {
        let { _state, getter, mutationType } = generatorVuex[namespace][action]
        _mutationType = mutationType
        module.mutations[mutationType] = (state:IDynamic, data:IDynamic) => {
          console.log('gen data=', state)
          state[_state] = data
        }
        module.state[_state] = {}
        module.getters[getter] = (state:IDynamic) => {
          // console.log(state, namespace)
          return state[_state]
        }
      }
      module.actions[action] = (context: {commit: Commit}, payload: IDynamic) => {
        return service[namespace][action](context.commit, payload, _mutationType)
      }
    } else if (type === 'object') {
      getModules(serviceObject[action], action, action)
    }
  })
  // if (Object.keys(actions).length) {
  genModules[key] = module // { actions }
  // }
}

getModules(methods)
console.log('genModules=', genModules)

export default genModules
