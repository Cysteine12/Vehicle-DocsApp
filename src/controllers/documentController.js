const Vehicle = require('../models/Vehicle')
const Document = require('../models/Document')
const fileService = require('../services/fileService')



const create_vehicle_papers = async (req, res) => {
    try {
        const { _id } = req.user
    
        const vehicles = await Vehicle.find({ userId: _id }).lean()
        
        res.status(200).render('document/create_new_papers', {
            layout: 'uploads_layout',
            msg: req.flash('msg'),
            vehicles: vehicles,
            user: req.user
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const store_vehicle_papers = async (req, res) => {
    try {
        let fileId = []
        let uploaded = false
        if (Array.isArray(req.body.files)) {
            req.body.files.forEach(async (file) => {
                let response = await fileService.uploadFile(file)
                fileId.push(await response.id)
                console.log(fileId)
            })
            console.log(fileId)
            uploaded = true
        } else {
            let response = await fileService.uploadFile(req.body.files)
            fileId.push(await response.id)
            uploaded = true
        }
        console.log(fileId)
        let data;
        if (uploaded) {
            const { _id } = req.user
        
            const vehicle = new Vehicle({
                userId: _id,
                category: req.body.category,
                brand: req.body.brand,
                model: req.body.model,
                plateNo: 'Nil',
                engineNo: req.body.engineNo,
                chassisNo: req.body.chassisNo,
                color: req.body.color,
                location: req.body.location
            })
            const veh = await vehicle.save()
        
            const document = new Document({
                userId: req.user._id,
                vehicleId: veh._id,
                docType: 'Vehicle-Papers',
                data: {
                    state: req.body.state,
                    doc_name: req.body.doc_name,
                    address: req.body.address,
                    phone1: req.body.phone1,
                    phone2: req.body.phone2,
                    reg_type: req.body.reg_type,
                    location: req.body.location,
                    amount: req.body.amount
                },
                fileId: fileId,
                status: 'submitted'
            })
            
            data = await document.save()
        } else {
            throw new Error(response.response.data.error)
        }

        req.flash('msg', 'Document Uploaded successfully')
        res.status(200).redirect(`/document/vehicle-papers/${data._id}`)
    } catch (err) {
        console.log(err.message)
        req.flash('msg', err.message)
        res.redirect('/document/vehicle-papers')
    }
}

const show_vehicle_papers = async (req, res) => {
    try {
        const { id } = req.params
    
        const document = await Document.findOne({ _id: id }).populate('vehicleId').lean()
                console.log((document))
        res.status(200).render('document/show_new_papers', {
            layout: 'user_layout',
            msg: req.flash('msg'),
            document: document,
            user: req.user,
            deleteCheck: ['submitted', 'rejected'].includes(document.status)
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy_vehicle_papers = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id })
        document.fileId.forEach(async (fileId) => {
            await fileService.deleteFile(fileId)
        })
        await Document.findByIdAndDelete(req.params.id)
        
        req.flash('msg', 'Form Deleted Successfully!')
        res.redirect('/document/vehicle-papers')
    } catch (err) {
        res.status(404).json({ err })
    }
}


// Renew Papers
const create_renew_papers = async (req, res) => {
    try {
        const { _id } = req.user
    
        const vehicles = await Vehicle.find({ userId: _id }).lean()
        
        res.status(200).render('document/create_renew_papers', {
            layout: 'uploads_layout',
            msg: req.flash('msg'),
            vehicles: vehicles,
            user: req.user
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const store_renew_papers = async (req, res) => {
    try {
        console.log(req.body);
        const document = new Document({
            userId: req.user._id,
            docType: 'Renew-Papers',
            data: {
                vehicle_type: req.body.vehicle_type,
                vehicle_license: req.body.vehicle_license,
                road_worthiness: req.body.road_worthiness,
                third_party_insurance: req.body.third_party_insurance,
                hackney_permit: req.body.hackney_permit,
                heavy_duty_permit: req.body.heavy_duty_permit,
                local_govt_permit: req.body.local_govt_permit,
                truck_trailer_permit: req.body.truck_trailer_permit,
                location: req.body.location,
                phone: req.body.phone,
                amount: req.body.amount
            },
            fileId: [],
            status: 'submitted'
        })

        for (i = 0; i < req.body.files.length; i++) {
            const response = await fileService.uploadFile(req.body.files[i])
            document.fileId.push(await response.id)
        }
    
        const data = await document.save()
        
        req.flash('msg', 'Document Uploaded successfully')
        res.status(200).redirect(`/document/renew-papers/${data._id}`)
    } catch (err) {
        res.status(404).json({ err })
    }
}

const show_renew_papers = async (req, res) => {
    try {
        const { id } = req.params
    
        const document = await Document.findOne({ _id: id }).lean()
         
        res.status(200).render('document/show_renew_papers', {
            layout: 'user_layout',
            msg: req.flash('msg'),
            document: document,
            user: req.user,
            deleteCheck: ['submitted', 'rejected'].includes(document.status)
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy_renew_papers = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id })
        document.fileId.forEach(async (fileId) => {
            await fileService.deleteFile(fileId)
        })
        await Document.findByIdAndDelete(req.params.id)
        
        req.flash('msg', 'Form Deleted Successfully!')
        res.redirect('/document/renew-papers')
    } catch (err) {
        res.status(404).json({ err })
    }
}


// Driver license
const create_driver_license = async (req, res) => {
    try {
        const { _id } = req.user
        
        res.status(200).render('document/create_driver_license', {
            layout: 'uploads_layout',
            msg: req.flash('msg'),
            user: req.user
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const store_driver_license = async (req, res) => {
    try {
        const document = new Document({
            userId: req.user._id,
            docType: 'Driver-License',
            data: {
                licence_no: req.body.license_no,
                licence_name: req.body.license_name,
                licence_type: req.body.license_type,
                location: req.body.location,
                amount: req.body.amount
            },
            fileId: [],
            status: 'submitted'
        })

        for (i = 0; i < req.body.files.length; i++) {
            const response = await fileService.uploadFile(req.body.files[i])
            document.fileId.push(await response.id)
        }
    
        const data = await document.save()
        
        req.flash('msg', 'Document Uploaded successfully')
        res.status(200).redirect(`/document/driver-license/${data._id}`)
    } catch (err) {
        res.status(404).json({ err })
    }
}

const show_driver_license = async (req, res) => {
    try {
        const { id } = req.params
    
        const document = await Document.findOne({ _id: id }).lean()
        
        res.status(200).render('document/show_driver_license', {
            layout: 'user_layout',
            msg: req.flash('msg'),
            document: document,
            user: req.user,
            deleteCheck: ['submitted', 'rejected'].includes(document.status)
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy_driver_license = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id })
        document.fileId.forEach(async (fileId) => {
            await fileService.deleteFile(fileId)
        })
        await Document.findByIdAndDelete(req.params.id)
        
        req.flash('msg', 'Form Deleted Successfully!')
        res.redirect('/document/driver-license')
    } catch (err) {
        res.status(404).json({ err })
    }
}


// Change Of Ownership
const create_ownership_change = async (req, res) => {
    try {
        const { _id } = req.user
        
        const vehicles = await Vehicle.find({ userId: _id }).lean()
        
        res.status(200).render('document/create_ownership_change', {
            layout: 'uploads_layout',
            msg: req.flash('msg'),
            vehicles: vehicles,
            user: req.user
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const store_ownership_change = async (req, res) => {
    try {
        const document = new Document({
            userId: req.user._id,
            vehicleId: req.body.vehicleId,
            docType: 'Ownership-Change',
            data: {
                doc_name: req.body.doc_name,
                phone1: req.body.phone1,
                phone2: req.body.phone2,
                occupation: req.body.occupation,
                dob: req.body.dob,
                address: req.body.address,
                reg_type: req.body.reg_type,
                plate_type: req.body.plate_type,
                location: req.body.location,
                amount: req.body.amount
            },
            fileId: [],
            status: 'submitted'
        })

        for (i = 0; i < req.body.files.length; i++) {
            const response = await fileService.uploadFile(req.body.files[i])
            document.fileId.push(await response.id)
        }
    
        const data = await document.save()
        
        req.flash('msg', 'Document Uploaded successfully')
        res.status(200).redirect(`/document/change-of-ownership/${data._id}`)
    } catch (err) {
        res.status(404).json({ err })
    }
}

const show_ownership_change = async (req, res) => {
    try {
        const { id } = req.params
    
        const document = await Document.findOne({ _id: id }).populate('vehicleId').lean()
    
        res.status(200).render('document/show_ownership_change', {
            layout: 'user_layout',
            msg: req.flash('msg'),
            document: document,
            user: req.user,
            deleteCheck: ['submitted', 'rejected'].includes(document.status)
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy_ownership_change = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id })
        document.fileId.forEach(async (fileId) => {
            await fileService.deleteFile(fileId)
        })
        await Document.findByIdAndDelete(req.params.id)
        
        req.flash('msg', 'Form Deleted Successfully!')
        res.redirect('/document/change-of-ownership')
    } catch (err) {
        res.status(404).json({ err })
    }
}


// Comprehensive Insurance
const create_comprehensive_insurance = async (req, res) => {
    res.status(200).render('document/create_comprehensive_insurance', {
        layout: 'uploads_layout',
        msg: req.flash('msg'),
        user: req.user
    })
}

const store_comprehensive_insurance = async (req, res) => {
    try {
        const document = new Document({
            userId: req.user._id,
            docType: 'Comprehensive-Insurance',
            data: {
                vehicle_category: req.body.vehicle_category,
                vehicle_use: req.body.vehicle_use,
                vehicle_price: req.body.vehicle_price,
                insurance_company: req.body.insurance_company,
                location: req.body.location,
                amount: req.body.amount
            },
            fileId: [],
            status: 'submitted'
        })

        for (i = 0; i < req.body.files.length; i++) {
            const response = await fileService.uploadFile(req.body.files[i])
            document.fileId.push(await response.id)
        }
    
        const data = await document.save()
        
        req.flash('msg', 'Document Uploaded successfully')
        res.status(200).redirect(`/document/comprehensive-insurance/${data._id}`)    
    } catch (err) {
        res.status(404).json({ err })
    }
}

const show_comprehensive_insurance = async (req, res) => {
    try {
        const { id } = req.params
    
        const document = await Document.findOne({ _id: id }).lean()
        
        res.status(200).render('document/show_comprehensive_insurance', {
            layout: 'user_layout',
            msg: req.flash('msg'),
            document: document,
            user: req.user,
            deleteCheck: ['submitted', 'rejected'].includes(document.status)
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy_comprehensive_insurance = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id })
        document.fileId.forEach(async (fileId) => {
            await fileService.deleteFile(fileId)
        })
        await Document.findByIdAndDelete(req.params.id)
        
        req.flash('msg', 'Form Deleted Successfully!')
        res.redirect('/document/comprehensive-insurance')
    } catch (err) {
        res.status(404).json({ err })
    }
}


// Other Permits
const create_other_permits = async (req, res) => {
    
    res.status(200).render('document/create_other_permits', {
        layout: 'uploads_view_layout',
        msg: req.flash('msg'),
        user: req.user
    })
}

const store_other_permits = async (req, res) => {
    try {
        const document = new Document({
            userId: req.user._id,
            docType: 'Other-Permits',
            data: {
                vehicle_category: req.body.vehicle_category,
                permit_category: req.body.permit_category,
                location: req.body.location,
                amount: req.body.amount
            },
            status: 'submitted'
        })
    
        const data = await document.save()
        
        req.flash('msg', 'Document Uploaded successfully')
        res.status(200).redirect(`/document/other-permits/${data._id}`)
    } catch (err) {
        res.status(404).json({ err })
    }
}

const show_other_permits = async (req, res) => {
    try {
        const { id } = req.params
    
        const document = await Document.findOne({ _id: id }).lean()
        
        res.status(200).render('document/show_other_permits', {
            layout: 'user_layout',
            msg: req.flash('msg'),
            document: document,
            user: req.user,
            deleteCheck: ['submitted', 'rejected'].includes(document.status)
        })
    } catch (err) {
        res.status(404).json({ err })
    }
}

const destroy_other_permits = async (req, res) => {
    try {
        const document = await Document.findOne({ _id: req.params.id })
        document.fileId.forEach(async (fileId) => {
            await fileService.deleteFile(fileId)
        })
        await Document.findByIdAndDelete(req.params.id)
        
        req.flash('msg', 'Form Deleted Successfully!')
        res.redirect('/document/other-permits')
    } catch (err) {
        res.status(404).json({ err })
    }
}



module.exports = {
    create_vehicle_papers,
    store_vehicle_papers,
    show_vehicle_papers,
    destroy_vehicle_papers,
    create_renew_papers,
    store_renew_papers,
    show_renew_papers,
    destroy_renew_papers,
    create_driver_license,
    store_driver_license,
    show_driver_license,
    destroy_driver_license,
    create_ownership_change,
    store_ownership_change,
    show_ownership_change,
    destroy_ownership_change,
    create_comprehensive_insurance,
    store_comprehensive_insurance,
    show_comprehensive_insurance,
    destroy_comprehensive_insurance,
    create_other_permits,
    store_other_permits,
    show_other_permits,
    destroy_other_permits
}