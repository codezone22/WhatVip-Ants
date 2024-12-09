const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    productCategoryName: {
        type: String,
        require: [true, 'Product Category name is required.']
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
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategory;