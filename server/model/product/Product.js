const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productCode: {
        type: String,
    },
    productName: {
        type: String,
        require: [true, 'Product Name is required.']
    },
    productCategory: {
        type: String,
        require: [true, 'Product Category is required.']
    },
    productType: {
        type: String,
        require: [true, 'Product type is required.']
    },
    importPrice: {
        type: Number,
    },
    exportPrice: {
        type: Number,
    },
    discountPerc: {
        type: Number,
    },
    quantitySold: {
        type: Number
    },
    status:{
        type: String,
        default: "Chưa đăng bán"
    },
    description:{
        type: String,
    },
    colors: {
        type: [
            {
                colorCode: String,
                colorName: String,
                images:[String],
                sizes:[
                    {
                        sizeName: String,
                        quantity: Number
                    }
                ]
            }
        ]
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;