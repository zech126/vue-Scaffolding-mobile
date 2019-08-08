import NavBar from './navbar'

const mountWrapper = (options = {}) => {
  const { store = {}, ...restOptions } = options
  return shallowMount(NavBar, {
    ...createComponentMocks({
      stubs: {
        'router-link': {
          functional: true,
          render(h, { slots, data, props }) {
            return (
              <a data-router-link="true" href={props.to}>
                {slots().default}
              </a>
            )
          }
        }
      },
      store: {
        auth: {
          getters: {
            loggedIn: () => false
          }
        },
        ...store
      }
    }),
    ...restOptions
  })
}

describe('@/components/navbar', () => {
  it('未登录时不显示搜索栏', () => {
    const { vm } = mountWrapper()
    expect(vm.$el.querySelector('.search')).toBeNull()
  })

  it('登录后显示搜索栏', () => {
    const { vm } = mountWrapper({
      store: {
        auth: {
          getters: {
            loggedIn: () => true
          }
        }
      }
    })
    expect(vm.$el.querySelector('.search')).toBeTruthy()
  })

  describe('正确渲染导航数量', () => {
    it('3 items', () => {
      const categorys = [
        { categoryId: 1, categoryName: 'aaa' },
        { categoryId: 2, categoryName: 'bbb' }
      ]
      const wrapper = mountWrapper({ propsData: { categorys } })
      const { element } = wrapper
      expect(element.querySelectorAll('.nav a').length).toBe(3)
    })

    it('4 items', () => {
      const categorys = [
        { categoryId: 1, categoryName: 'aaa' },
        { categoryId: 2, categoryName: 'bbb' },
        { categoryId: 3, categoryName: 'ccc' }
      ]
      const wrapper = mountWrapper({ propsData: { categorys } })
      const { element } = wrapper
      expect(element.querySelectorAll('.nav a').length).toBe(4)
    })
  })
})
