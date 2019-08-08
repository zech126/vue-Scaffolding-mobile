<template>
  <div>
    <template v-if="loggedIn">
      <h3>当前登录人</h3>
      <ul style="line-height:2em">
        <li>姓名: {{ currentUser.user_name }}</li>
        <li>职位: {{ currentUser.job_name }}</li>
        <li>部门: {{ currentUser.department_name }}</li>
        <li><button @click="logOut">注销</button></li>
      </ul>
    </template>
    <template v-else>
      <group title="登录">
        <x-input
          v-model="account"
          title="账号"
          type="text"
          placeholder="admin"
        />
        <x-input
          v-model="password"
          title="密码"
          type="text"
          placeholder="admin"
        />
      </group>
      <box gap="10px 10px">
        <x-button>登录</x-button>
      </box>
    </template>
  </div>
</template>

<script>
import { XInput, Group, XButton, Box } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { login } from '@/api/user'

export default {
  name: 'Home',

  metaInfo: {
    title: '首页'
  },

  components: {
    XInput,
    Group,
    XButton,
    Box
  },

  data: function() {
    return {
      account: '',
      password: ''
    }
  },

  computed: {
    ...mapGetters('auth', ['currentUser', 'loggedIn'])
  },

  methods: {
    ...mapActions('auth', {
      storeLogOut: 'logOut',
      getCurrentUser: 'getCurrentUser'
    }),
    logOut() {
      this.storeLogOut()
    },
    async logIn() {
      const res = await login({
        account: this.account,
        password: this.password
      })
      if (res.is_success) {
        this.getCurrentUser()
      }
    }
  }
}
</script>
