
const successTemplate = require('../../templates/succesTemplate');
const errorTemplate = require("../../templates/errorTemplate");
const Address = require('../../model/address/Address');
const validationId = require('../../utils/validationId');
const cloudinaryUploadImage = require('../../utils/cloudinary');
const fs = require('fs');
const addAddressCtrl = async (req, res) => {
    try {
        const address = await Address.create({
            ...req?.body
        })
        return successTemplate(res, address, "Add new address successfully!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}
const updateVoucherCtrl = async (req, res) => {
    // try {
    //     const updVoucherId = req?.params?.id;
    //     validationId(updVoucherId)
    //     const existedVoucher = await Voucher.findOne({ voucherCode: req?.body?.voucherCode });
    //     const currentDate = new Date();
    //     if (existedVoucher && existedVoucher.expiredDate > currentDate) throw new Error('Voucher code is existed and launched. Please try again!');
        
    //     if (typeof (req.file) !== 'undefined') {
    //         const localPath = `public/images/vouchers/${req.file.filename}`;
    //         const imgUpload = await cloudinaryUploadImage(localPath)
    //         const updateVoucher = await Voucher.findByIdAndUpdate(updVoucherId, {
    //             ...req?.body, voucherImage:imgUpload?.url
    //         })
    //         return successTemplate(res, updateVoucher, "Update voucher successfully!", 200)
    //     }
    //     else{
    //         const updateVoucher = await Voucher.findByIdAndUpdate(updVoucherId, {
    //             ...req?.body
    //         })
    //         return successTemplate(res, updateVoucher, "Update voucher successfully!", 200)
    //     }
    // } catch (error) {
    //     return errorTemplate(res, error.message)
    // }
}
const getAllVouchersCtrl = async (req, res) => {
    // try {
    //     const vouchers = await Voucher.find({});
    //     return successTemplate(res, vouchers, "Get all voucherss successfully!", 200)
    // } catch (error) {
    //     return errorTemplate(res, error.message)
    // }
}
const deleteVoucherCtrl = async (req, res) => {
    // try {
    //     const dltVoucherId = req?.params?.id;
    //     validationId(dltVoucherId)
    //     const dltVoucher = await Voucher.findByIdAndDelete(dltVoucherId)
    //     return successTemplate(res, dltVoucher, "Delete voucher successfully!", 200)
    // } catch (error) {
    //     return errorTemplate(res, error.message)
    // }
}

module.exports = {
    addAddressCtrl
}