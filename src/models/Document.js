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
    photo: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['processing', 'completed']
    }
}, {
    timestamps: true
})

module.exports = model('Document', documentSchema)