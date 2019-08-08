// 自动注册 `store/modules` 目录下的文件为 Vuex 模块。
// 模块默认开启 namespaced ，并以文件名的驼峰格式作为其命名空间。

import camelCase from 'lodash/camelCase'

// 递归获取各子目录模块命名空间
function getNamespace(subtree, path) {
  if (path.length === 1) return subtree

  const namespace = path.shift()
  subtree.modules[namespace] = {
    modules: {},
    ...subtree.modules[namespace]
  }
  return getNamespace(subtree.modules[namespace], path)
}

const root = {
  modules: {}
}

// 查找当前目录下所有的非单元测试 js 文件
const requireModule = require.context('.', true, /^((?!\.unit\.).)*\.js$/)

requireModule.keys().forEach(fileName => {
  // 跳过本文件
  if (fileName === './index.js') return

  // 拆分文件路径，并以驼峰格式存储各路径层次名至数组
  const modulePath = fileName
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
    .split(/\//)
    .map(camelCase)

  // 从当前路径获取模块内容
  const { modules } = getNamespace(root, modulePath)

  // 添加获取到的模块内容
  modules[modulePath.pop()] = {
    namespaced: true,
    ...requireModule(fileName)
  }
})

export default root.modules
