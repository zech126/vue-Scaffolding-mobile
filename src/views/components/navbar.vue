<template>
  <div class="navbar">
    <div class="container">
      <div class="nav">
        <router-link to="/">首页</router-link>
        <router-link
          v-for="(cate, index) in categorys"
          :key="index"
          :to="`/category/${cate.categoryId}`"
        >
          {{ cate.categoryName }}
        </router-link>
      </div>
      <div
        v-if="loggedIn"
        class="search"
      >
        <input
          v-model.trim="keyword"
          @keydown.enter="search"
        >
        <button @click="search">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',

  props: {
    categorys: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      keyword: ''
    }
  },

  computed: {
    ...mapGetters('auth', ['loggedIn'])
  },

  watch: {
    $route() {
      this.keyword = this.$route.query.keyword || ''
    }
  },

  methods: {
    search() {
      if (this.keyword) {
        this.$router.push({
          name: 'search',
          query: {
            keyword: this.keyword
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  height: 60px;
  background-color: #545c64;

  .container {
    color: #fff;

    .nav {
      float: left;
      a {
        display: block;
        float: left;
        padding: 2px 20px 0;
        font-size: 14px;
        line-height: 56px;
        color: #fff;
        text-decoration: none;
        border-bottom: 2px solid transparent;

        &:hover {
          background-color: #303133;
        }

        &.router-link-exact-active {
          color: #ffd04b;
          border-bottom-color: #ffd04b;
        }
      }
    }

    .user,
    .search {
      float: right;
      line-height: 60px;
    }

    .search {
      padding-right: 20px;

      input,
      button {
        box-sizing: border-box;
        display: inline-block;
        padding: 0 10px;
        line-height: 30px;
        vertical-align: middle;
        outline: none;
      }
      input {
        background-color: 1px solid #fff;
        border: 1px solid #ddd;
        border-radius: 3px 0 0 3px;
      }
      button {
        margin-left: -1px;
        font-size: 12px;
        cursor: pointer;
        background: #eee;
        border: 1px solid #ddd;
        border-radius: 0 3px 3px 0;
      }
    }
  }
}
</style>
