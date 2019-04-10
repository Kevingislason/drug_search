const Sequelize = require('sequelize')
const db = require('../db')

const DrugMechanism = db.define('drugMechanism', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true}
})

module.exports = DrugMechanism
