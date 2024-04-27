const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 打包路径
  assetsDir: 'static',
  parallel: false,
  publicPath: '/',
  // 关闭eslint
  lintOnSave: false,
  // 为了解决一个报错 看着难受
  chainWebpack: (config) => {
    // debug时开启source-map
      config.devtool('source-map')
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  // 配置代理
  devServer: {
    // 关闭全屏报错显示
    client: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://catapi.com/', // 代理地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/' // 重写路径
        }
      }
    }
  }
})
