// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Controller---------//
const PaymentController = require('../controllers/paymentController')

// -----------Middleware---------//
const { ensureAuth } = require('../middlewares/auth')


// -----------Router---------//
router.get(
    '/create-payment', 
    ensureAuth,
    PaymentController.create_payment,
)

router.post(
    '/start-payment', 
    ensureAuth,
    PaymentController.start_payment,
)

router.get(
    '/record-payment', 
    ensureAuth,
    PaymentController.record_payment,
)

router.get(
    '/get-payment', 
    ensureAuth,
    PaymentController.get_payment,
)


module.exports = router