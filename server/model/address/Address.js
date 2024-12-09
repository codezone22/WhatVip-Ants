const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'address name is required.']
    },
    province:{
        type: String,
        require: [true, 'address province is required.']
    },
    district: {
        type: String,
        require: [true, 'address district is required.']
    },
    ward: {
        type: String,
        require: [true, 'address ward is required.']
    },
    phoneNumber: {
        type: String,
        require: [true, 'address number is required.']
    },
    detail: {
        type: String,
        require: [true, 'address detail is required.']
    },
    default: {
        type: Boolean,
        default: false
    },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
const address = mongoose.model('address', addressSchema);

module.exports = address;