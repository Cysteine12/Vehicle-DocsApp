const Document = require('../models/Document')
const Vehicle = require('../models/Vehicle')

const dashboard = async (req, res) => {
    const { _id } = req.user

    const documents = await Document.find({ userId: _id }).populate('vehicleId').sort({ createdAt: -1 }).lean()
    const documentCount = await Document.find({ userId: _id }).count('documentCount')
    const vehicleCount = await Vehicle.find({ userId: _id }).count('vehicleCount')
    
    res.status(200).render('user/dashboard', {
        msg: req.flash('msg'),
        documents: documents,
        count: {
            vehicleCount: vehicleCount,
            documentCount: documentCount,
        },
        user: req.user
    })
}

const checkRoute = (req, res) => {
    const { doctype, id } = req.params

    switch (doctype) {
        case 'Vehicle-Papers':
            res.redirect(`/document/vehicle-papers/${id}`)
            break;
        case 'Renew-Papers':
            res.redirect(`/document/renew-papers/${id}`)
            break;
        case 'Driver-License':
            res.redirect(`/document/driver-license/${id}`)
            break;
        case 'Ownership-Change':
            res.redirect(`/document/change-of-ownership/${id}`)
            break;
        case 'Comprehensive-Insurance':
            res.redirect(`/document/comprehensive-insurance/${id}`)
            break;
        case 'Other-Permits':
            res.redirect(`/document/other-permits/${id}`)
            break;
    
        default:
            res.redirect('/this-route-does-not-exist')
            break;
    }
}

module.exports = {
    dashboard,
    checkRoute
}