const router = require('express').Router()
const Chat = require('../../models/Chat')
const {isEmpty} = require('../../outils')
const jwt = require('../../models/JsonWebToken');

router.post('/message', (req, res)=> {
    if(isEmpty(req.body.sender) || isEmpty(req.body.receiver) || isEmpty(req.body.message)) {
         return res.json({ err: 'ERRORS: Data are Missing'})
    }
    return new jwt().check(req.headers.authorization.split(' ')[1])
    .then((data) => {
    return new Chat().addMessage(req.body.sender, req.body.receiver, req.body.message,  data.data.username)
    })
    .then(() => res.json(200))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
