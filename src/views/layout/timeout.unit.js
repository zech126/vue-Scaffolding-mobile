import Timeout from './timeout'

describe('@/views/layout/timeout', () => {
  it('有效视图组件验证', () => {
    expect(Timeout).toBeAViewComponent()
  })
})
