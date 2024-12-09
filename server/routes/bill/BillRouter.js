const express = require('express');
const billController = require('../../controller/billController/BillController')
const router = express.Router();





router.get('/getAllBills',billController.getAllBills)
router.post('/addBill',billController.addBill)
router.get('/', (req, res) => {
    res.send('Welcome to bill!')
})

module.exports = router;
