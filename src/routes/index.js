// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Controller---------//
const IndexController = require('../controllers/indexController')

// -----------Middleware---------//
const { ensureAuth, ensureGuest } = require('../middlewares/auth')


// -----------Router---------//

router.get('/', ensureGuest, IndexController.index)

router.get('/about', ensureGuest, IndexController.about)

router.get('/contact', ensureGuest, IndexController.contact)

router.get('/services', ensureGuest, IndexController.services)

router.get('/login', ensureGuest, IndexController.login)

router.get('/register', ensureGuest, IndexController.register)

router.post('/send-mail', IndexController.sendEmail)

router.get('*', IndexController.error)


module.exports = router
