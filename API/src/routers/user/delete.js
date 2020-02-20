const router = require('express').Router()
const User = require('../../models/User')
const { isNumeric } = require('../../outils')

router.delete('/:id', (req, res) => {
  if (!isNumeric(req.params.id)) return res.send("ERROR: id not Num")
  return new User().delete(req.params.id)
    .then(() => res.send("Error"))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
