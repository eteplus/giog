'use strict'

const path = require('path')

const resolve = filepath => path.join(__dirname, '..', filepath)

module.exports = {

  useMicroCache: process.env.MICRO_CACHE !== 'false',
  // cacheUrls: ['/', '/post', '/tags', '/tag', '/archives'],

  userInfo: {
    github: 'https://github.com/eteplus',
    userName: 'ETEPLUS',
    avatar: '/static/img/avatar.jpeg',
    motto: 'Designer and Coder. ^_^',
  },

  siteInfo: {
    name: 'ETEPLUS',
    // website record number - ICP备xxxxx号
    recordText: ''
  }
}
