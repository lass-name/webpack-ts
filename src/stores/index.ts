import { IDynamic } from '@/typings'
import Vue from 'vue'
import merge from 'webpack-merge'
import Vuex, { Commit, MutationTree, ActionTree, GetterTree, ModuleTree } from 'vuex'
import modules from './modules'
import generator from './generator'

Vue.use(Vuex)

const state: IDynamic = {
  common: {}
}

const getters: GetterTree<IDynamic, any> = {
  common: (state:IDynamic) => state.common
}

const actions: ActionTree<IDynamic, any> = {
  pureDataTransmit: (context:{commit:Commit}, payload:object|string) => {
    console.log(context.commit)
    context.commit('AAA', payload)
  }
}

const mutations: MutationTree<IDynamic> = {
  'AAA' (state:IDynamic, data:object) {
    console.log(state, data)
  }
}

const generatorModules = merge.smart(generator, modules)
console.log('generatorModules=', generatorModules)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: generatorModules as ModuleTree<IDynamic>
})
