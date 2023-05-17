const request = require('request')
const Payment = require('../models/Payment')
const paystack = require('../../config/paystack')(request)

const paymentService = {
    startPayment: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const form = {
                    email: data.email,
                    amount: data.amount *= 100, 
                    metadata: {
                        full_name: data.full_name
                    }
                }
                paystack.initializePayment(form, (error, body) => {
                    if(error) {
                        reject(error.message)
                    }
                    const response = JSON.parse(body)

                    return resolve(response)
                })
            } catch (err) {
                err.source = 'Start Payment Service'
                return reject(err)
            }
        })
    },

    recordPayment: (req) => {
        const ref = req.reference
        if(ref == null) {
            return { code: 400, msg: 'No reference passed' }
        }
        return new Promise(async (resolve, reject) => {
            try {
                paystack.verifyPayment(ref, (error, body) => {
                    if(error) {
                        reject(error.message)
                    }
                    const response = JSON.parse(body)

                    const { reference, amount, status } = response.data
                    const {email} = response.data.customer
                    const {full_name} = response.data.metadata
                    const newPayment = { full_name, email, amount, reference, status }
                    const payment = Payment.create(newPayment)

                    return resolve(payment)
                })
            } catch (err) {
                err.source = 'Create Payment Service'
                return reject(err)
            }
        })
    },

    getPayment: (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const reference = body.reference
                const transaction = Payment.findOne({ reference })

                return resolve(transaction)
            } catch (err) {
                err.source = 'Payment Reciept'
                return reject(err)
            }
        })
    }
}

module.exports = paymentService