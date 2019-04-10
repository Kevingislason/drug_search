const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/search', require('./search'))

router.use('/drugs', require('./drugs'))

router.use('/mechanisms', require('./mechanisms'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
