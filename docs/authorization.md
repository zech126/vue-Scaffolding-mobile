# Authorization

配置文件 [app.config.js](app-config.jd) 内 `authCookieName` 和 `devAuthCookieName` 2 个配置项表示默认本平台的登录 Token 存放的 cookie name ， [api 配置](api.md#requestconfig-auth) 中的 `requestConfig.auth` 如果设置为 `true` 则使用本平台的 Token 。
