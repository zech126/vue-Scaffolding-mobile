<template>
  <div>
    <ul class="post-list">
      <li
        v-for="(post, index) in postList"
        :key="index"
      >
        <router-link :to="`/post/${post.id}`">
          <div class="title">{{ post.title }}</div>
          <div class="desc">{{ post.description }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPostsList } from '@/api/post.js'

export default {
  name: 'Category',

  metaInfo: {
    title: '列表页'
  },

  data() {
    return {
      postList: []
    }
  },

  computed: {
    categoryId() {
      return this.$route.params.categoryId
    }
  },

  async created() {
    try {
      const res = await getPostsList({
        category_id: this.categoryId
      })
      this.postList = res.result.items
    } catch (e) {}
  }
}
</script>

<style lang="less" scoped>
.post-list {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    padding: 20px;
    border-bottom: 1px solid #eee;

    .title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
    .desc {
      font-size: 12px;
      line-height: 1.5em;
      color: #999;
    }

    a {
      text-decoration: none;

      &:hover {
        .title {
          color: #0077f3;
        }
      }
    }
  }
}
</style>
