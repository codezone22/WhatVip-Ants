const ImportProduct = require('../../model/importProduct/ImportProduct')
const Product = require('../../model/product/Product')

const getProductsByKey = async (req, res) => {
    try {

        const { key } = req.body
        const listProducts = await Product.find(
            {

                $or: [
                    {
                        productName: new RegExp(`.*${key}.*`, "i")
                    },
                    {
                        productCode: new RegExp(`.*${key}.*`, "i")
                    }
                ]
            }


        ).exec();
        debugger
        res.status(200).json({
            message: 'Get all product categories successfully',
            data: listProducts
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const addImport = async (req, res) => {
    try {
        const importProduct = await ImportProduct.create({
            ...req.body,
            date: new Date()
        })
        debugger
        for (let i=0; i<importProduct.listImportProducts.length; i++) {
            debugger
            const productCode = importProduct.listImportProducts[i].productCode
            const product = await Product.findOne({productCode}).exec();
            debugger
            product.colors.forEach(item0 => {
                importProduct.listImportProducts[i].colors.forEach(item1 => {
                    if (item0.colorName === item1.colorName) {
                        item1.sizes.forEach(item3 => {
                            item0.sizes.forEach(item4 => {
                                if (item3.sizeName === item4.sizeName) {
                                    item4.quantity = item4.quantity + item3.quantity
                                }
                            })
                        })
                    }
                })
               
            })
            await product.save();
        }
        debugger
        res.status(200).json({
            message: 'Import goods successfully',
            data: importProduct
        })
    } catch (error) {
        res.status(400).json({
            message: 'Import goods failed'
        })
    }
}

const getAllImports = async (req, res) => {
    try {
        const allImports = await ImportProduct.find().exec();
        res.status(200).json({
            message: 'Get all imports successfully',
            data: allImports
        })
    } catch (error) {
        res.status(400).json({
            message: 'Get all imports failed'
        })
    }
}
module.exports = {
    getProductsByKey,
    addImport,
    getAllImports
}