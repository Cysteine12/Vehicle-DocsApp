const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 7,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    photo: {
        type: String
    },
    state: {
        type: String,
        required: false
    },
    source: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
}, {
    timestamps: true
})

userSchema.index({ name: 'text'})

module.exports = model('User', userSchema)