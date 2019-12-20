export interface IDynamic {
  [key: string]: any
}

export interface IModule {
  state:IDynamic,
  actions:IDynamic,
  mutations:IDynamic,
  getters:IDynamic
}
