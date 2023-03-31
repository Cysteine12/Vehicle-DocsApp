const User = require('../models/User')
const emailService = require('../services/emailService')

const index = async (req, res) => {
    res.status(200).render('home', {
        msg: req.flash('err-msg'),
        mailStatus: req.flash('mailStatus'),
        user: req.user
    })
}

const sendEmail = async (req, res) => {
    try {
        await emailService.sendEmail(req.body)
        req.flash('mailStatus', 'Email Sent!')
        res.redirect('/')
    } catch (err) {
        req.flash('mailStatus', 'Error, Email not sent!')
        res.redirect('/')
    }
}

const error = async (req, res) => {
    res.status(200).render('404', {
        msg: 'Error on request',
        user: req.user
    })
}


module.exports = {
    index,
    sendEmail,
    error
}
