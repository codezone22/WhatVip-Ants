const express = require('express');
const { 
    addAddressCtrl
} = require('../../controller/addressController/AddressController');

const addressRoutes = express.Router();

// voucherRoutes.get('/', getAllVouchersCtrl);

addressRoutes.post('/addAddress', addAddressCtrl );

// voucherRoutes.put('/updateVoucher/:id',PhotoUpload.single("image") , voucherImgResizing, updateVoucherCtrl)

// voucherRoutes.delete('/deleteVoucher/:id', deleteVoucherCtrl)


module.exports = addressRoutes;