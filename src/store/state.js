const state = {
  posts: {
    list: [],
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
