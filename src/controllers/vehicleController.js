const Vehicle = require('../models/Vehicle')


const create = async (req, res) => {
    try {
        const { _id } = req.user

        const vehicles = await Vehicle.find({ userId: _id }).lean()

        res.status(200).render('vehicle/create', {
            layout: 'user_layout',
            msg: req.flash('msg'),
            vehicles: vehicles
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const store = async (req, res) => {
    try {
        const { _id } = req.user

        const vehicle = new Vehicle({
            userId: _id,
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model,
            plateNo: req.body.plateNo,
            year: req.body.year,
            engineNo: req.body.engineNo,
            chassisNo: req.body.chassisNo,
            color: req.body.color,
            location: req.body.location
        })
        const data = await vehicle.save()

        req.flash('msg', 'Vehicle profile created successfully!')
        res.redirect(`/vehicle/${data._id}`)
    } catch (err) {
        res.status(404).json({ err })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        
        const vehicle = await Vehicle.findOne({ _id: id }).lean()
        res.status(200).render('vehicle/show', {
            layout: 'user_layout',
            msg: req.flash('msg'),
            vehicle: vehicle
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params
        
        const vehicle = await Vehicle.findOne({ _id: id }).lean()
        res.status(200).render('vehicle/edit', {
            layout: 'user_layout',
            vehicle: vehicle
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}
 
const update = async (req, res) => {
    try {
        const { id } = req.params
        const vehicle = {
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model,
            plateNo: req.body.plateNo,
            year: req.body.year,
            engineNo: req.body.engineNo,
            chassisNo: req.body.chassisNo,
            color: req.body.color,
            location: req.body.location
        }
        await Vehicle.updateOne({ id }, vehicle)
        
        req.flash('msg', 'Profile updated successfully!')
        res.redirect(`/vehicle/${id}`)
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await Vehicle.findByIdAndDelete(id)
        
        req.flash('msg', 'Vehicle Profile Deleted Successfully!')
        res.redirect('/vehicle')
    } catch (err) {
        res.status(404).json({ err })
    }
}


module.exports = {
    create,
    store,
    show,
    edit,
    update,
    destroy
}