const User = require('../models/User')
const bcrypt = require('bcryptjs')


const register = async (req, res, next) => {
    try {
        const check = await User.findOne({ email: req.body.email })
        if (check != null) {
            req.flash('msg', 'Email already exists!')
            res.redirect('/')
        } else {
            const salt = bcrypt.genSaltSync(10)
            
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt),
                phone: req.body.phone,
                photo: 'img/user.png',
                state: req.body.state,
                source: req.body.source,
                role: 'user'
            })
            await user.save()
    
            next()
        }
    } catch (err) {
        res.status(404).send({ err })
    }
}

const profile = async (req, res) => {
    res.status(200).render('user/user_profile', {
        layout: 'user_layout',
        msg: req.flash('msg'),
        user: req.user
    })
}
 
const update = async (req, res) => {
    try {
        const isMatch = bcrypt.compareSync(req.body.password, req.user.password)

        if(!isMatch) {
            req.flash('msg', 'Wrong password!')
            res.redirect('/profile')
        } else {
            const { _id } = req.user
            const user = {
                name: req.body.name,
                phone: req.body.phone,
                state: req.body.state
            }
            await User.updateOne({ _id }, user)
            
            req.flash('msg', 'Profile updated successfully!')
            res.redirect('/profile')
        }
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy = async (req, res) => {
    try {
        if(req.body.password !== req.user.password) {
            req.flash('msg', 'Wrong password!')
            res.redirect('/profile')
        } else {
            const { _id } = req.user
            await User.findByIdAndDelete(_id)
            
            req.flash('msg', 'Account Deleted Successfully!')
            res.redirect('/')
        }
    } catch (err) {
        res.status(404).json({ err })
    }
}


module.exports = {
    register,
    profile,
    update,
    destroy
}