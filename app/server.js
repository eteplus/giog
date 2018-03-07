'use strict'

const path = require('path')
const bluebird = require('bluebird')
const Koa = require('koa')
const favicon = require('koa-favicon')
const compression = require('koa-compress')
const chalk = require('chalk')
const logger = require('./middleware/logger')

global.Promise = bluebird

const rootPath = path.resolve(__dirname, '../')

const isProd = process.env.NODE_ENV === 'production'

// create koa instance
const app = new Koa()

app.keys = ['pixel']

const api = require('./route/api')
const view = require('./route/view')(app)

// cache static
const serve = (filepath, cache) => require('koa-static')(path.resolve(rootPath, filepath), {
  maxage: cache && isProd ? 60 * 60 * 24 * 30 * 1000 : 0
})

app.use(logger())
app.use(compression({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(favicon(`${rootPath}/public/favicon.ico`, {
  maxAge: isProd ? 60 * 60 * 24 * 1000 : 0
}))
app.use(serve('public', true))

// api routes
app.use(api.routes()).use(api.allowedMethods({
  throw: true
}))

// view routes
app.use(view.routes()).use(view.allowedMethods({
  throw: true
}))

const port = process.env.PORT || 3030
const host = !isProd ? '127.0.0.1' : '0.0.0.0'

app.listen(port, host, () => {
  console.log('\n--------- Started ---------')
  console.log(chalk.bold('NODE_ENV:'), chalk.keyword('orange').bold(process.env.NODE_ENV || 'development'))
  const url = `http://${host}:${port}`
  console.log(chalk.bold('SERVER:'), chalk.blue.bold(url))
  console.log('---------------------------\n')
})
