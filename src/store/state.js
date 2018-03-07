const state = {
  posts: {
    list: [],
    hasNextPage: true
  },
  comments: {},
  post: {},
  tag: {
    list: [],
    posts: {}
  },
  archives: {},
  userInfo: {
    github: '',
    userName: '',
    avatar: '',
    motto: '',
  },
  siteInfo: {
    name: '',
    recordText: ''
  }
}

export default state
