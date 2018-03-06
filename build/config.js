const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },

    // Paths
    assetsRoot: path.resolve(__dirname, '../public'),
    assetsSubDirectory: 'frontend',
    assetsPublicPath: '',

    // Source map
    productionSourceMap: false,

    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    assetsSubDirectory: 'frontend',
    assetsPublicPath: '/',
    // Source map
    cssSourceMap: false,
    devtool: 'eval-source-map',

    cacheBusting: true,
  }
}
