const ProductType = require('../../model/productType/ProductType')
const Product = require('../../model/product/Product')

var mongoose = require('mongoose');

const getAllProductType = async (req, res) => {
    try {
        const listProductType = await ProductType.find({}).exec();
        res.status(200).json({
            message: 'Get all product type successfully',
            data: listProductType
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const addProductType = async (req, res) => {
    const { productTypeName, productCategoryId } = req.body;
    try {
        const productType = await ProductType.create({
            productTypeName,
            productCategory: productCategoryId
        })
        res.status(200).json({
            message: 'Add product type successfully',
            data: productType
        })
    } catch (error) {

        res.status(400).json({
            message: 'Add product type failed',
        })
    }
}

const deleteProductType = async (req, res) => {
    const { id } = req.params;
    try {
        const productType = await ProductType.findById(id).exec();

        const isExistProduct = await Product.findOne({ productType: productType.productTypeName }).exec()

        if (isExistProduct) {
            res.status(400).json({
                message: 'Cannot delete, there are already products in this product type'
            })
        }
        else {
            await productType.deleteOne();
            res.status(200).json({
                message: 'Delete product type successfully',
            })
        }
       
    } catch (error) {
        debugger
        res.status(400).json({
            message: 'Add product type failed',
        })
    }
}
const editProductType = async (req, res) => {
    const { productTypeName, productTypeId } = req.body;
    try {
        const productType = await ProductType.findById(productTypeId).exec();
        productType.productTypeName = productTypeName;
        productType.save();
        res.status(200).json({
            message: 'Update product type successfully',
            data: productType
        })
    } catch (error) {
        res.status(400).json({
            message: 'Update product type failed',
        })
    }
}





module.exports = {
    getAllProductType,
    addProductType,
    editProductType,
    deleteProductType
}