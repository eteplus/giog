const state = {
  /**
   * post field
   {
      id: '',
      title: '',
      slug: '',
      content: '',
      author: {
        avatarUrl: '',
        login: '',
        url: ''
      },
      createdAt: '',
      publishedAt: '',
      lastEdiedtAt: '',
      url: '',
      comments: {
        totalCount: '',
        list: []
      },
      labels: [{
        id: '',
        name: '',
        color: ''
      }],
      cursor: ''
    }
   */
  posts: {
    page: {},
    hasNextPage: true
  },
  post: {},
  tag: {
    // 标签列表
    list: [],
    // 标签下的文章列表
    posts: {}
  },
  archives: {},
  menuItems: [
    {
      name: '标签',
      alias: 'Tag',
      route: {
        name: 'tags',
        path: '/tags'
      }
    },
    {
      name: '归档',
      alias: 'Archive',
      route: {
        name: 'archives',
        path: '/archives'
      }
    },
    /*     {
      name: '关于',
      alias: 'About',
      route: {
        name: 'about',
        path: '/about'
      }
    } */
  ]
}

export default state
