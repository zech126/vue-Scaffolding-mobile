# API 请求

api 请求相关的方法存放于 `/api` 目录下，只导出请求函数给业务组件调用。

## 接口配置

`/src/utils/request.js` 对 [axios](https://github.com/axios/axios) 封装了一层拦截器，对请求拦截添加上 [api 配置](api.md) 中配置的 auth 、 apiKey ，并对接口报错作统一处理。

`request(axiosRequestConfig, requestConfig)` 方法接受 2 个参数：

### axiosRequestConfig

axios 原生的请求配置，更多详情可查看 [官方文档](https://github.com/axios/axios#request-config) 。

### requestConfig

#### `auth`

~~通过 [API - auth](api.md#requestconfig-auth) 传入，无需单独设置。~~

#### `apiKey`

~~通过 [API - apiKey](api.md#requestconfig-apikey) 传入，无需单独设置。~~

#### `silent`

- type: boolean
- default: false
  - 请求失败时是否弹出错误信息。

#### `requestHandler(config)` (可选)

自定义请求拦截方法，参数与 [axios 拦截器](https://github.com/axios/axios#interceptors) 一致。

#### `responseHandler(response)` (可选)

自定义响应拦截方法，参数与 [axios 拦截器](https://github.com/axios/axios#interceptors) 一致。

## 简单用法

```javascript
// /api/demo.js
import request from '@/utils/request'
import apiConfig from '@/config/api.config'

const requestService = request(
  {
    baseURL: apiConfig.main.url
  },
  apiConfig.main.requestConfig
)

export function getList(data) {
  return requestService({
    url: '/post',
    method: 'get',
    params: {
      ...data
    }
  })
}
```

## 处理不同响应格式的接口

request 方法默认只处理最新的接口标准，如果需要兼容其他格式的接口格式，可通过 `responseHandler` 来传入自定义的响应处理方法。

假设有如下响应格式的数据：

```javascript
{
  success: true, // 与标准的 is_success 不同
  result: {
    results: []
  }
}
```

可以这么配置：

```javascript
import request from '@/utils/request'
import apiConfig from '@/config/api.config'

const requestService = request(
  {
    baseURL: apiConfig.main.url
  },
  {
    ...apiConfig.main.requestConfig,
    responseHandler(response) {
      // response 为 axios 响应内容
      // 结构可查看： https://github.com/axios/axios#response-schema
      const res = response.data
      if (res.success === true) {
        return res
      } else {
        console.error('request error')
      }
    }
  }
)
```

## 可取消的请求

在某些需要取消请求的场景，可通过给实例绑定上自身的取消方法来进行请求取消操作：

```javascript
// /api/demo.js
import axios from 'axios'
import request from '@/utils/request'
import apiConfig from '@/config/api.config'

const requestService = request(
  {
    baseURL: apiConfig.main.url
  },
  apiConfig.main.requestConfig
)

export function getData() {
  let cancel
  const response = requestService({
    url: '/data',
    method: 'get',
    cancelToken: new axios.CancelToken(c => {
      cancel = c
    })
  })
  response.cancel = cancel
  return response
}
```

使用的时候可以通过以下的形式取消请求：

```javascript
const response = getData()
response.then(res => console.log(res))

// 需要取消请求的时候
if (NEED_CANCEL) {
  response.cancel()
}
```
