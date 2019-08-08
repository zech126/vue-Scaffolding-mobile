import debounce from 'debounce-promise'
import appConfig from '@/app.config'
import * as types from '../mutation-types'
import { getCurrentUser, logOut } from '@/api/user'

export const state = {
  currentUser: null
}

export const mutations = {
  [types.SET_CURRENT_USER](state, userinfo) {
    state.currentUser = userinfo
  }
}

export const getters = {
  loggedIn: state => !!state.currentUser,
  currentUser: state => state.currentUser
}

export const actions = {
  async init({ dispatch }) {
    // 初始化时自动获取登录用户，刷新页面或直接进入 url 都会执行。
    try {
      return await dispatch('getCurrentUser')
    } catch (e) {}
  },

  // 获取当前登录用户
  getCurrentUser: debounce(async ({ commit }) => {
    const res = await getCurrentUser()
    commit(types.SET_CURRENT_USER, res.result)
    return res
  }),

  // 退出登录，清除登录信息，并重定向到登录页面
  async logOut({ commit }) {
    await logOut()
    commit(types.SET_CURRENT_USER, null)
    if (appConfig.logoutUrl) {
      window.location.href = appConfig.logoutUrl
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        '系统退出登录地址无效，请在 app.config.js 文件中配置 logoutUrl 属性。'
      )
    }
  }
}
