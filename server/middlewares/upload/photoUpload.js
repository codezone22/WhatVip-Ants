const multer = require('multer')
const mutlerStorage = multer.memoryStorage();
const sharp = require('sharp')
const path = require('path')

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb({ message: "Not support this file format" }, false)
    }
}

const PhotoUpload = multer({
    storage: mutlerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 }
})

const voucherImgResizing = async (req, res, next) => {
    if (typeof (req.file) === 'undefined') { next(); }
    else {
        req.file.filename = `voucher-${Date.now()}-${req.file?.originalname}`;
        await sharp(req.file.buffer)
            .resize(300, 200)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(path.join(`public/images/vouchers/${req.file.filename}`));
        next();

    }
}
module.exports = { PhotoUpload, voucherImgResizing }