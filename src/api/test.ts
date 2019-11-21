import { IDynamic } from '@/typings'
const test:Array<IDynamic> = [{
  title: '接口名称（接口描述信息）',
  options: { // 动态 键值对
    url: '/insCoverages/list', // 请求地址
    method: 'post', // 默认 get
    argParams: false, // 默认 false
    baseURL: '' // 代理 默认为空 ‘’ 不需要可以不设置此项
  }
}]

export default test
