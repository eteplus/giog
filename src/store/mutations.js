const mutations = {
  SET_POSTS(state, { page, data }) {
    if (+page === 1) {
      state.posts.list = []
    }
    if (data.length > 0) {
      state.posts.list.push(...data)
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
  SET_COMMENTS(state, { id, page, data }) {
    if (+page === 1 || !state.comments[id]) {
      state.comments[id] = {
        list: [],
        hasNextPage: true
      }
    }
    if (data.length > 0) {
      state.comments[id].list.push(...data)
    } else {
      state.comments[id].hasNextPage = false
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
  }
}

export default mutations
