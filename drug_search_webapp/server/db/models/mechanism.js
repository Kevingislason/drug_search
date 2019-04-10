const Sequelize = require('sequelize')
const db = require('../db')

const Mechanism = db.define('mechanism', {
  name: Sequelize.STRING
})

module.exports = Mechanism
