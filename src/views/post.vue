<template>
  <div>
    <h1 :class="$style.title">{{ title }}</h1>
    <div :class="$style.desc">{{ description }}</div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      :class="$style.content"
      v-html="content"
    />
  </div>
</template>

<script>
import { getPost } from '@/api/post'

export default {
  name: 'Post',

  metaInfo() {
    return {
      title: this.title
    }
  },

  data() {
    return {
      title: '',
      description: '',
      content: ''
    }
  },

  computed: {
    postId() {
      return this.$route.params.postId
    }
  },

  async created() {
    try {
      const res = await getPost(this.postId)
      this.title = res.result.title
      this.description = res.result.description
      this.content = res.result.content
    } catch (error) {
      if (error.code === 404) {
        this.$router.replace({ name: '404' })
      }
    }
  }
}
</script>

<style lang="less" module>
/**
 * 对于 scoped 无法满足的场景，可以使用 module 。
 * 如：下方的 `.content p` ，其中 p 是从接口获取的结构，因为不会带有 scoped 的 data-v 标签而导致样式无效。
 */
.title {
  padding: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.8;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.desc {
  padding: 15px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #eee;
}
.content {
  padding: 20px;
  font-size: 16px;
  line-height: 1.8;

  p {
    margin: 0 0 1.5em;
  }
}
</style>
