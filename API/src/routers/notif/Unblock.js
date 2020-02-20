const router = require('express').Router()
const User = require('../../models/User')
const { isEmpty } = require('../../outils')


router.delete('/unblock', (req, res) => {
  if (isEmpty(req.body.unblocker) || isEmpty(req.body.unblocked)) {
    return res.json({ err: 'ERRORS: are missing'})
  }
  return new User().unblock(req.body.unblocker, req.body.unblocked)
    .then(() => res.json(200))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
