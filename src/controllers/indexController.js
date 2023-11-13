const User = require('../models/User')
const emailService = require('../services/emailService')

const index = async (req, res) => {
    res.status(200).render('home', {
        msg: req.flash('err-msg'),
        mailStatus: req.flash('mailStatus'),
        user: req.user
    })
}

const about = async (req, res) => {
    res.status(200).render('about', {
        msg: req.flash('err-msg'),
        mailStatus: req.flash('mailStatus'),
        user: req.user
    })
}

const contact = async (req, res) => {
    res.status(200).render('contact', {
        msg: req.flash('err-msg'),
        mailStatus: req.flash('mailStatus'),
        user: req.user
    })
}

const services = async (req, res) => {
    res.status(200).render('services', {
        msg: req.flash('err-msg'),
        mailStatus: req.flash('mailStatus'),
        user: req.user
    })
}

const login = async (req, res) => {
    res.status(200).render('login', {
        layout: 'form_layout',
        msg: req.flash('err-msg')
    })
}

const register = async (req, res) => {
    res.status(200).render('register', {
        layout: 'form_layout',
        msg: req.flash('err-msg')
    })
}

const sendEmail = async (req, res) => {
    try {
        await emailService.sendEmail(req.body)
        req.flash('mailStatus', 'Email Sent!')
        res.redirect('/')
    } catch (err) {
        req.flash('mailStatus', `Error, Email not sent! ${err}`)
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
    about,
    contact,
    services,
    login,
    register,
    sendEmail,
    error
}
