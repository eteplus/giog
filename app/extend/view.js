/* eslint-disable import/no-dynamic-require */
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')

const isProd = process.env.NODE_ENV === 'production'

const rootPath = path.resolve(__dirname, '../../')

const defaults = {
  template: path.resolve(rootPath, isProd ? 'app/index.html' : 'src/index.template.html'),
  bundle: path.resolve(rootPath, 'public/vue-ssr-server-bundle.json'),
  clientManifest: path.resolve(rootPath, 'public/vue-ssr-client-manifest.json')
}

class View {
  /**
   * @param {KoaInstance} app
   * @param {object} options
   * {
   *   template,
   *   bundle,
   *   clientManifest
   * }
   */
  constructor(app, options = {}) {
    this.template = fs.readFileSync(options.template || defaults.template, 'utf-8')

    if (isProd) {
      const bundle = require(options.bundle || defaults.bundle)
      const clientManifest = require(options.clientManifest || defaults.clientManifest)
      this.renderer = this.createRenderer(bundle, {
        clientManifest
      })
    } else {
      const devServer = path.resolve(rootPath, 'build/setup-dev-server')
      this.ready = require(devServer)(app, options.template || defaults.template, (bundle, opts) => {
        this.renderer = this.createRenderer(bundle, opts)
      })
    }
  }

  /**
   * create bundle renderer
   * @param {file} bundle
   * @param {object} options
   */
  createRenderer(bundle, options = {}) {
    return require('vue-server-renderer').createBundleRenderer(bundle, Object.assign({
      template: this.template,
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
      basedir: path.resolve(rootPath, 'public'),
      runInNewContext: false
    }, options))
  }

  /**
   * render html
   * @param {object} context
   * {
   *   url,
   *   title
   * }
   */
  render(context) {
    return new Promise((resolve, reject) => {
      this.renderer.renderToString(context, (err, html) => {
        if (err) {
          reject(err)
        }
        resolve(html)
      })
    })
  }
}

module.exports = View
