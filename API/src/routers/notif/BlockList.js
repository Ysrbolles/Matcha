const router = require('express').Router()
const User = require('../../models/User')

router.get('/blockedlist', (req, res) => {
    return new User().getBlocked(req.query.id)
    .then((rows) => {
        res.send(rows)
    })
    .catch((err) => err.message)
})

module.exports = router