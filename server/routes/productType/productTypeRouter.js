const express = require('express');
const productTypeController = require('../../controller/productTypeController/ProductTypeController')
const router = express.Router();





router.get('/getAllProductType',productTypeController.getAllProductType)
router.post('/addProductType',productTypeController.addProductType)
router.delete('/deleteProductType/:id',productTypeController.deleteProductType)
router.patch('/editProductType',productTypeController.editProductType)
router.get('/', (req, res) => {
    res.send('Welcome to product type!')
})

module.exports = router;
