const { Schema, model } = require('mongoose')

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
    fileId: {
        type: Array,
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