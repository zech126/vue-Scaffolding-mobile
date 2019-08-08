# 应用配置

[[toc]]

应用内的常量配置存放于 `/src/app.config.js` 文件内。

## title

- Type: `string`

  应用主标题，默认会填充在首页 `<title>` 标签内，并会在 [Vue meta](vue-meta.md) 的 `titleTemplate` 处理方法内使用。

## description

- Type: `string`

  应用描述，会填充在应用页面的 `<meta name="description" />` 。

## logoutUrl

- Type: `string`

  系统退出登录地址，会在接口调用返回 401 、登录超时等状态下跳转到该地址，可填写 cas 注销地址。

## authCookieName

- Type: `string`

  正式环境 Authorization 取值 cookie 名。

## devAuthCookieName

- Type: `string`

  开发环境 Authorization 取值 cookie 名。

## sendAuthByDefault

- Type: `boolean`

  全局配置是否对所有 api 接口请求 header 附带从 cookie 中获取到的 `Authorization` 值。

  不同平台接口配置有差异可通过 [requestConfig.auth](api.md#requestConfig-auth) 独立配置。

## requestTimeout

- Type: `number`
- Default: `20000`

  接口调用超时时间。

## loading

- Type: `Object`

  顶部进度条配置，支持 [Nprogress](nprogress.md) 的所有配置，并增加了 color 和 height 2 个属性。

  ```javascript
  loading: {
    // 进度条颜色
    color: '#2d9',
    // 进度条高度
    height: '2px',
    // 是否显示右侧 loading 圆圈
    showSpinner: false
  }
  ```

## routerLoading

- Type: `boolean`

  路由切换时是否显示顶部进度条。

## requestLoading

- Type: `boolean`

  发送 http 请求时是否显示顶部进度条。

## errorMessageHasCode

- Type: `boolean`

  默认请求方法下，接口报错时是否显示错误码信息。

## logOnRequestError

- Type: `boolean`

  默认请求方法下，请求失败时是否在 console 面板打印错误信息
