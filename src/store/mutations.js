const mutations = {
  SET_POSTS(state, { page, data }) {
    if (data.length > 0) {
      state.posts.page[page] = data
    } else {
      state.posts.hasNextPage = false
    }
  },
  SET_POST(state, { id, data }) {
    state.post[id] = data
  },
  SET_ARCHIVES(state, { page, data }) {
    if (+page === 1) {
      state.archives = {}
    }
    for (let post of data) {
      const date = new Date(post.createdAt)
      const year = date.getFullYear()
      if (!state.archives[year]) {
        state.archives[year] = []
      }
      state.archives[year].push(post)
    }
  },
  SET_TAGS(state, data) {
    state.tag.list = data
  },
  SET_TAG_POSTS(state, { tag, page, data }) {
    if (!state.tag.posts[tag]) {
      state.tag.posts[tag] = {
        page: {},
        hasNextPage: data.length > 0
      }
      state.tag.posts[tag].page[page] = data
    } else {
      if (data.length > 0) {
        state.tag.posts[tag].page[page] = data
      } else {
        state.tag.posts[tag].hasNextPage = false
      }
    }
  },
  SET_MENU_ITEMS(state, items) {
    state.menuItems = items
  }
}

export default mutations
