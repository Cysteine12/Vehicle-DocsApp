// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Controller---------//
const PaymentController = require('../controllers/paymentController')

// -----------Middleware---------//
const { ensureAuth } = require('../middlewares/auth')


// -----------Router---------//
router.get(
    '/create', 
    ensureAuth,
    PaymentController.create_payment
)

router.post(
    '/start', 
    ensureAuth,
    PaymentController.start_payment
)

router.get(
    '/callback?', 
    ensureAuth,
    PaymentController.record_payment
)

router.get(
    '/get', 
    ensureAuth,
    PaymentController.get_payment
)


module.exports = router