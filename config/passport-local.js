const LocalStrategy = require('passport-local').Strategy
const User = require('../src/models/User')


module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            let user;
            if (req.body.role !== 'admin') {
                user = await User.findOne({ email: email, role: 'user' }).lean()
            } else {
                user = await User.findOne({ email: email, role: 'admin' }).lean()
            }
            if(user) {
                const isMatch = user.password === password
                if (!isMatch) {
                    req.flash('err-msg', 'Incorrect password')
                    return done(null, false)
                } else {
                    return done(null, user)
                }
            } else {
                req.flash('err-msg', 'Email is not found')
                return done(null, false)
            }
        } catch (err) {
            return done(err, false)
        }
    }))
    passport.serializeUser((user, done) => {
        let userData = {
            _id: user._id,
            role: user.role
        }
        done(null, userData)
    })
    passport.deserializeUser(async (userData, done) => {
        try {
            let user;
            if (userData.role !== 'admin') {
                user = await User.findOne({ _id: userData._id, role: 'user' }).lean()
            } else {
                user = await User.findOne({ _id: userData._id, role: 'admin' }).lean()
            }
            return done(null, user)
        } catch (err) {
            return done(err, null)
        }
    })
}