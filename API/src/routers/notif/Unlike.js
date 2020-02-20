const router = require('express').Router()
const User = require('../../models/User')
const { isEmpty } = require('../../outils')
const jwt = require('../../models/JsonWebToken');

router.post('/unlike', (req, res) => {
  if (isEmpty(req.body.unliker) || isEmpty(req.body.unliked)) {
    return res.json({ err: 'ERRORS.DATA_MISSING '})
  }
  return new jwt().check(req.headers.authorization.split(' ')[1])
  .then((data) => {
  return new User().unlike(req.body.unliker, req.body.unliked, data.data.username)
    .then(() => res.json(200))
  })
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
