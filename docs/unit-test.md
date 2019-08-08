# 单元测试

```bash
# 执行单次单元测试
npm run test:unit

# 执行监听模式单元测试，文件修改自动重新执行测试任务
npm run test:unit:watch
```

## Jest

项目使用 [Jest](https://facebook.github.io/jest/zh-Hans/) 作为单元测试工具。

简单使用之前建议先阅读：

- [匹配器](https://facebook.github.io/jest/docs/zh-Hans/expect.html)
- [测试异步代码](https://facebook.github.io/jest/docs/zh-Hans/asynchronous.html)
- [测试配置](https://facebook.github.io/jest/docs/zh-Hans/setup-teardown.html)

## Vue Test Utils

Vue.js 官方提供的 [Vue Test Utils](https://vue-test-utils.vuejs.org/zh/) 提供了诸如挂载元素、模拟子组件、模拟组件数据等在单元测试中需要用到的实用工具。

## 单元测试文件

所有以 `.unit.js` 为后缀的文件都会被识别为单元测试文件。约定单元测试文件与被测试文件存放在相同目录下并使用相同的文件名命名。

通过 [文件生成器](development.md#文件生成器) 功能生成的功能都默认带有一个单元测试文件。

## 辅助方法

在文件 `tests/unit/setup.js` 中定义了几个全局辅助方法：

- `mount()`
- `shallowMount()`
- `createComponentMocks()`
- `createModuleStore()`

### `mount()`

[Vue Test Utils - mount](https://vue-test-utils.vuejs.org/zh/api/#mount) 同名方法的一个引用，方便直接全局使用。

```javascript
import Component from './component.vue'
describe('test', () => {
  const wrapper = mount(Component)
})
```

### `shallowMount()`

[Vue Test Utils - shallowMount](https://vue-test-utils.vuejs.org/zh/api/#shallowmount) 同名方法的一个引用，方便直接全局使用。

```javascript
import Component from './component.vue'
describe('test', () => {
  const wrapper = shallowMount(Component)
})
```

### `createComponentMocks({ store, router, style, mocks, stubs })`

辅助生成供 `mount()` 和 `shallowMount()` 使用的带模拟数据的配置。

```javascript
import Component from './component.vue'

describe('test', () => {
  const wrapper = mount(
    Component,
    createComponentMocks({
      store: {},
      router: true,
      style: {},
      mocks: {},
      stubs: {}
    })
  )
})
```

#### `mocks` 、 `stubs`

与 [Vue Test Utils 配置](https://vue-test-utils.vuejs.org/zh/api/) 一致，不作赘述。

#### `store`

在 `store` 下直接传入合法的 Vuex Module 配置即可生成模拟数据，会以键名作为模块名，默认开启 `namespaced` 。以下为演示获取登录状态的写法：

```javascript
{
  store: {
    auth: {
      state: {
        currentUser: {
          name: 'Name'
        }
      },
      getters: {
        loggedIn: () => true
      }
    },
    anotherModuleName: {
      state: {},
      getters: {},
      actions: {},
    }
  }
}
```

#### `router`

如果设为 `true` 则会自动注册 Vue Router 的 2 个内置组件 `<router-link>` , `<router-view>` 为子组件。

但如果需要测试 `<router-link>` 的渲染结果的话，需要根据实际需要模拟其实现：

```javascript
{
  stubs: {
    'router-link': {
      functional: true,
      render(h, { slots, data }) {
        return <a data-router-link="true">{slots().default}</a>
      }
    }
  }
}
```

#### `style`

传入的值会赋值给组件的 `$style` 属性，可用于模拟测试 CSS Module 。

```javascript
import Post from './post.vue'

describe('test', () => {
  const wrapper = shallowMount(
    Post,
    createComponentMocks({
      style: {
        title: 'title',
        desc: 'desc',
        content: 'content'
      }
    })
  )
  const { element } = wrapper
  const postData = {
    title: 'test title',
    description: 'test description',
    content: 'test content'
  }
  wrapper.setData({
    ...postData
  })
  expect(element.querySelector('.title').textContent).toBe(postData.title)
  expect(element.querySelector('.desc').textContent).toBe(postData.description)
  expect(element.querySelector('.content').textContent).toBe(postData.content)
})
```

### `createModuleStore(vuexModule)`

参数 `vuexModule` 为 Vuex Module 文件，函数返回只包含传入 module 的一个 store 。

```javascript
import * as authModule from './auth'
describe('test', () => {
  const store = createModuleStore(authModule)
  expect(store.getters.loggedIn).toEqual(false)
})
```

## 自定义匹配器

在文件 `tests/unit/matchers.js` 中定义了辅助测试 Vue 相关的自定义匹配器：

- `toBeAComponent()`
- `toBeAViewComponent()`
- `toBeAVuexModule()`

```javascript
import Component from './component.vue'
import View from './view.vue'
import Module from './store/module.js'
describe('component', () => {
  expect(Component).toBeAComponent()
  expect(View).toBeAViewComponent()
  expect(Module).toBeAVuexModule()
})
```

### toBeAComponent

通过匹配是否包含有 `render` 函数判断是否为 Vue 组件。

### toBeAViewComponent

通过匹配是否包含有 `metaInfo.title` 判断是否为 Vue 视图组件。

### toBeAVuexModule

通过匹配是否包含 state, getters, mutations, actions 这几个属性判断是否为 Vuex 模块。
