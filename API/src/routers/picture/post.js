const router = require('express').Router()
const multer = require('multer')
const User = require('../../models/User')
const {isEmpty, random, isImage} = require('../../outils')


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') cb(null, true)
    else cb(null, false)
  }

  const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, './src/assets/uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + file.originalname)

    },

  })

  const upload = multer({
    storage,
    limits: {
      // fileSize: 1800 * 1200 * 5,
    },
    fileFilter,
  })

  router.post('/', upload.single('filename'), (req, res) => {
    if (isEmpty(req.file)) return res.send({ err:' ERRORS.DATA_VALIDATION '})
    if (isEmpty(req.body.user_id)) return res.json({ err: 'ERRORS.DATA_MISSING '})
    if (!isImage(req.file.path)) return res.json({ err: 'Image not valid '})
    return new User().addPicture(req.file, req.body.user_id)
    .then(user => {
      res.json({ user })})
    .catch(err => {
      res.json({ err: err.message })})
  })

  module.exports = router
