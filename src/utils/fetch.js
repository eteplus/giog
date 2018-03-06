import axios from 'axios'

// const isProd = process.env.NODE_ENV === 'production'

const host = process.env.VUE_ENV === 'server'
  ? 'http://127.0.0.1:3030'
  : ''

const fetch = axios.create({
  baseURL: host + '/api',
  timeout: 5000,
  headers: {
  }
})

fetch.interceptors.response.use((response) => {
  return response.data
}, error => Promise.reject(error))

export default fetch
