// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Controller---------//
const PaymentController = require('../controllers/paymentController')

// -----------Middleware---------//
const { ensureAuth } = require('../middlewares/auth')


// -----------Router---------//
router.get(
    '/cart', 
    ensureAuth,
    PaymentController.create_payment
)

router.post(
    '/start/:id', 
    ensureAuth,
    PaymentController.start_payment
)

router.get(
    '/callback?', 
    ensureAuth,
    PaymentController.record_payment
)

router.get(
    '/get/:refrence', 
    ensureAuth,
    PaymentController.get_payment
)


module.exports = router