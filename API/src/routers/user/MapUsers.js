const router = require('express').Router()
const User = require('../../models/User')

 router.get('/allmap', (req, res) => {
    return new User().fetchAllII()
    .then((success) => {
      return res.json(success)
    })
    .catch(err => res.json({err: err.message}))
})
module.exports = router