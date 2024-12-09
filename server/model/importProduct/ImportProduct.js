const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    discount: {
        type: Number,
    },
    totalMoneyGoods: {
        type: Number,
    },
    finalMoney: {
        type: Number,
    },
    date: Date,
    listImportProducts: [
        {
            productCode: String,
            productName: String,
            productType: String,
            unitPriceImport: Number,
            quantity: Number,
            totalMoey: Number,
            colors: [{
                colorName: String,
                sizes: [{
                    sizeName: String,
                    quantity: Number,
                }]
            }]

        }
    ]
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
const Product = mongoose.model('ImportProduct', productSchema);

module.exports = Product;