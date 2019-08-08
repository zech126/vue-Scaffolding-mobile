const appConfig = require('../src/app.config')
const version = process.env.VERSION || require('../package.json').version

module.exports = {
  base: '/pps/vue-boilerplate-doc/',
  title: `${appConfig.title} v${version}`,
  description: appConfig.description,
  themeConfig: {
    lastUpdated: '上次更新',
    nav: [
      {
        text: '仓库地址',
        link: 'http://192.168.1.122:3000/pps-fe/vue-boilerplate'
      }
    ],
    sidebar: [
      ['/', '项目 ReadMe 格式'],
      {
        title: '准备工作',
        collapsable: false,
        children: [
          ['./docs/install', '准备本地开发运行环境'],
          ['./docs/app-config', '应用配置'],
          ['./docs/mock', 'Mock 模拟数据']
        ]
      },
      {
        title: '开发阶段',
        collapsable: false,
        children: [
          ['./docs/architecture', '项目结构'],
          ['./docs/vue-config', 'vue.config.js'],
          ['./docs/development', '本地开发'],
          ['./docs/router', '路由配置'],
          ['./docs/store', '状态管理'],
          ['./docs/api', 'API 配置'],
          ['./docs/vue-meta', 'Vue meta'],
          ['./docs/tips', '其他建议']
        ]
      },
      {
        title: 'Utils',
        collapsable: false,
        children: [
          ['./docs/authorization', 'Authorization'],
          ['./docs/api-request', 'Request'],
          ['./docs/nprogress', 'Nprogress']
        ]
      },
      {
        title: '代码规范 & 部署上线',
        collapsable: false,
        children: [
          ['./docs/linting', '代码规范'],
          ['./docs/production', '部署上线']
        ]
      },
      {
        title: '其他',
        collapsable: false,
        children: [
          ['./docs/editor', '编辑器'],
          ['./docs/unit-test', '单元测试']
        ]
      }
    ]
  }
}
