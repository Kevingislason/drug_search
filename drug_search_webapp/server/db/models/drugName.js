const Sequelize = require('sequelize')
const db = require('../db')

const DrugName = db.define('drugName', {
  name: Sequelize.STRING,
  nameType: Sequelize.ENUM('Generic', 'Brand', 'Main')
})

module.exports = DrugName
