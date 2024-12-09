
const successTemplate = require('../../templates/succesTemplate');
const errorTemplate = require("../../templates/errorTemplate");
const Voucher = require('../../model/voucher/Voucher');
const validationId = require('../../utils/validationId');
const cloudinaryUploadImage = require('../../utils/cloudinary');
const fs = require('fs');
const addVoucherCtrl = async (req, res) => {
    try {
        const existedVoucher = await Voucher.findOne({ voucherCode: req?.body?.voucherCode });
        const currentDate = new Date();
        if (existedVoucher && existedVoucher.expiredDate > currentDate && existedVoucher.quanlity > 0) throw new Error('Mã giảm giá đã tồn tại và đang được phát hành. Thử lại mã mới!');
        const localPath = `public/images/vouchers/${req.file.filename}`;
        const imgUpload = await cloudinaryUploadImage(localPath)
        const voucher = await Voucher.create({
            ...req?.body, voucherImage: imgUpload?.url
        })
        fs.unlinkSync(localPath)
        return successTemplate(res, voucher, "Thêm voucher mới thành công!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}
const updateVoucherCtrl = async (req, res) => {
    try {
        const updVoucherId = req?.params?.id;
        validationId(updVoucherId)
        const existedVoucher = await Voucher.findOne({ voucherCode: req?.body?.voucherCode });
        const currentDate = new Date();
        if (existedVoucher && existedVoucher.expiredDate > currentDate && existedVoucher.id !== updVoucherId) throw new Error('Mã giảm giá đã tồn tại và đang được phát hành. Thử lại mã mới!');

        if (typeof (req.file) !== 'undefined') {
            const localPath = `public/images/vouchers/${req.file.filename}`;
            const imgUpload = await cloudinaryUploadImage(localPath)
            const updateVoucher = await Voucher.findByIdAndUpdate(updVoucherId, {
                ...req?.body, voucherImage: imgUpload?.url
            })
            fs.unlinkSync(localPath)
            return successTemplate(res, updateVoucher, "Cập nhật voucher thành công!", 200)
        }
        else {
            const updateVoucher = await Voucher.findByIdAndUpdate(updVoucherId, {
                ...req?.body
            })
            return successTemplate(res, { ...req?.body }, "Cập nhật voucher thành công!", 200)
        }
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}
const getAllVouchersCtrl = async (req, res) => {
    try {
        const vouchers = await Voucher.find({});
        return successTemplate(res, vouchers, "Lấy tất cả vouchers thành công!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}
const deleteVoucherCtrl = async (req, res) => {
    try {
        const dltVoucherId = req?.params?.id;
        validationId(dltVoucherId)
        const dltVoucher = await Voucher.findByIdAndDelete(dltVoucherId)
        return successTemplate(res, dltVoucher, "Xóa voucher thành công!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

module.exports = {
    addVoucherCtrl,
    updateVoucherCtrl,
    getAllVouchersCtrl,
    deleteVoucherCtrl
}