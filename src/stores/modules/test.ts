import { IDynamic } from '@/typings'
import Vue from 'vue'
import Vuex, { Commit, MutationTree, ActionTree, GetterTree } from 'vuex'

Vue.use(Vuex)

const state: IDynamic = {
  user: {}
}

const getters: GetterTree<IDynamic, any> = {
  user: (state:IDynamic) => state.user
}

const actions: ActionTree<IDynamic, any> = {
  getUser: (context:{commit:Commit}, payload:object|string) => {
    context.commit('BBB', payload)
  }/* ,
  insCoveragesList: (context:{commit:Commit}, payload:object|string) => {
    context.commit('BBB', payload)
  } */
}

const mutations: MutationTree<IDynamic> = {
  'BBB' (state:IDynamic, data:object) {
    console.log(state, data)
    state.user = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
