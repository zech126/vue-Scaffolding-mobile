# 部署

前端资源文件构建后默认会生成于 `/dist` 目录下。

若有开启打包功能，则相应的 `archive.tar` 或 `archive.zip` 文件会生成于 `/dist-archive` 目录下，并以当前环境名作为二级目录名。

```bash
# 构建开发环境，打包文件 /dist-archive/dev/archive.(tar|zip)
npm run build:dev

# 构建正式环境，打包文件 /dist-archive/prod/archive.(tar|zip)
npm run build:prod

# 构建测试环境，打包文件 /dist-archive/test/archive.(tar|zip)
npm run build:test
```
