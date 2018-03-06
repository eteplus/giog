'use strict'

const path = require('path')

console.log(__dirname)

const resolve = filepath => path.join(__dirname, '..', filepath)

module.exports = {

  useMicroCache: process.env.MICRO_CACHE !== 'false',
  cacheUrls: ['/', '/home', '/menu', '/button']
}
