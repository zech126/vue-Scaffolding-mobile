<template>
  <error-page type="403">
    <button
      slot="actions"
      class="button"
      @click="$router.go(-1)"
    >
      返回
    </button>
  </error-page>
</template>

<script>
import ErrorPage from './error-page.vue'

export default {
  name: 'ErrorPage403',

  components: {
    ErrorPage
  },

  metaInfo: {
    title: '403'
  }
}
</script>

<style lang="less" scoped>
@import '~@/views/style/variables.less';

.button {
  padding: 12px 20px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  background-color: @color-primary;
  border: 1px solid @color-primary;
  border-radius: 4px;

  &:hover {
    color: #fff;
    background: @color-primary-light-2;
    border-color: @color-primary-light-2;
  }
}
</style>
