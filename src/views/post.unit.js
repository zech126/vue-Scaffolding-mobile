import Post from './post'

describe('@/views/post', () => {
  it('有效视图组件验证', () => {
    expect(Post).toBeAViewComponent()
  })

  it('正确渲染内容', () => {
    const wrapper = shallowMount(
      Post,
      createComponentMocks({
        style: {
          title: 'title',
          desc: 'desc',
          content: 'content'
        }
      })
    )
    const { element } = wrapper
    const postData = {
      title: 'test title',
      description: 'test description',
      content: 'test content'
    }
    wrapper.setData({
      ...postData
    })
    expect(element.querySelector('.title').textContent).toBe(postData.title)
    expect(element.querySelector('.desc').textContent).toBe(
      postData.description
    )
    expect(element.querySelector('.content').textContent).toBe(postData.content)
  })
})
