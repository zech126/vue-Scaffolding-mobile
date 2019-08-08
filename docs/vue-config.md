# `vue.config.js`

在根目录下的 `/vue.config.js` 文件中存放针对于 Vue CLI 项目的特性配置，所有配置可查看 [官方文档](https://cli.vuejs.org/config/#vue-config-js) 。

## 配置

以下的说明仅针对于本项目内的 `/vue.config.js` 文件中涉及的配置，建议结合文件代码一起查看。

### 环境变量

通过 `VUE_APP_CONF_ENV` 和 `VUE_APP_IS_SERVER` 可判断当前的运行与部署环境，可用于生成 sourceMap 等需要对环境作区分的配置。

更多关于环境变量的各个值的详细说明可查看 [文件架构说明 - 环境变量](architecture.md#环境变量) 章节。

### `baseUrl`

应用部署路径，默认 `'/'` 为部署到域名根目录，如： `https://www.my-app.com/` 。

如果需要部署到子路径，如： `https://www.foobar.com/my-app/` ，则将该值配置为 `'/my-app/'` 。

::: tip 部署环境之间部署路径不同

如果需要在不同的部署环境部署不同的路径，可使用 `process.env.VUE_APP_CONF_ENV` 环境变量辅助判断。

:::

### `assetsDir`

构建后存放静态资源的目录，留空则资源会存放于 `dist` 根目录。

### `chainWebpack`

可在该配置内对 webpack 打包文件规则作进一步调整。详细说明可查看 [官方文档](https://cli.vuejs.org/guide/webpack.html#chaining-advanced)。

### `configureWebpack`

增加对 webpack 的配置， Gzip 、 构建打包等功能都在配置内添加。

### `devServer`

本地开发服务器，本地 mock 服务在这里注册。

## 构建打包

项目使用 [webpack-archive-plugin](https://www.npmjs.com/package/@laomao800/webpack-archive-plugin) 用于打包 build 命令构建后的 `/dist` 目录。

```javascript
// 默认关闭打包功能
const archiveFormat = false

// 支持 tar 、 zip 格式
const archiveFormat = 'tar' // or
const archiveFormat = 'zip' // or
const archiveFormat = ['tar', 'zip']
```

通过传入字符串 `'tar'` 或 `'zip'` 可设置打包格式。或可以传入 `['tar', 'zip']` 同时打包两种格式的压缩包。

打包成功后压缩包会以 `archive.tar` 或 `archive.zip` 命名存放于 `dist-archive` 目录下，并以当前环境名 `process.env.VUE_APP_CONF_ENV` 作为二级目录名：

```bash
# 构建开发环境，打包文件 /dist-archive/dev/archive.(tar|zip)
npm run build:dev

# 构建正式环境，打包文件 /dist-archive/prod/archive.(tar|zip)
npm run build:prod

# 构建测试环境，打包文件 /dist-archive/test/archive.(tar|zip)
npm run build:test
```
