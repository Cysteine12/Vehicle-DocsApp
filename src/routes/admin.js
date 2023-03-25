// -----------Back-end---------//
const express = require('express')
const router = express.Router()
const passport = require('passport')

// -----------Controller---------//
const AdminController = require('../controllers/adminController')

// -----------Middleware---------//
const { ensureAdminAuth, ensureAdminGuest } = require('../middlewares/auth')


// -----------Router---------//

router.post(
    '/register', 
    ensureAdminGuest,
    AdminController.register,
    passport.authenticate('local', { 
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })
)

router.get(
    '/login', 
    ensureAdminGuest, 
    AdminController.login
)

router.post(
    '/login', 
    ensureAdminGuest,
    passport.authenticate('local', { 
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })
)

router.get(
    '/profile', 
    ensureAdminAuth, 
    AdminController.profile
)

router.put(
    '/:id', 
    ensureAdminAuth,
    AdminController.update
)

router.delete(
    '/:id', 
    ensureAdminAuth,
    AdminController.destroy
)

router.get('/logout', ensureAdminAuth, (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err) }
        res.redirect('/admin/login')
    })
})

//---- Other routes ----//
router.get(
    '/dashboard',
    ensureAdminAuth,
    AdminController.dashboard,
)

router.get(
    '/check/:doctype/:id', 
    ensureAdminAuth,
    AdminController.checkRoute,
)

// Vehicle papers
router.get(
    '/document/vehicle-papers/:id', 
    ensureAdminAuth,
    AdminController.show_vehicle_papers,
)

router.put(
    '/document/vehicle-papers/:id', 
    ensureAdminAuth,
    AdminController.update_vehicle_papers,
)

// Driver Licence
router.get(
    '/document/driver-license/:id', 
    ensureAdminAuth,
    AdminController.show_driver_license,
)

router.put(
    '/document/driver-license/:id', 
    ensureAdminAuth,
    AdminController.update_driver_license,
)

// change-of-ownership
router.get(
    '/document/change-of-ownership/:id', 
    ensureAdminAuth,
    AdminController.show_ownership_change,
)

router.put(
    '/document/change-of-ownership/:id', 
    ensureAdminAuth,
    AdminController.update_ownership_change,
)

// comprehensive-insurance
router.get(
    '/document/comprehensive-insurance/:id', 
    ensureAdminAuth,
    AdminController.show_comprehensive_insurance,
)

router.put(
    '/document/comprehensive-insurance/:id', 
    ensureAdminAuth,
    AdminController.update_comprehensive_insurance,
)

// other-permits
router.get(
    '/document/other-permits/:id', 
    ensureAdminAuth,
    AdminController.show_other_permits,
)

router.put(
    '/document/other-permits/:id', 
    ensureAdminAuth,
    AdminController.update_other_permits,
)


module.exports = router