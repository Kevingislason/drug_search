const Sequelize = require('sequelize')
const db = require('../db')

const Drug = db.define('drug', {
  developmentStatus: Sequelize.ARRAY(Sequelize.JSON)
})

module.exports = Drug
