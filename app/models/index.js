'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const db = {}

const resolve = dir => path.join(__dirname, '../', dir)

const storage = resolve('data/giog.sqlite')

const sequelize = new Sequelize('giog', null, null, {
  dialect: 'sqlite',
  storage: storage,
  operatorsAliases: false
})

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(model => {
  if (db[model].associate) {
    db[model].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
