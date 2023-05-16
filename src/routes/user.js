// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Controller---------//
const UserController = require('../controllers/userController')

// -----------Middleware---------//
const { ensureAuth } = require('../middlewares/auth')


// -----------Router---------//
router.get(
    '/dashboard', 
    ensureAuth,
    UserController.dashboard,
)

router.get(
    '/check/:doctype/:id', 
    ensureAuth,
    UserController.checkRoute,
)


module.exports = router