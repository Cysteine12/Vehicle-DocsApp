const { Schema, model } = require('mongoose')
const Payment = require('./Payment')

const documentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    docType: {
        type: String,
        required: true
    },
    photo: {
        type: Buffer,
        required: false
    },
    photoType: {
        type: String,
        required: false
    },
    data: {
        type: Object,
        required: true,
    },
    paymentReference: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ['submitted', 'rejected', 'processing', 'completed']
    }
}, {
    timestamps: true
})


module.exports = model('Document', documentSchema)