const axios = require('axios')

const isServer = process.env.VUE_ENV === 'server'

axios.defaults.baseURL = 'http://127.0.0.1:3030/data'

axios.interceptors.response.use(
  response => {
    console.log('isServer:', isServer)
    console.log('hasData', !!response.data)
    const result = response.data
    console.log(result)
    return result.data ? result : { data: result }
  },
  error => Promise.reject(error)
)

const actions = {
  getPosts({ commit }, currentPage) {
    return axios({
      url: `/posts.page.${currentPage}.json`,
    }).then((response) => {
      const { data } = response
      commit('SET_POSTS', {
        currentPage,
        posts: data.posts,
        hasNextPage: data.hasNextPage
      })
    })
  },
  getPost({ commit }, id) {
    return axios({
      url: `/post/${id}.json`
    }).then((response) => {
      const { data } = response
      commit('SET_POST', {
        data,
        id
      })
    })
  },
  getTags({ commit }) {
    return axios({
      url: '/tags.json'
    }).then((response) => {
      const { data } = response
      commit('SET_TAGS', data)
    })
  },
  getTagOfPosts({ commit }, { tag, currentPage }) {
    return axios({
      url: `/tag/${tag}.page.${currentPage}.json`,
    }).then((response) => {
      const { data } = response
      commit('SET_TAG_POSTS', {
        currentPage,
        data
      })
    })
  },
  getArchives({ commit }) {
    return axios({
      url: '/archives.json'
    }).then((response) => {
      const { data } = response
      commit('SET_ARCHIVES', {
        data: data
      })
    })
  }
}

export default actions
