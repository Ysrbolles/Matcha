const router = require('express').Router()
const User = require('../../models/User')
const { isEmpty } = require('../../outils')
const jwt = require('../../models/JsonWebToken');

router.post('/History', (req, res) => {
  return new jwt().check(req.headers.authorization.split(' ')[1])
  .then((data) => {
    if(isEmpty(data)) return res.send({err: "error"})
  return new User().History(data.data.id)
    .then((c) => res.send(c))
  })
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
