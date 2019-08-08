# Tips

## 风格指南

对于 Vue 组件编写的代码风格，官方提供有 [风格指南](https://cn.vuejs.org/v2/style-guide/) ，建议先着重阅读一遍。

## Style 定义

vue 组件的 `<style>` 标签有以下 3 种定义作用范围。

- `<style>`
- `<style scoped>` ( [Vue Loader - Scoped CSS](https://vue-loader.vuejs.org/zh/guide/scoped-css.html) )
- `<style module>` ( [Vue Loader - CSS Modules](https://vue-loader.vuejs.org/zh/guide/css-modules.html) )

可在不同的场景下选择使用不同的方案。

### `<style>`

这种标签内定义的样式最终会原样插入到全局，因此尽量避免在这种标签下定义全局样式，或者会影响其他组件的样式定义。

在编写**通用类组件**的时候可使用这种定义方式，但组件内部的命名必须使用 [BEM](http://getbem.com/naming/) 来命名，或者类似的命名方案。可以让组件样式有自己的“命名空间”避免定义冲突，又可以在别人使用组件并需要小幅度修改样式时被覆盖定义。

### Scoped CSS

除了公共类的组件， 视图组件、布局组件等都**建议开启** Scoped CSS 作用范围。让组件内的样式限定在该组件的范围内，不受外部影响，也不影响外部。

### CSS Modules

在 vue 组件中的 `<style>` 标签上添加 `module` 即可开启 CSS Modules ：

```vue
<template>
  <div>
    <h1 :class="$style.title">{{ title }}</h1>
    <div :class="$style.desc">{{ description }}</div>
  </div>
</template>

<style module>
.title {
  font-size: 16px;
}
.desc {
  font-size: 14px;
}
</style>
```

以上代码会解析出以下 html 结构：

```html
<h1 class="post_title_lPGXx"></h1>
<div class="post_desc_WWkR0"></div>
```

通过这种形式可实现父子组件/元素样式的覆盖，同时保留类似 Scoped 的作用域范围功能。

### 全局 CSS

对于需要全局引入的 CSS ，如样式重置、通用组件样式等，限定只能通过主入口文件 `main.js` 或 `app.vue` 文件来引入。
