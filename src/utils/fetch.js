import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

const host = process.env.VUE_ENV === 'server'
  ? isProd ? 'http://127.0.0.1:3030' : 'http://127.0.0.1:3030'
  : ''

const fetch = axios.create({
  baseURL: host + '/api',
  timeout: 5000,
  headers: {
  }
})

fetch.interceptors.response((response) => {
  console.log(response)
  return response
}, error => Promise.reject(error))

export default fetch
