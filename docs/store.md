# 状态管理

使用前可先阅读 [Vuex 官方文档](https://vuex.vuejs.org/zh/) 。

## 约定

- 所有 Vuex 相关的文件存放于 `/src/store` 目录。
- 如果有使用了 Vuex 插件，在 `/src/store/index.js` 文件内注册。
- 所有 Mutation 类型存放于 `/src/store/mutation-types.js` 文件内。
- 所有 Module 存放于 `/src/store/modules` 目录下，以模块名称作为文件名，如：`auth.js`。
- 一般情况下根级 state 不存放数据，尽量拆分到 modules。
- **数据通过 getters 对外暴露，尽量避免在组件内直接通过 `this.$store.state.xxxx.xxxx` 的形式来调用。以保证对外数据的一致，避免由于 state 有改动，导致要全局查找修改相应的调用代码。**

## Module

### 自动注册

默认会自动导入并注册 `/src/store/modules` 目录下除了 `index.js` 文件以外的所有文件作为 module ，并以文件名作为其模块名。

### 默认开启 `namespaced`

所有子模块默认开启模块命名控件 `namespaced` ，因此调用的时候记得加上各自的命名空间名称，相关概念可查看官方文档 [Modules - 命名空间](https://vuex.vuejs.org/zh/modules.html#命名空间) 。

若要关闭，则在模块内导出该值即可：

```javascript
// /src/store/modules/xxxx.js
// ...
export const namespaced = false
// ...
```

### 初始化方法 `init`

若模块的 actions 中包含有 `init` 方法，则会在注册模块的时候**自动执行**，可用于执行一些对数据需要进行初始化的场景。

### 支持文件夹

`modules` 目录下支持多层文件夹，每一层文件夹都会以其文件夹名称作为命名空间的命名，如有如下目录结构：

```bash
.
└─ store
  └─ modules/
    ├─ work-report/
    │ └─ reports.js
    └─ brief-report/
      └─ reports.js
```

会自动生成如下数据结构：

```javascript
{
  workReport: {
    reports: {
      // state, getters, mutations, actions
    }
  },
  briefReport: {
    reports: {
      // state, getters, mutations, actions
    }
  },
}
```

调用：

```javascript
store.getters('workReport/reports/GETTER_FROM_WORK_REPORT')
store.dispatch('workReport/reports/ACIONT_FROM_WORK_REPORT')
```

## 内置模块 `auth`

默认内置了一个 `auth` 模块，用于存放登录用户信息（如果应用中有用户权限等的功能也可扩展该模块的数据）。

### Getter

- currentUser （存放当前登录用户信息）
- loggedIn （当前用户是否登录）

使用演示：

```javascript
<template>
  <div>
    <div v-if="loggedIn">登录人：{{ currentUser }}</div>
    <div v-else>未登录</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    ...mapGetters('auth', ['currentUser', 'loggedIn'])
  }
  // ...
}
```

### `logOut`

可通过 dispatch('auth/logOut') 来执行注销操作，需要先在 `app.config.js` 中的 `logoutUrl` 配置上系统的注销链接，若为有效值则前端注销后浏览器会自动跳转到该地址。

## Hygen

可以通过以下命令脚本生成 module 文件：

```bash
yarn new module
```
