const router = require('express').Router()
const User = require('../../models/User')
const { isEmpty } = require('../../outils')


router.post('/report', (req, res) => {
    console.table(req.body)
  if (isEmpty(req.body.reporter) || isEmpty(req.body.reported)) {
      
    return res.json({ err: 'ERRORS.DATA ARE MISSING' })
  }
  return new User().Report(req.body.reporter, req.body.reported)
    .then(() => res.json(200))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
