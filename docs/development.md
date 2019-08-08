# 本地开发

## 初次运行

先克隆本项目之后从命令行进入本项目目录，然后运行下面的命令安装依赖项：

```bash
yarn install
```

## 本地开发服务

依赖安装完成之后可以使用下面的命令进入不同的开发模式：

```bash
# 运行本地开发服务器，默认运行于 dev 模式下
yarn serve

# 运行本地开发服务器，在 mock 模式下运行
yarn serve:mock
```

本地开发默认包含 `dev` 和 `mock` 2 个开发环境配置，对应的配置环境变量文件分别存放在 `/.env.serve-dev` 和 `/.env.serve-mock` 2 个文件中。

### 环境变量

默认各命令下对应的环境变量：

| scripts    | NODE_ENV        | VUE_APP_CONF_ENV |
| ---------- | --------------- | ---------------- |
| serve      | `'development'` | `'dev'`          |
| serve:mock | `'development'` | `'mock'`         |
| build      | `'development'` | `'dev'`          |
| build:dev  | `'development'` | `'dev'`          |
| build:prod | `'production'`  | `'prod'`         |
| build:test | `'development'` | `'test'`         |
| test:unit  | `'test'`        | `undefined`      |

## 文件生成器

项目中集成了 [Hygen](http://www.hygen.io/) ，用于生成常用的公共文件。文件生成模板位于 `_templates` 目录下，如果需要增加生成方法，可参考 Hygen 文档在该目录下增加模板文件即可。

本项目中默认包含了以下命令

```bash
# 生成空白组件和单元测试文件到 /components 目录
yarn new component

# 生成空白视图组件和单元测试文件到 /views 目录
yarn new view

# 生成 Vuex module 文件和单元测试文件到 /store/modules 目录
yarn new module

# 生成 e2e 测试文件到 /test/e2e/specs 目录
yarn new e2e
```
