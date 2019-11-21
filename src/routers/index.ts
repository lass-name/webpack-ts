import Vue from 'vue'
import Router, { RouteConfig, RouterOptions } from 'vue-router'

const requireRouter = require.context('.', false, /^(?!\.\/index).*\.ts$/)
let routers : Array<RouteConfig> = []

requireRouter
  .keys()
  .forEach((routerFile : string) => {
    routers = [
      ...routers,
      ...requireRouter(routerFile).default
    ]
  })

Vue.use(Router)

const options:RouterOptions = {
  mode: 'history',
  routes: routers,
  fallback: false,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
}

class LocalRouter extends Router {
  constructor () {
    super(options)
    this.beforeEach((to, from, next) => {
      console.log(to, from)
      next()
    })
  }
}

export default new LocalRouter()
