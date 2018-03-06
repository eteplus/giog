const mutations = {
  SET_POSTS(state, { currentPage, posts, hasNextPage }) {
    state.posts.page[currentPage] = posts
    state.posts.hasNextPage = hasNextPage
  },
  SET_POST(state, { id, data }) {
    state.post[id] = data
  },
  SET_ARCHIVES(state, { page, data }) {
    state.archives = data
  },
  SET_TAGS(state, data) {
    state.tag.list = data
  },
  SET_TAG_POSTS(state, { currentPage, data }) {
    state.tag.posts[currentPage] = data
  },
  SET_MENU_ITEMS(state, items) {
    state.menuItems = items
  }
}

export default mutations
