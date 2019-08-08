import Home from '@/views/home.vue'
import Loading from '@/views/layout/loading.vue'
import Timeout from '@/views/layout/timeout.vue'
import Page403 from '@/views/layout/error-page/403.vue'
import Page404 from '@/views/layout/error-page/404.vue'
import Page500 from '@/views/layout/error-page/500.vue'

export default [
  {
    path: '/',
    name: 'home',
    meta: { noAuthRequired: true },
    component: Home
  },
  {
    path: '/category/:categoryId',
    name: 'category',
    component: () => import('@/views/category.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search.vue')
  },
  {
    path: '/post/:postId',
    name: 'post',
    // 异步路由组件用法可查看下方 lazyLoadView 方法的注释
    component: () => lazyLoadView(import('@/views/post.vue'))
  },
  {
    path: '/403',
    name: '403',
    meta: { noAuthRequired: true },
    component: Page403
  },
  {
    path: '/404',
    name: '404',
    meta: { noAuthRequired: true },
    component: Page404
  },
  {
    path: '/500',
    name: '500',
    meta: { noAuthRequired: true },
    component: Page500
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

// 通过使用[异步组件][async-component]的工厂函数来包装需要渲染的视图组件，
// 可在视图组件读取完成之前使用 loading 组件填充页面，
// 在读取组件出错或超时时也展示超时面板，在路由中的使用方法：
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// 注: 组件通过 lazyLoadView 这种异步形式调用的时候，不会触发组件内配置的路由“进入”类钩子，
// 如： `beforeRouteEnter`, `beforeRouteUpdate`, `beforeRouteLeave` 。
// 如果需要使用路由事件钩子，可以使用路由配置中的[路由独享的守卫][navigation-guards]，
// 或者直接使用[路由懒加载][lazy-route]功能：
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: Loading,
    error: Timeout,
    delay: 400,
    timeout: 10000
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // 将 data 与 children 转发给视图组件
      return h(AsyncHandler, data, children)
    }
  })
}
