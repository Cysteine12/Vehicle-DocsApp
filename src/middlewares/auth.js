module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role !== 'admin') {
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role !== 'admin') {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    },
    ensureAdminAuth: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            return next()
        } else {
            res.redirect('/admin/login')
        }
    },
    ensureAdminGuest: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            res.redirect('/admin/dashboard')
        } else {
            return next()
        }
    },
    isAuth: (req) => {
        if (req.isAuthenticated()) return true
        else return false
    }
}