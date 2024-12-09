const express = require('express');
const productCategoryController = require('../../controller/productCategoryController/ProductCategoryController')
const router = express.Router();





router.get('/getAllProductCaterogies',productCategoryController.getAllProductCaterogies)
router.get('/', (req, res) => {
    res.send('Welcome to product category!')
})

module.exports = router;
