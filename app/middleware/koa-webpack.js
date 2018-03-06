'use strict'

const webpackHotMiddleware = (compiler, options) => {
  const { PassThrough } = require('stream')
  const middleware = require('webpack-hot-middleware')(compiler, options)

  return (ctx, next) => {
    const stream = new PassThrough()
    ctx.body = stream
    return middleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead(state, headers) {
        ctx.state = state
        ctx.set(headers)
      },
    }, next)
  }
}

const webpackDevMiddleware = (compiler, options) => {
  const middleware = require('webpack-dev-middleware')(compiler, options)

  return Object.assign((ctx, next) => middleware(ctx.req, {
    end(content) {
      ctx.body = content
    },
    setHeader() {
      ctx.set.apply(ctx, arguments)
    }
  }, next), {
    fileSystem: middleware.fileSystem
  })
}

module.exports = {
  webpackDevMiddleware,
  webpackHotMiddleware
}
