// /docs/architecture.md#环境变量
const confEnv = process.env.VUE_APP_CONF_ENV
const isServer = process.env.VUE_APP_IS_SERVER === 'true'

// 应用部署路径，默认 '/' 为部署到域名根目录，如： https://www.my-app.com/ 。
// 如果需要部署到子路径，如： https://www.foobar.com/my-app/ ，
// 则将该值配置为 '/my-app/' 。
// 如果需要在不同的部署环境部署不同的路径，可使用 confEnv 环境变量辅助判断。
const baseUrl = isServer ? './' : '/'

// 用于判断部署于正式环境不生成 sourceMap
const isProd = isServer && confEnv === 'prod'

// 部署到服务器场景下，是否对构建文件进行打包，支持 'tar' , 'zip' , ['tar', 'zip'] 。
const archiveFormat = false

module.exports = {
  baseUrl,

  assetsDir: 'static',

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      const appConfig = require('./src/app.config')
      args[0].title = appConfig.title
      args[0].description = appConfig.description
      return args
    })
    config.module
      .rule('js')
      .test(/\.jsx?$|vux-loader\/src\/script-loader\.js!export/)
      .exclude.add(/public/)

    // config.module
    //   .rule('js')
    //   .test(/\.jsx?$/)
    //   .end()
  },

  configureWebpack: config => {
    const vuxLoader = require('vux-loader')
    config = vuxLoader.merge(config, {
      plugins: ['vux-ui']
    })

    // 关闭 webpack 性能警告
    config.performance = {
      hints: false
    }

    // API 路径配置
    const webpack = require('webpack')
    // 将配置放于本文件获取，再通过环境变量引入，
    // 以避免其他非当前运行环境的配置地址被暴露于最终打包文件中
    const apiConfig = require('./config/api.config')
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL_CONFIG': JSON.stringify(apiConfig)
      })
    )

    if (isServer) {
      // GZIP
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }

    if (isServer && !!archiveFormat) {
      // TAR/ZIP archive
      const path = require('path')
      const ArchivePlugin = require('@laomao800/webpack-archive-plugin')
      config.plugins.push(
        new ArchivePlugin({
          output: path.resolve(
            __dirname,
            `./dist-archive/${process.env.VUE_APP_CONF_ENV || 'dev'}`
          ),
          format: archiveFormat,
          filename: 'archive',
          pathPrefix: baseUrl.replace(/^\/|\/$/g, '')
        })
      )
    }
  },

  productionSourceMap: !isProd,

  css: {
    sourceMap: !isProd
  },

  devServer: {
    before: require('./tests/mock-api'),
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: null // string | Object
  }
}
