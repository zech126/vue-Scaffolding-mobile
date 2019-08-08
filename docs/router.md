# 路由配置

使用前可先阅读 [Vue Router 官方文档](https://router.vuejs.org/zh-cn/) 。

在路由的 `beforeResolve` 和 `afterEach` 钩子中注册了 [NProgress](http://ricostacruz.com/nprogress/) 插件以实现路由的切换页面顶部的进度条效果。需要关闭可在 [应用配置](app-config.md) 内将 `routerLoading` 属性设为 `false` 即可。

## 约定

- 所有 Vue Router 相关的文件存放于 `/src/router` 目录。
- 路由类的配置统一入口为 `/src/router/routes.js` 文件，若路由结构复杂，可将路由配置再进行拆分到不同的文件或文件夹中，但都由 `routes.js` 文件作汇总引用。
- 视具体项目情况，对于一些不是常用的路由页面可以使用[路由懒加载](#路由懒加载)进行引入。
- 视具体项目情况，可在 `/src/router/index.js` 文件中配置是否使用路由 [HTML5 history 模式](https://router.vuejs.org/zh-cn/essentials/history-mode.html)。

## 登录判断

在 `/src/router/index.js` 文件中的 `beforeEach` 钩子中，默认对**所有**路径都作了登录判断，如果没有登录状态会自动跳转到 403 页面。

使用 `/src/store/modules/auth.js` store 模块的 getter `loggedIn` 作为是否登录的判断条件。有关 auth 模块的详细信息可查看 [状态管理 - 内置模块 auth](store.md#内置模块-auth) 。

### 跳过登录

设置路由配置元信息中的 `noAuthRequired` 为 `false` 可以使改地址跳过登录限制直接进入，可用于无需登录的路由地址。

### 无登录时跳转

在 `beforeEach` 钩子中对于需要登录的路由地址简单作了拦截跳转到 403 页面处理：

```javascript
// 在没有会话接口用于验证登录状态的项目，使用是否获取到登录用户判断是否已登录。
if (store.getters['auth/loggedIn']) {
  return next()
} else {
  return next({ name: '403' })
}
```

除了直接进入 403 ，还可以通过下面代码的形式，在每次切换路由时尝试作一次请求获取登录状态，该形式不会与 store/auth/init 内的登录方法冲突产生两次请求。

适用于登录失效后有其他补偿登录形式，如小弹窗、在新标签页面登录后再回来原页面有切换路由的操作。如果对于登录后有其他逻辑也可在此处处理，若无需跳转则直接运行 `next()` 即可。

```javascript
if (store.getters['auth/loggedIn']) {
  return next()
} else {
  try {
    await store.dispatch('auth/getCurrentUser')
  } catch (e) {}
  if (store.getters['auth/loggedIn']) {
    return next()
  } else {
    return next({ name: '403' })
  }
}
```

## 路由懒加载（异步组件）

对于某些不需要加载的时候就显示的页面，可以通过 [路由懒加载][lazy-route] 功能，在打包的时候将其单独打包到独立的 js 文件中：

```javascript
// routes.js
{
  path: '/category/:categoryId',
  name: 'category',
  component: () => import('@/views/category.vue')
}
```

### 处理加载状态

在 Vue 2.3.0+ 和 Vue Router 2.4.0+ 版本之后，增加了对于异步组件的 [加载状态处理][loading-state] ，使用特定格式的工厂函数来包装需要渲染的视图组件，可在视图组件读取完成之前使用 loading 视图组件填充页面，在读取组件出错或超时时也展示 timeout 视图组件。

在 `/src/router/index.js` 中也封装了一个辅助方法 `lazyLoadView()` ，使用方法：

```javascript
{
  path: '/category/:categoryId',
  name: 'category',
  component: () => lazyLoadView(import('@/views/category.vue'))
}
```

::: tip 异步路由组件的导航守卫

组件通过 lazyLoadView 这种异步形式调用的时候，不会触发组件内配置的路由“进入”类的事件，如： `beforeRouteEnter`, `beforeRouteUpdate`, `beforeRouteLeave` 。如果需要使用路由事件钩子，则需要直接使用回 [路由懒加载][lazy-route] 功能，或者使用路由配置中的 [路由独享的守卫][navigation-guards] 针对于特定路由配置增加相应的配置。

:::

[lazy-route]: https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
[loading-state]: https://cn.vuejs.org/v2/guide/components-dynamic-async.html#处理加载状态
[navigation-guards]: https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#路由独享的守卫
