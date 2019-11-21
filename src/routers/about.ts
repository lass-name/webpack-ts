const routes = [{
  path: '/about',
  name: 'about',
  component: () => import(/* webpackChunkName:'about' */'@/views/About.vue')
}]

export default routes
