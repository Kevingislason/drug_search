const router = require('express').Router()
const {Drug, DrugMechanism, DrugName} = require('../db/models')
const Op = require('sequelize').Op

module.exports = router

router.get('/:mechanismId', async (req, res, next) => {
  try {
    const mechanismId = req.params.mechanismId

    const drugIds = await DrugMechanism.findAll({
      where: {mechanismId: mechanismId},
      raw: true,
      attributes: ['drugId']
    }).map(obj => obj.drugId)

    const drugsWithThisMechanism = await DrugName.findAll({
      where: {drugId: {[Op.in]: drugIds}}
    })

    res.status(200).send(drugsWithThisMechanism)
  } catch (err) {
    next(err)
  }
})
