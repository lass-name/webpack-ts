import { IDynamic } from '@/typings'

const requireStore = require.context('.', false, /^\.\/(?!index).*\.ts$/)

let modules: IDynamic = {}

requireStore.keys().forEach((file:string) => {
  const moduleName = file.replace(/\.\/|\.ts/g, '')
  modules[moduleName] = { ...requireStore(file).default }
})

export default modules
