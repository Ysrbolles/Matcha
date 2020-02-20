const router = require('express').Router()
const Chat = require('../../models/Chat')
const {isEmpty } = require('../../outils')

router.get('/message', (req, res) =>{
    if(isEmpty(req.query.sender) || isEmpty(req.query.receiver)){
        return res.json({err: 'ERROR: Data are Missing'})
    }
    return new Chat().Messages(req.query.sender, req.query.receiver)
    .then(messages => res.json({messages}))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router