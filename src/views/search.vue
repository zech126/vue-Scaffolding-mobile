<template>
  <div>
    <div class="info">“<span class="keyword">{{ keyword }}</span>”的搜索结果</div>
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

  metaInfo() {
    return {
      title: this.pageTitle
    }
  },

  data() {
    return {
      postList: []
    }
  },

  computed: {
    categoryId() {
      return this.$route.params.categoryId
    },
    pageTitle() {
      return `“${this.keyword}”的搜索结果`
    },
    keyword() {
      return this.$route && this.$route.query
        ? this.$route.query.keyword || ''
        : ''
    }
  },

  async created() {
    try {
      const res = await getPostsList({
        keyword: this.keyword
      })
      this.postList = res.result.items
    } catch (e) {}
  }
}
</script>

<style lang="less" scoped>
.info {
  padding: 0 20px;
  font-size: 16px;
  line-height: 40px;
  background: #eee;

  .keyword {
    font-size: 20px;
  }
}
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
