const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodejs', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 8889,
  logging: false,
})

module.exports = sequelize