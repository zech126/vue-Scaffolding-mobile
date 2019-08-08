# API 配置

`/config/api.config` 目录下存放全局 API 接口域名配置文件。其中除了 `index.js` 为入口文件之外，其余的文件都为不同环境下的配置文件，以文件命名为区分。

## 文件命名

::: tip 配置文件命名规则为：

`{ServerEnv}[.{ConfEnv}].js`

- `ServerEnv` 可选值：

  - `local`： 本地开发
  - `server`： 服务器环境（build）
  - `test`： 单元测试、e2e 测试

- `ConfEnv` 可选值：

  - `dev`： 开发环境
  - `prod`： 正式环境
  - `test`： 测试环境
  - `mock`： mock 环境

- 命名示例：

  - `local.js`
  - `local.mock.js`
  - `server.dev.js`
  - `server.prod.js`
  - `server.test.js`
  - `test.js`

:::

## 多环境配置

配置的合并策略为，尝试加载 `{ServerEnv}.js` 和 `{ServerEnv}.{ConfEnv}.js` 2 个配置文件：

- 若都不存在，控制台会报错并退出
- 若只存在一个，则以其作为最终结果
- 若同时存在，则将后者**深合并**到前者作为最终结果

## 使用

```javascript
import request from '@/utils/request'
import apiConfig from '@/config/api.config'

const requestService = request(
  {
    baseURL: apiConfig.host1.url
  },
  apiConfig.host1.requestConfig
)
```

### 配置格式

多个环境的配置最终只会保留匹配当前运行环境的 `ServerEnv` 和 `ConfEnv` 的配置，其他环境的配置路径会自动清除，不会暴露在最终的打包文件内。

配置的最终输出格式为：

```javascript
{
  host1: {
    url: '',
    requestConfig: { // 可选
      auth: true, // 若无配置则取 /src/app.config.js 文件中的 sendAuthByDefault 配置项
      apiKey: null // 默认为 null
    }
  },
  // ...
}
```

Types:

```typescript
{
  [hostName: string]: {
    url: string,
    requestConfig?: {
      auth: boolean | string,
      apiKey: string | null
    }
  }
}
```

## 基础配置

一个接口配置支持以下 2 种基础配置格式：

### Url

```javascript
// /config/api.config/server.dev.js
module.exports = {
  main: 'http://host1.server'
}
```

### UrlConfig

```javascript
// /config/api.config/server.prod.js
module.exports = {
  main: {
    url: 'http://host2.server',
    requestConfig: {
      auth: true, // boolean | string | function
      apiKey: 'host2-apikey'
    }
  }
}
```

#### `requestConfig.auth`

在请求平台的接口时，是否带上 `Authorization` 的头部信息， `false` 则不传。

默认取值为 [app.config.js](app-config.md) 内的 `authCookieName` 配置项名称的 cookie。

**若传字符串，则代表要获取的 `Authorization` 的值的 cookie name ，用于某些接口平台的 Token 值存放与本站不同的情况。**

#### `requestConfig.apiKey`

平台接口如果为网关接口，则在该属性填入网关的 api key 即可。
