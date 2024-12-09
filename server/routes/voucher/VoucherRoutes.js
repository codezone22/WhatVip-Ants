const express = require('express');
const {
    getAllVouchersCtrl,
    addVoucherCtrl,
    updateVoucherCtrl,
    deleteVoucherCtrl
} = require('../../controller/voucherController/VoucherController');
const {
    PhotoUpload,
    voucherImgResizing
} = require('../../middlewares/upload/photoUpload')

const voucherRoutes = express.Router();

voucherRoutes.get('/', getAllVouchersCtrl);

voucherRoutes.post('/addVoucher', PhotoUpload.single("image"), voucherImgResizing, addVoucherCtrl);

voucherRoutes.put('/updateVoucher/:id', PhotoUpload.single("image"), voucherImgResizing, updateVoucherCtrl);

voucherRoutes.delete('/deleteVoucher/:id', deleteVoucherCtrl);


module.exports = voucherRoutes;