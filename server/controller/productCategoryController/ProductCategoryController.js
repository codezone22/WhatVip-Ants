const ProductCategory = require('../../model/productCategory/ProductCategory')


const getAllProductCaterogies = async (req, res) => {
    try {
        const listProductCategories = await ProductCategory.find({}).exec();
        res.status(200).json({
            message: 'Get all product categories successfully',
            data: listProductCategories
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}




module.exports = {
    getAllProductCaterogies
}