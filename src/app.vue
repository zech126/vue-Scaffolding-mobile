<template>
  <div id="app">
    <div class="navbar--wrap">
      <navbar :categorys="categorys" />
    </div>
    <div class="main--wrap">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/components/navbar.vue'
import appConfig from '@/app.config'
import { getCategorys } from '@/api/post'

export default {
  components: { Navbar },

  metaInfo: {
    // 所有子组件的如果有 metaInfo.title 都会作为参数传入到这个标题处理模板
    // 返回结果会写入 <title> 内
    titleTemplate(title) {
      title = typeof title === 'function' ? title() : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    }
  },

  data() {
    return {
      categorys: []
    }
  },

  async created() {
    try {
      const res = await getCategorys()
      this.categorys = res.result
    } catch (e) {}
  }
}
</script>

<style lang="less" src="@/views/style/index.less">
</style>
<style>
/* stylelint-disable selector-max-type */
body {
  overflow-y: scroll;
}
</style>
<style lang="less" scoped>
#app {
  height: 100%;

  .navbar--wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
  }

  .main--wrap {
    padding-top: 70px;
  }
}
</style>
