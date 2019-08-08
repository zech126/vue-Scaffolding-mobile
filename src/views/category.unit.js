import Category from './category'

describe('@/views/category', () => {
  it('有效视图组件验证', () => {
    expect(Category).toBeAViewComponent()
  })

  it('正确渲染列表条目', () => {
    const wrapper = shallowMount(
      Category,
      createComponentMocks({ router: true })
    )
    const { element, vm } = wrapper
    const postList = [
      { id: 1, title: 'title1' },
      { id: 2, title: 'title2' },
      { id: 3, title: 'title3' }
    ]
    vm.postList = postList
    expect(element.querySelectorAll('.post-list > li').length).toBe(
      postList.length
    )
  })
})
