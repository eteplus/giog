'use strict'

const chalk = require('chalk')
const Github = require('./service/github')

const service = new Github()

console.log(`${chalk.green('Start ->')}\n`)

service.fetch().then((result) => {
  console.log(`\n${chalk.green('-> Done')}`)
}).catch(error => {
  console.log(`\n${chalk.red('[ERROR]')}: ${error.message}`)
})
