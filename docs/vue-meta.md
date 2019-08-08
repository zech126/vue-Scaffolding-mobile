# Vue meta

使用 [Vue meta](https://github.com/declandewet/vue-meta) 插件统一处理视图组件页面的 meta 数据（如： `<title>` 、 `<meta>` 等）。

## 约定

- 在 `/src/app.vue` 中预先设置了标题模板 `titleTemplate` ，所有视图组件的 title 都会作为参数传入本模板函数中处理后再返回。
- 在视图级别的组件（views）使用属性名 `metaInfo` 设置本页面的标题。

## Title 视图组件标题

页面组件的 `title` 支持不同的定义方式：

### 静态标题

```javascript
// view.vue
export default {
  metaInfo: {
    title: 'Page title'
  }
}
```

### 引用标题

```javascript
export default {
  metaInfo() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      title: 'Page title'
    }
  }
}
```

## 视图组件单元测试

默认带有自定义匹配器 `toBeAViewComponent` 用于测试一个组件是否为视图组件，其通过条件为判断组件定义下是否有 `metaInfo.title` 属性。更多详细信息可查看 [单元测试 - 自定义匹配器](unit-test.md#自定义匹配器) 章节。
