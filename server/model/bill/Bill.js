const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    },
    time: Date,
    method: String,
    money: Number,

}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
const Product = mongoose.model('Bill', billSchema);

module.exports = Product;