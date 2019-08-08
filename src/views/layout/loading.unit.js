import Loading from './loading'

describe('@/views/layout/loading', () => {
  it('有效视图组件验证', () => {
    expect(Loading).toBeAViewComponent()
  })
})
