import * as authModule from './auth'
import * as types from '../mutation-types'

describe('@/store/modules/auth', () => {
  it('exports a valid Vuex module', () => {
    expect(authModule).toBeAVuexModule()
  })

  describe('in a store', () => {
    let store
    beforeEach(() => {
      store = createModuleStore(authModule)
    })

    it('mutations.SET_CURRENT_USER 保存登录用户信息', () => {
      const currentUser = {
        userName: 'user',
        userId: '00000000'
      }
      store.commit(types.SET_CURRENT_USER, currentUser)
      const savedCurrentUser = store.state.currentUser
      expect(savedCurrentUser).toEqual(currentUser)
    })

    it('getters.loggedIn currentUser 包含有效值时（登录成功）返回 true', () => {
      store.commit('SET_CURRENT_USER', {})
      expect(store.getters.loggedIn).toEqual(true)
    })

    it('getters.loggedIn currentUser 为空（注销登录） 时返回 false', () => {
      store.commit('SET_CURRENT_USER', null)
      expect(store.getters.loggedIn).toEqual(false)
    })
  })
})
