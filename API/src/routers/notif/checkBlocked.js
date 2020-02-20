const router = require('express').Router()
const User = require('../../models/User')

router.get('/checkBlocked', (req, res) => {
    return new User().checkBlocked(req.query.id, req.query.uid)
    .then((rows) => {
        res.send(rows)
    })
    .catch((err) => err.message)
})

module.exports = router