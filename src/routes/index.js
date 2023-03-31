// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Controller---------//
const IndexController = require('../controllers/indexController')

// -----------Middleware---------//
const { ensureAuth, ensureGuest } = require('../middlewares/auth')


// -----------Router---------//

router.get('/', ensureGuest, IndexController.index)

router.post('/send-mail', IndexController.sendEmail)

router.get('*', IndexController.error)


module.exports = router
