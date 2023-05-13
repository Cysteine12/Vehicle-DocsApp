// -----------Back-end---------//
const express = require('express')
const router = express.Router()
const passport = require('passport')

// -----------Controller---------//
const DocumentController = require('../controllers/documentController')

// -----------Middleware---------//
const { ensureAuth } = require('../middlewares/auth')


// -----------Router---------//


// Vehicle papers
router.get(
    '/vehicle-papers', 
    ensureAuth,
    DocumentController.create_vehicle_papers,
)

router.post(
    '/vehicle-papers', 
    ensureAuth,
    DocumentController.store_vehicle_papers,
)

router.get(
    '/vehicle-papers/:id', 
    ensureAuth,
    DocumentController.show_vehicle_papers,
)

router.delete(
    '/vehicle-papers/:id', 
    ensureAuth,
    DocumentController.destroy_vehicle_papers,
)


// Renew Papers
router.get(
    '/renew-papers', 
    ensureAuth,
    DocumentController.create_renew_papers,
)

router.post(
    '/renew-papers', 
    ensureAuth,
    DocumentController.store_renew_papers,
)

router.get(
    '/renew-papers/:id', 
    ensureAuth,
    DocumentController.show_renew_papers,
)

router.delete(
    '/renew-papers/:id', 
    ensureAuth,
    DocumentController.destroy_renew_papers,
)


// Driver Licence
router.get(
    '/driver-license', 
    ensureAuth,
    DocumentController.create_driver_license,
)

router.post(
    '/driver-license', 
    ensureAuth,
    DocumentController.store_driver_license,
)

router.get(
    '/driver-license/:id', 
    ensureAuth,
    DocumentController.show_driver_license,
)

router.delete(
    '/driver-license/:id', 
    ensureAuth,
    DocumentController.destroy_driver_license,
)


// change-of-ownership
router.get(
    '/change-of-ownership', 
    ensureAuth,
    DocumentController.create_ownership_change,
)

router.post(
    '/change-of-ownership', 
    ensureAuth,
    DocumentController.store_ownership_change,
)

router.get(
    '/change-of-ownership/:id', 
    ensureAuth,
    DocumentController.show_ownership_change,
)

router.delete(
    '/change-of-ownership/:id', 
    ensureAuth,
    DocumentController.destroy_ownership_change,
)


// comprehensive-insurance
router.get(
    '/comprehensive-insurance', 
    ensureAuth,
    DocumentController.create_comprehensive_insurance,
)

router.post(
    '/comprehensive-insurance', 
    ensureAuth,
    DocumentController.store_comprehensive_insurance,
)

router.get(
    '/comprehensive-insurance/:id', 
    ensureAuth,
    DocumentController.show_comprehensive_insurance,
)

router.delete(
    '/comprehensive-insurance/:id', 
    ensureAuth,
    DocumentController.destroy_comprehensive_insurance,
)


// other-permits
router.get(
    '/other-permits', 
    ensureAuth,
    DocumentController.create_other_permits,
)

router.post(
    '/other-permits', 
    ensureAuth,
    DocumentController.store_other_permits,
)

router.get(
    '/other-permits/:id', 
    ensureAuth,
    DocumentController.show_other_permits,
)

router.delete(
    '/other-permits/:id', 
    ensureAuth,
    DocumentController.destroy_other_permits,
)


module.exports = router