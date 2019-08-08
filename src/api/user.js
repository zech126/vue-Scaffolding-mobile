import request from '@/utils/request'
import apiConfig from '@/config/api.config'

const requestService = request(
  {
    baseURL: apiConfig.main.url
  },
  apiConfig.main.requestConfig
)

const silentRequestService = request(
  {
    baseURL: apiConfig.main.url
  },
  {
    ...apiConfig.main.requestConfig,
    silent: true
  }
)

export function getCurrentUser() {
  return silentRequestService({
    url: '/user/getCurrentUser',
    method: 'get'
  })
}

export function login({ account, password } = {}) {
  return requestService({
    url: '/user/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function logOut() {
  return requestService({
    url: '/user/logout'
  })
}
