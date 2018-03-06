'use strict'

const Router = require('koa-router')
const LRU = require('lru-cache')
const chalk = require('chalk')
const View = require('../extend/view')

const isProd = process.env.NODE_ENV === 'production'

const { useMicroCache, cacheUrls } = require('../../config/config')

const isCacheable = ctx => cacheUrls.indexOf(ctx.url) >= 0 && useMicroCache

const microCache = LRU({
  max: 100,
  maxAge: 1200
})

const router = new Router()

module.exports = function(app) {
  // create vue renderer instance
  const view = new View(app)

  async function render(ctx, next) {
    // render middleware
    ctx.type = 'html'

    const { PassThrough } = require('stream')
    ctx.body = new PassThrough()

    if (!view.renderer) {
      ctx.body.end('waiting for compilation... refresh in a moment.')
      return
    }

    // hit micro cache
    const cacheable = isCacheable(ctx)
    if (cacheable) {
      const html = microCache.get(ctx.url)
      if (html) {
        ctx.set('X-Cache-Hit', '1')
        ctx.body.end(html)
        return
      }
    }

    function handleError(error) {
      console.log(chalk.yellow.bold('RENDER ERROR: '), error)
      if (error.url) {
        // fixed stream.push after EOF
        ctx.body.end()
        return ctx.redirect(error.url)
      } else if (error.code === 404) {
        ctx.body.end()
        ctx.status = 404
        return ctx.redirect('/404')
      } else {
        ctx.status = 500
        ctx.body.end('500 | Internal Server Error')
        console.log(`${chalk.yellow.bold('Error During Render:')} ${ctx.url}`)
        // console.error(error.stack)
      }
    }

    function handleEnd(content) {
      if (cacheable) {
        // set micro cache
        microCache.set(ctx.url, content)
      }
      ctx.body.end(content)
    }

    try {
      const context = {
        title: '{ ETE }',
        url: ctx.url
      }
      const content = await view.render(context)
      handleEnd(content)
    } catch (error) {
      handleError(error)
    }
  }

  // Not matched /api uri
  router.get(/^(?!\/api)(?:\/|$)/, isProd ? render : (ctx, next) => {
    view.ready.then(() => render(ctx, next))
  })

  return router
}
