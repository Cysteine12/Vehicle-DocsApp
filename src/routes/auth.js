// -----------Back-end---------//
const express = require('express')
const router = express.Router()
const passport = require('passport')

// -----------Controller---------//
const AuthController = require('../controllers/authController')

// -----------Middleware---------//
const { ensureAuth, ensureGuest } = require('../middlewares/auth')


// -----------Router---------//

router.post(
    '/register', 
    ensureGuest,
    AuthController.register,
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/register',
        failureFlash: true
    })
)

router.post(
    '/login', 
    ensureGuest,
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
)

router.get(
    '/profile', 
    ensureAuth, 
    AuthController.profile
)

router.put(
    '/:id', 
    ensureAuth,
    AuthController.update
)

router.delete(
    '/:id', 
    ensureAuth,
    AuthController.destroy
)

router.get('/logout', ensureAuth, (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err) }
        res.redirect('/')
    })
})


module.exports = router