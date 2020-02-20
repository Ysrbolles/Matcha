const router = require('express').Router()
const User = require('../../models/User')
const {isEmpty} = require('../../outils')

router.post('/block', (req, res) => {
    console.log(req.body)
    if(isEmpty(req.body.blocker) || isEmpty(req.body.blocked)) return res.json({err: 'Data are missing'})
    const blocker = req.body.blocker
    const blocked = req.body.blocked
    return new User().addBlock(blocker, blocked)
    .then(() => res.json(200))
    .catch(err => res.json({err: err.message}))
})

module.exports = router