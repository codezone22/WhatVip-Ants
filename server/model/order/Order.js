const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderDate: {
            type: Date,
            require: [true, 'Order date is required.']
        },
        orderItem: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'OrderItem'
                }
            ]
        },
        status: {
            type: String,
            require: [true, 'Order status is required.'],
        },
        address: {
            type:
            {
                addressId: mongoose.Schema.Types.ObjectId,
                province: String,
                district: String,
                ward: String,
                detail: String,
                name: String,
                email: String,
                phoneNumber: String,
                default: Boolean
            }

        },
        voucher:{
            type:{
                voucherId: mongoose.Schema.Types.ObjectId,
                voucherPrice: Number,
                isPercent: Boolean,
                voucherCode: String
            }
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
    }
)
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;