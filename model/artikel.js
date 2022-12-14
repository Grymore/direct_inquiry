const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')



class Artikel extends Model { }

Artikel.init({
  author: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  body:{
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'artikel'
})

module.exports = Artikel