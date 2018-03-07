import API from '@/utils/api'

const actions = {
  getPosts({ commit }, { page, pageSize }) {
    return API.fetchPosts(page, pageSize)
      .then(result => commit('SET_POSTS', result))
  },
  getPost({ commit, dispatch }, id) {
    return API.fetchPostById(id)
      .then(result => commit('SET_POST', result))
      .then(() => dispatch('getComments', {
        id,
        page: 1,
        pageSize: 10
      }))
  },
  getTags({ commit }) {
    return API.fetchTags()
      .then(result => commit('SET_TAGS', result))
  },
  getPostsByTag({ commit }, { tag, page, pageSize }) {
    return API.fetchPostsByTag(tag, page, pageSize)
      .then(result => commit('SET_TAG_POSTS', result))
  },
  getArchives({ commit }, { page, pageSize }) {
    return API.fetchArchives(page, pageSize)
      .then(result => commit('SET_ARCHIVES', result))
  },
  getComments({ commit }, { id, page, pageSize }) {
    return API.fetchComments(id, page, pageSize)
      .then(result => commit('SET_COMMENTS', result))
  }
}

export default actions
