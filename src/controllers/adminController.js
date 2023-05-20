const User = require('../models/User')
const Document = require('../models/Document')
const Vehicle = require('../models/Vehicle')
const bcrypt = require('bcryptjs')
const photoService = require('../services/photoService')


const login = async (req, res) => {
    res.status(200).render('admin/home', {
        msg: req.flash('err-msg'),
        user: req.user
    })
}

const register = async (req, res, next) => {
    try {
        const check = await User.findOne({ email: req.body.email })
        if (check != null) {
            req.flash('msg', 'Email already exists!')
            res.redirect('/admin/login')
        } else {
            const salt = bcrypt.genSaltSync(10)

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt),
                phone: req.body.phone,
                photo: 'img/user.png',
                role: 'admin'
            })
            await user.save()
    
            next()
        }
    } catch (err) {
        res.status(404).send({ err })
    }
}

const profile = async (req, res) => {
    res.status(200).render('admin/admin_profile', {
        msg: req.flash('msg'),
        user: req.user
    })
}
 
const update = async (req, res) => {
    try {
        const isMatch = bcrypt.compareSync(req.body.password, req.user.password)

        if(!isMatch) {
            req.flash('msg', 'Wrong password!')
            res.redirect('/admin/profile')
        } else {
            const { _id } = req.user
            const user = {
                name: req.body.name,
                phone: req.body.phone
            }
            await User.updateOne({ _id }, user)
            
            req.flash('msg', 'Profile updated successfully!')
            res.redirect('/admin/profile')
        }
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy = async (req, res) => {
    try {
        if(req.body.password !== req.user.password) {
            req.flash('msg', 'Wrong password!')
            res.redirect('/admin/profile')
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


//---- Other Controllers ----//

const dashboard = async (req, res) => {
    const documents = await Document.find({}).populate('userId').sort({ updatedAt: -1 }).lean()
    const documentCount = await Document.count('documentCount')
    const vehicleCount = await Vehicle.count('vehicleCount')
    const submittedCount = await Document.find({ status: 'submitted' }).count('submittedCount')
    const processingCount = await Document.find({ status: 'processing' }).count('processingCount')
    
    res.status(200).render('admin/dashboard', {
        msg: req.flash('msg'),
        documents: documents,
        count: {
            vehicleCount: vehicleCount,
            documentCount: documentCount,
            submittedCount: submittedCount,
            processingCount: processingCount
        },
        user: req.user
    })
}

const checkRoute = (req, res) => {
    const { doctype, id } = req.params

    switch (doctype) {
        case 'Vehicle-Papers':
            res.redirect(`/admin/document/vehicle-papers/${id}`)
            break;
        case 'Renew-Papers':
            res.redirect(`/admin/document/renew-papers/${id}`)
            break;
        case 'Driver-License':
            res.redirect(`/admin/document/driver-license/${id}`)
            break;
        case 'Ownership-Change':
            res.redirect(`/admin/document/change-of-ownership/${id}`)
            break;
        case 'Comprehensive-Insurance':
            res.redirect(`/admin/document/comprehensive-insurance/${id}`)
            break;
        case 'Other-Permits':
            res.redirect(`/admin/document/other-permits/${id}`)
            break;
    
        default:
            res.redirect('/admin/this-route-does-not-exist')
            break;
    }
}

// Vehicle Papers
const show_vehicle_papers = async (req, res) => {
    const { id } = req.params

    const document = await Document.findOne({ _id: id }).populate('vehicleId').lean()
 
    photoService.retrievePhoto(document)
                                
    res.status(200).render('admin/document/show_new_papers', {
        layout: 'uploads_view_layout',
        msg: req.flash('msg'),
        document: document,
        user: req.user,
        completeCheck: document.status !== 'completed'
    })
}

const update_vehicle_papers = async (req, res) => {
    const _id = req.params.id
    
    await Document.updateOne({ _id }, {
        status: req.body.status
    })
    
    req.flash('msg', 'Document Updated successfully')
    res.status(200).redirect(`/admin/document/vehicle-papers/${_id}`)
}


// Renew Papers
const show_renew_papers = async (req, res) => {
    const { id } = req.params

    const document = await Document.findOne({ _id: id }).lean()
                                
    res.status(200).render('admin/document/show_renew_papers', {
        layout: 'uploads_view_layout',
        msg: req.flash('msg'),
        document: document,
        user: req.user,
        completeCheck: document.status !== 'completed'
    })
}

const update_renew_papers = async (req, res) => {
    const _id = req.params.id
    
    await Document.updateOne({ _id }, {
        status: req.body.status
    })
    
    req.flash('msg', 'Document Updated successfully')
    res.status(200).redirect(`/admin/document/renew-papers/${_id}`)
}


// Driver license
const show_driver_license = async (req, res) => {
    const { id } = req.params

    const document = await Document.findOne({ _id: id }).lean()
                                
    photoService.retrievePhoto(document)
    
    res.status(200).render('admin/document/show_driver_license', {
        layout: 'uploads_view_layout',
        msg: req.flash('msg'),
        document: document,
        user: req.user,
        completeCheck: document.status !== 'completed'
    })
}

const update_driver_license = async (req, res) => {
    const _id = req.params.id
    
    await Document.updateOne({ _id }, {
        status: req.body.status
    })
    
    req.flash('msg', 'Document Updated successfully')
    res.status(200).redirect(`/admin/document/driver-license/${_id}`)
}


// Change Of Ownership
const show_ownership_change = async (req, res) => {
    const { id } = req.params

    const document = await Document.findOne({ _id: id }).populate('vehicleId').lean()
                                
    photoService.retrievePhoto(document)
    
    res.status(200).render('admin/document/show_ownership_change', {
        layout: 'uploads_view_layout',
        msg: req.flash('msg'),
        document: document,
        user: req.user,
        completeCheck: document.status !== 'completed'
    })
}

const update_ownership_change = async (req, res) => {
    const _id = req.params.id
    
    await Document.updateOne({ _id }, {
        status: req.body.status
    })

    req.flash('msg', 'Document Updated successfully')
    res.status(200).redirect(`/admin/document/change-of-ownership/${_id}`)
}


// Comprehensive Insurance
const show_comprehensive_insurance = async (req, res) => {
    const { id } = req.params

    const document = await Document.findOne({ _id: id }).lean()
                                
    photoService.retrievePhoto(document)
    
    res.status(200).render('admin/document/show_comprehensive_insurance', {
        layout: 'uploads_view_layout',
        msg: req.flash('msg'),
        document: document,
        user: req.user,
        completeCheck: document.status !== 'completed'
    })
}

const update_comprehensive_insurance = async (req, res) => {
    const _id = req.params.id
    
    await Document.updateOne({ _id }, {
        status: req.body.status
    })
    
    req.flash('msg', 'Document Updated successfully')
    res.status(200).redirect(`/admin/document/comprehensive-insurance/${_id}`)
}


// Other Permits
const show_other_permits = async (req, res) => {
    const { id } = req.params

    const document = await Document.findOne({ _id: id }).lean()
    
    res.status(200).render('admin/document/show_other_permits', {
        msg: req.flash('msg'),
        document: document,
        user: req.user,
        completeCheck: document.status !== 'completed'
    })
}

const update_other_permits = async (req, res) => {
    const _id = req.params.id
    
    await Document.updateOne({ _id }, {
        status: req.body.status
    })
    
    req.flash('msg', 'Document Updated successfully')
    res.status(200).redirect(`/admin/document/other-permits/${_id}`)
}


module.exports = {
    login,
    register,
    profile,
    update,
    destroy,
    dashboard,
    checkRoute,
    show_vehicle_papers,
    update_vehicle_papers,
    show_renew_papers,
    update_renew_papers,
    show_driver_license,
    update_driver_license,
    show_ownership_change,
    update_ownership_change,
    show_comprehensive_insurance,
    update_comprehensive_insurance,
    show_other_permits,
    update_other_permits
}