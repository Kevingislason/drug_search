const router = require('express').Router()
const {Drug, Mechanism, DrugName} = require('../db/models')
module.exports = router

router.get('/:drugId', async (req, res, next) => {
  try {
    const drugId = req.params.drugId
    const drug = await Drug.find({
      where: {id: drugId},
      include: [DrugName, Mechanism]
    })
    if (drug === null) res.sendStatus(404)
    else res.status(200).json(drug)
  } catch (err) {
    next(err)
  }
})
