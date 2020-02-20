const express = require('express')
const router = express.Router()
const jwt = require('../../models/JsonWebToken')
const { isEmpty } = require('../../outils')


router.get('/', (req, res) => {
  const bearerHeader = req.headers["authorization"]
  const token = bearerHeader.split(' ')[1]
    if(isEmpty(token)) return res.json({err: 'One or more arguments are missing.'})
    return new jwt().check(token)
    .then(data => {
      res.send(data)})
    .catch(err => res.json({err: err.message}))
})

module.exports = router
