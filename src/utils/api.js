import fetch from '@/utils/fetch'

const fetchPosts = (page, pageSize) => {
  return fetch({
    url: `/posts?page=${page}&pageSize=${pageSize}`,
  }).then((response) => {
    const { code, data } = response
    if (+code >= 0) {
      return { page, data }
    }
    throw new Error(response.error)
  })
}

const fetchPostById = (id) => {
  return fetch({
    url: `/post/${id}`
  }).then((response) => {
    const { code, data } = response
    if (+code >= 0) {
      return { id, data }
    }
    throw new Error(response.error)
  })
}

const fetchTags = () => {
  return fetch({
    url: '/tags'
  }).then((response) => {
    const { code, data } = response
    if (+code >= 0) {
      return data
    }
    throw new Error(response.error)
  })
}

const fetchPostsByTag = (tag, page, pageSize) => {
  return fetch({
    url: `/tag/${tag}?page=${page}&pageSize=${pageSize}`,
  }).then((response) => {
    const { code, data } = response
    if (+code >= 0) {
      return {
        tag,
        page,
        data
      }
    }
    throw new Error(response.error)
  })
}

const fetchArchives = (page, pageSize) => {
  return fetch({
    url: `/archives?page=${page}&pageSize=${pageSize}`
  }).then((response) => {
    const { code, data } = response
    if (+code >= 0) {
      return {
        page,
        data
      }
    }
    throw new Error(response.error)
  })
}

export default {
  fetchPosts,
  fetchPostById,
  fetchTags,
  fetchPostsByTag,
  fetchArchives
}
