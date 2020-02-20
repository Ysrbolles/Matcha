const router = require('express').Router()
const User = require('../../models/User')
const {isEmpty } = require('../../outils')
const jwt = require('../../models/JsonWebToken');

router.post('/like', (req, res) => {
   console.log(req.body)
     if(isEmpty(req.body.liker) || isEmpty(req.body.liked)) {
        return res.json({ err: 'Data are missing' })
     }
    return new jwt().check(req.headers.authorization.split(' ')[1])
    .then((data) => {

     return new User().addLike(req.body.liker, req.body.liked, data.data.username)
     .then((r) => {
       if(isEmpty(r))
        res.json({ result: 0})
      else
        res.json({ result: 1, user: r[0].username})
      })
      })
     .catch(err => res.json({err: err.message}))
})

module.exports = router
