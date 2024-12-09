const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    voucherPrice: {
        type: Number,
        require: [true, 'Voucher price is required.']
    },
    isPercent:{
        type: Boolean,
        default:false
    },
    voucherImage: {
        type: String,
        default: 'https://mcdn.coolmate.me/image/October2023/mceclip2_40.jpg'
    },
    voucherCode: {
        type: String,
        require: [true, 'Voucher code is required.']
    },
    expiredDate: {
        type: Date,
        require: [true, 'Expired date of voucher is required.']
    },
    startDate: {
        type: Date,
        require: [true, 'Start date of voucher is required.']
    },
    minPrice: {
        type: Number,
        require: [true, 'Min price apply voucher is required.']
    },
    quanlity: {
        type: Number,
        default:100
    },
    applyFor:{
        type: String,
        default:'all'
    },
    description: {
        type: String,
        require: [true, 'Voucher description is required.']
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
const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;