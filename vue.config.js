const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  productionSourceMap: false,
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
  },
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        // parallel: true,
        // sourceMap: false,
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production' && !process.env.BUILD_MODE,
            drop_debugger: process.env.NODE_ENV === 'production'
          },
          output: {
            comments: false // remove comments
          }
        },
        extractComments: false
      })]
    }
  }
}
