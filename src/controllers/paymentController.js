const paymentService = require('../services/paymentService')

const paymentInstance = new paymentService()

const create_payment = (req, res) => {
    res.status(200).render('user/create_payment', {
        msg: req.flash('msg'),
        user: req.user
    })
}

const start_payment = async (req, res) => {
    try {
        console.log(req.body);
        const response = await paymentInstance.startPayment(req.body)
        
        res.status(201).send({ 
            status: 'success', 
            data: response 
        })
    } catch (err) {
        res.status(500).send({ 
            status: 'Failed', 
            msg: err.message 
        })
    }
}

const record_payment = async () => {
    try {
        const response = await paymentInstance.recordPayment(req.query)
        
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

const get_payment = async () => {
    try {
        const response = await paymentInstance.getPayment(req.body)
        
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