const Document = require('../models/Document')
const Vehicle = require('../models/Vehicle')

const dashboard = async (req, res) => {
    const { _id } = req.user

    const documents = await Document.find({ userId: _id }).populate('vehicleId').lean()
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


module.exports = {
    dashboard
}