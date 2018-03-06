const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const webpackClientConfig = merge(base, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: isProd ? config.build.productionSourceMap : config.dev.cssSourceMap,
      extract: isProd,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: isProd
    ? (config.build.productionSourceMap ? '#source-map' : false)
    : config.dev.devtool,
  output: {
    filename: utils.assetsPath(isProd
      ? 'js/[name].[chunkhash].js'
      : 'js/[name].js'),
    chunkFilename: utils.assetsPath(isProd
      ? 'js/[id].[chunkhash].js'
      : 'js/[id].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProd
        ? '"production"'
        : JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

if (isProd) {
  webpackClientConfig.plugins.push(
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'maybeul',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /\/(tags|about|archives)/,
          handler: 'networkFirst'
        },
        {
          urlPattern: '/post/:id',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/tag/:tag',
          handler: 'networkFirst'
        }
      ]
    })
  )
  if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackClientConfig.plugins.push(new BundleAnalyzerPlugin())
  }
} else {
  webpackClientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  )
}

module.exports = webpackClientConfig
