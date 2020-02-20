const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { isEmpty } = require('../../outils')
const { JWT } = require('../../config/config')

const create = data => {
    new Promise((resolve, reject) => {
        jwt.sign(data, 'ABFA422265CE21265CDECF71CD8DF', {expireIn: '365d'}, (err, token) => {
            if(!isEmpty(err)) return reject(err)
            return resolve(token)
        })
    })
}

router.post('/', (req, res) => {
    if(isEmpty(req.body.data)) return res.json({err: 'DATA MISSING'})
    return create(req.body.data)
        .then((token) => {
            if(isEmpty(token)) return res.json({err: 'An error occured. Please try again later.'})
            return res.json({token, createdAt: Date.now(), expireIn: Date.now() + 60 * 15  * 1000})
        })
        .catch(err => res.json({err: err.message}))
})

module.exports = router