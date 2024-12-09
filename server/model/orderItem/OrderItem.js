const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        productName: String,
        image: String,
        size: String,
        color: String,
        quantity: Number,
        price: Number,
        discountPerc: Number,
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    }
)
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
