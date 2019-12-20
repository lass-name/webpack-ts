import { IDynamic } from '@/typings'
const test:Array<IDynamic> = [{
  title: '接口名称（接口描述信息）',
  options: { // 动态 键值对 (对应axios的options)
    url: '/insCoverages/list', // 请求地址
    method: 'post', // 默认 get
    argsParams: false, // 默认 false
    baseURL: '' // 代理 默认为空 ‘’ 不需要可以不设置此项
  },
  vuex: {
    state: '',
    getter: '',
    mutationType: ''
  }
}, {
  title: '开启的保险公司查询接口',
  options: { // 动态 键值对
    url: '/insSuppliers/list', // 请求地址
    method: 'get', // 默认 get
    argsParams: false, // 默认 false
    baseURL: '' // 代理 默认为空 ‘’ 不需要可以不设置此项
  }/* ,
  vuex: {
    state: '',
    getter: '',
    mutationType: ''
  } */
}]

export default test

/**
 * options: 表示请求需要传递的参数
 *  - url:请求地址
 *  - method：请求方式（默认get）
 *  - baseURL：请求的配置代理 （默认‘/api'）
 *  - argsParams：请求参数是params传递 （baseURL/url/xx）默认get请求是 query方式 （默认值 false）
 * vuex：是否生成vuex的代码（默认false，method='get'）get请求默认 true
 *  - state：定义存储在state中的变量名 （默认同mutationType）
 *  - getter：定义存储在getter中的变量名（默认同 state 变量）
 *  - mutationType：操作state值的函数名称定义（默认 同生成的action名称的大写格式 譬如：INSCOVERAGES_LIST）
*/
