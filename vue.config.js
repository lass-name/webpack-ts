module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://dongfeng.youbaolian.top/openapi',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
