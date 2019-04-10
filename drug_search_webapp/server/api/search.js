const router = require('express').Router()
const {DrugName, Mechanism} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/:queryString', async (req, res, next) => {
  try {
    const queryString = req.params.queryString + '%'

    const drugNames = await DrugName.findAll({
      raw: true,
      order: [['name', 'ASC']],
      where: {
        name: {[Op.like]: queryString}
      }
    })

    const mechanisms = await Mechanism.findAll({
      raw: true,
      order: [['name', 'ASC']],
      where: {
        name: {[Op.like]: queryString}
      }
    })

    if (mechanisms.length + drugNames.length === 0) {
      res.sendStatus(204)
    } else {
      let results = mergeSortedArrays(drugNames, mechanisms)
      results = distinguishDrugsFromMechanisms(results)
      res.status(200).send(results)
    }
  } catch (err) {
    next(err)
  }
})
function distinguishDrugsFromMechanisms(results) {
  return results.map(item => {
    let isDrug = false
    let isMechanism = false
    if (item.nameType) {
      isDrug = true
    } else isMechanism = true
    return {...item, isDrug, isMechanism}
  })
}

//ascending order
function mergeSortedArrays(arr1, arr2) {
  let returnArr = []
  let idx1 = 0
  let idx2 = 0
  while (idx1 < arr1.length && idx2 < arr2.length) {
    let item1 = arr1[idx1]
    let item2 = arr2[idx2]
    if (item1.name.toLowerCase() < item2.name.toLowerCase()) {
      returnArr.push(item1)
      idx1++
    } else if (item2.name.toLowerCase() <= item1.name.toLowerCase()) {
      returnArr.push(item2)
      idx2++
    }
  }
  if (idx1 < arr1.length) return returnArr.concat(arr1.slice(idx1))
  if (idx2 < arr2.length) return returnArr.concat(arr2.slice(idx2))
}
