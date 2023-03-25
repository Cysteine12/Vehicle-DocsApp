// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Controller---------//
const IndexController = require('../controllers/indexController')

// -----------Middleware---------//
const { ensureAuth, ensureGuest } = require('../middlewares/auth')


// -----------Router---------//

router.get('/', ensureGuest, IndexController.index)

router.get('/updateUser', async (req, res) => {
    const User = require('../models/User')
    const user = await User.updateMany({}, { role: 'user' })
    res.status(200).send(user)
})

router.get('*', IndexController.error)


module.exports = router
