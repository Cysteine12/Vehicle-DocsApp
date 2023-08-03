const { Schema, model } = require('mongoose')

const vehicleSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    plateNo: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        min: 4,
        required: false,
    },
    engineNo: {
        type: String,
        required: true,
    },
    chassisNo: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Vehicle', vehicleSchema)
