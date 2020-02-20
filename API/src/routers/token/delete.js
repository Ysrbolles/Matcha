const express = require('express')
const router = express.Router()
const jwt = require('../../models/JsonWebToken')
const { isEmpty } = require('../../outils')

router.delete('/', (req, res) => {
    if(isEmpty(req.bady.token)) return res.json({err: 'An error occured. Please try again later.'})
    return new jwt().delete(req.query.token)
    .then(() => res.json(200))
    .catch(() => res.json(403))
})

module.exports = router