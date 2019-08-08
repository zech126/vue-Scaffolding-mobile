import axios from 'axios'
import request from '@/utils/request'
import apiConfig from '@/config/api.config'

const requestService = request(
  {
    baseURL: apiConfig.main.url
  },
  apiConfig.main.requestConfig
)

/**
 * 获取分类
 */
export function getCategorys() {
  /**
   * 暴露出 cancel 方法可用于需要取消请求的场景，用法：
   *
   * const response = getCategorys(this.$route.params.id)
   * response.then(res => console.log(res))
   *
   * if (NEED_CANCEL) {
   *   response.cancel()
   * }
   */
  let cancel
  const response = requestService({
    url: '/category',
    method: 'get',
    cancelToken: new axios.CancelToken(c => {
      cancel = c
    })
  })
  response.cancel = cancel
  return response
}

export function getPostsList(data) {
  return requestService({
    url: '/post',
    method: 'get',
    params: {
      ...data
    }
  })
}

export function getPost(postId) {
  return requestService({
    url: `/post/${postId}`,
    method: 'get'
  })
}
