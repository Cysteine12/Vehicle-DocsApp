const paymentService = require('../services/paymentService')


const create_payment = (req, res) => {
    res.status(200).render('user/create_payment', {
        msg: req.flash('msg'),
        user: req.user
    })
}

const start_payment = async (req, res) => {
    try {
        req.body.full_name = req.user.name
        const response = await paymentService.startPayment(req.body)
        
        // res.status(201).send({ 
        //     status: 'success', 
        //     data: response 
        // })
        res.redirect(response.data.authorization_url)
    } catch (err) {
        res.status(500).send({ 
            status: 'Failed', 
            msg: err.message 
        })
    }
}

const record_payment = async (req, res) => {
    try {
        const response = await paymentService.recordPayment(req.query)
        
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
        const response = await paymentService.getPayment(req.body)
        
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