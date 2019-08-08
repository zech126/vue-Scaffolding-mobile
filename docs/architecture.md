# 文件结构说明

## 主要目录说明

### `_templates`

存放文件生成器的模板文件，具体可查看 [本地开发 - 文件生成器](development.md#文件生成器) 小节。

### `.vscode`

存放 VS Code 编辑器相关配置，详情查看 [编辑器](editor.md#visual-studio-code)。

### `.vuepress`

存放生成文档的 vuepress 配置。

### `config`

存放供构建过程使用的配置。

### `public`

存放静态资源，文件夹内的所有内容在构建过程中会自动发布到 `dist` 目录下。

### `tests`

存放测试相关文件，详情查看 [单元测试](unit-test.md)。

### `src`

```bash
.
└─ src
  ├─ api/           # 封装所有 api 接口调用方法
  ├─ components/    # 全局公共基础组件
  ├─ config/        # 存放本应用内部的配置
  ├─ router/        # 路由配置目录
  ├─ store/         # Store 状态管理目录
  ├─ styles/        # 全局样式目录
  ├─ utils/         # 辅助库
  ├─ views/         # 页面级视图文件目录
  │ ├─ components/  # 视图级别的公共组件
  │ ├─ layout/      # 布局组件
  │ └─ style/       # 样式文件目录
  ├─ app.config.js  # 应用常量配置
  ├─ app.vue        # 应用主组件
  └─ main.js        # 主入口文件
```

## 环境变量

默认包含 5 个环境变量配置文件，位于根目录下：

| 文件名          | 对应执行脚本      | 说明                         |
| --------------- | ----------------- | ---------------------------- |
| .env.serve-dev  | `yarn serve`      | 本地开发，指向开发环境接口   |
| .env.serve-mock | `yarn serve:mock` | 本地开发，接口指向 mock 服务 |
| .env.build-dev  | `yarn build:dev`  | 构建开发环境文件             |
| .env.build-test | `yarn build:test` | 构建测试环境文件             |
| .env.build-prod | `yarn build:prod` | 构建正式环境文件             |

每个文件中包含 3 个环境变量：

### NODE_ENV

Node 运行环境，若为 `production` ，则构建文件会作代码压缩处理，并且浏览器开发这工具 Vue.js devtools 将无法使用。

### VUE_APP_IS_SERVER

判断当前项目是否运行于服务器环境，因为 NODE_ENV 在部署到测试环境时候有可能也为 `development` ，无法准确判断当前是否处于服务器环境。因此使用 `VUE_APP_IS_SERVER` 用来辅助判断是否处于服务器环境，或者是否将要构建至服务器环境。

> 注意这里的值 `true` 是字符串类型，需要使用 `process.env.VUE_APP_IS_SERVER === 'true'` 进行判断。

### VUE_APP_CONF_ENV

当前使用的配置类型，值有可能为 `dev`（开发环境）， `test`（测试环境）， `prod`（正式环境）。

::: tip 注意：

其中 `VUE_APP_IS_SERVER` 和 `VUE_APP_CONF_ENV` 会影响生成 API 配置的基础域名，具体可查看 [API 配置 - 提取规则](api.md#提取规则) 小节的说明。

:::

> 更多关于 `.env` 文件的配置和说明可查看 [Environment Variables and Modes](https://cli.vuejs.org/guide/mode-and-env.html) 的说明。

## 应用常量

应用内使用的常量级别的配置统一存放于 `/src/app.config.js` 文件，详情可查看 [App Config](app-config.md) 。
