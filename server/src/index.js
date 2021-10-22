const express = require('express');
const user = require('./api/user')
const auth = require('./api/auth')
const upload = require('./api/upload')
const museum = require('./api/museum')
const indexes = require('./api/indexes')
const exhibit = require('./api/exhibit')


const router = express.Router();

router.use('/user', user)
router.use('/auth', auth)
router.use('/upload', upload)
router.use('/uploads', express.static(__dirname + '/../uploads'))
router.use('/museum', museum)
router.use('/indexes', indexes)
router.use('/exhibit', exhibit)

module.exports = router