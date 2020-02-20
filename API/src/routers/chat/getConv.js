const router = require('express').Router()
const Chat = require('../../models/Chat')
const { isEmpty} = require('../../outils')


router.get('/conversation', (req, res) => {
    
    if(isEmpty(req.query.user_id)){
        return res.json({ err: 'ERRORS: Data are missing '})
    }
    return new Chat().Conversations(req.query.user_id)
    .then(conv => {
        res.json({conv})
    })
    .catch(err => res.json({err: err.message}))
})

module.exports = router