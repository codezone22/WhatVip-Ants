const express = require('express');
const productController = require('../../controller/productController/ProductController')
const router = express.Router();





router.post('/addProduct',productController.addProduct)
router.patch('/editProduct',productController.editProduct)
router.patch('/editStatusProduct',productController.editStatusProduct)
router.patch('/editProductByType',productController.editProductByType)
router.get('/getAllProducts',productController.getAllProducts)
router.get('/getProductById/:id',productController.getProductById)
router.post('/getProductsByType',productController.getProductsByType)

router.get('/search/:valueSearch',productController.searchProduct)

router.get('/', (req, res) => {
    res.send('Welcome to product!')
})

module.exports = router;
