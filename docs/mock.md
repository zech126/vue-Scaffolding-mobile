# 模拟数据

在本地开发时，会在 `/mock` 路径下运行 mock 模拟数据接口。如果需要进行本地数据模拟的开发（或者 e2e 测试），可通过在 `/config/api.config.js` 文件中将 mock 环境的接口地址配置到该地址实现本地 mock 数据调试。

在开发过程中接口结构变动频率比较大，并且项目有多人经手的场景下，相比使用 mock 平台，使用项目内置 mock 的形式具有更好的灵活性。

## 使用方法

mock 服务的所有相关文件存放在 `/tests/mock-api` 目录下。 `routes` 目录下的所有接口模拟文件会被自动加载，建议根据实际接口格式将接口拆分到不同的文件中以方便维护。

接口模拟路由配置方式与 [Express](http://www.expressjs.com.cn/) 的路由定义方式一致，使用说明可查看官方 [路由](http://www.expressjs.com.cn/guide/routing.html) 相关的配置说明。

### 响应

`utils` 中包含了 `resSuccess()` 和 `resError()` 2 个方法用于辅助返回接口规范的数据格式。

#### resSuccess(data)

返回接口成功响应的数据结构，`data` 为需要响应的 Object 内容，响应格式：

```javascript
{
  is_success: true,
  result: data
}
```

#### resError(msg[, code])

返回接口错误响应的数据结构，`msg` 为错误提示文本，`code` 为错误码，默认为 500 ，响应格式：

```javascript
{
  error_info: {
    code,
    msg
  },
  is_success: false
}
```
