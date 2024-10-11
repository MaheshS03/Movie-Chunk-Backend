const express = require('express')
const router = express.Router()

const {uploadVideo, getVideo} = require('../controllers/movieController')
const upload = require('../middleware/multer')

router.post('/upload', upload.single('file'), uploadVideo)
router.get('/video/id/:id', getVideo)

module.exports = router