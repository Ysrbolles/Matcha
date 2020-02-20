const router = require('express').Router()
const User = require('../../models/User')
const { isEmpty } = require('../../outils')

router.delete('/', (req, res) => {
  if (isEmpty(req.body.filename) || isEmpty(req.body.user_id)) {
    return res.json({ err: 'ERRORS.DATA_MISSING' })
  }
  return new User().deletePicture(req.body.user_id, req.body.filename)
    .then(user => res.json({ user }))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
