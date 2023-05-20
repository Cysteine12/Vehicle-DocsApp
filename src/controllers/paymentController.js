const paymentService = require('../services/paymentService')
const Document = require('../models/Document')


const create_payment = async (req, res) => {
    const userId = req.user._id
    
    const documents = await Document.find({ 
        userId: userId,
        paymentReference: null 
    }).populate('vehicleId').sort({ createdAt: -1 }).lean()

    res.status(200).render('user/cart', {
        user: req.user,
        msg: req.flash('msg'),
        documents: documents
    })
}

const start_payment = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id })

        const body = {
            full_name: req.user.name,
            email: req.user.email,
            amount: document.data.amount
        }
        const response = await paymentService.startPayment(body)

        await Document.updateOne({ _id: req.params.id }, {
            paymentReference: response.data.reference
        })
        
        res.redirect(await response.data.authorization_url)
    } catch (err) {
        res.status(500).send({ 
            status: 'Failed', 
            msg: err.message 
        })
    }
}

const record_payment = async (req, res) => {
    try {
        const response = await paymentService.recordPayment(req.query).lean()
        
        res.status(201).send({ 
            status: 'Success', 
            data: response 
        })
    } catch (err) {
        res.status(500).send({ 
            status: 'Failed', 
            msg: err.message 
        })
    }
}

const get_payment = async (req, res) => {
    try {
        const response = await paymentService.getPayment(req.body).lean()
        
        res.status(201).send({ 
            status: 'Success', 
            data: response 
        })
    } catch (err) {
        res.status(500).send({ 
            status: 'Failed', 
            msg: err.message 
        })
    }
}


module.exports = {
    create_payment,
    start_payment,
    record_payment,
    get_payment
}