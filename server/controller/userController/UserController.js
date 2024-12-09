const bcrypt = require('bcrypt');


const User = require("../../model/user/User")
const successTemplate = require('../../templates/succesTemplate');
const errorTemplate = require("../../templates/errorTemplate");
const validationId = require("../../utils/validationId");
const OrderItem = require('../../model/orderItem/OrderItem');
const Order = require('../../model/order/Order');
const Review = require('../../model/review/Review');
const cloudinaryUploadImage = require('../../utils/cloudinary');
const Product = require('../../model/product/Product');
const Voucher = require('../../model/voucher/Voucher');
const Bill = require('../../model/bill/Bill');
const sendMail = require('../../utils/email')
const ImportProduct = require('../../model/importProduct/ImportProduct');

const userRegisterCtrl = async (req, res) => {
    try {
        const existedUsser = await User.findOne({ phoneNumber: req?.body?.phoneNumber });
        if (existedUsser) throw new Error('User readly existed. Please log in!');
        if (req?.body?.password !== req?.body?.repassword) throw new Error('Retype password have to match with password');

        const user = await User.create({
            fullName: req?.body?.fullName,
            phoneNumber: req?.body?.phoneNumber,
            email: req?.body?.email,
            password: req?.body?.password
        })
        return successTemplate(res, user, "Register user successfully!", 201)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id);

        return res.status(200).json(user)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const id = req?.params?.id;

        validationId(id)

        const existedUser = await User.findById(id);

        if (!existedUser) throw new Error('User id không tồn tại. Hãy thử lại!')

        let updatObj = { ...req?.body }
        if (updatObj?.password) {
            const validPassword = bcrypt.compareSync(
                updatObj.password,
                existedUser.password
            )
            if (validPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hashed = bcrypt.hashSync(updatObj?.newPassword, salt)
                delete updatObj["newPassword"]
                updatObj = { ...updatObj, password: hashed }
            }
            else {
                return errorTemplate(res, "Mật khẩu không đúng", 500)
            }
        }

        const updUser = await User.findByIdAndUpdate(id, { ...updatObj }, { new: true }).populate('vouchers')
        return successTemplate(res, updUser, "Cập nhật thành công!", 200)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json("Don't have user in database")
        }

        return res.status(200).json("Delete successfully!")
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const userLoginCtrl = async (req, res) => {
    try {
        const existedUser = await User.findOne({ phoneNumber: req?.body?.phoneNumber });
        if (!existedUser || existedUser.role !== req?.body?.role) throw new Error('User not existed. Please sign up or check role!');
        if (await existedUser.checkPassword(req?.body?.password)) {
            return successTemplate(res, existedUser, "Login user successfully!", 200)
        } else {
            throw new Error('Password not correct!')
        }

    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const getAllBuyer = async (req, res) => {
    try {
        const buyers = await User.find({ role: 'Buyer' }).populate({
            path: 'orders',
            populate: {
                path: 'orderItem'
            }
        });
        return successTemplate(res, buyers, "Lấy tất cả khách hàng thành công!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const updateActiveBuyer = async (req, res) => {
    try {
        const id = req.params.id;
        validationId(id)
        const existedUser = await User.findById(id);
        if (!existedUser) throw new Error('User id không tồn tại. Hãy thử lại!')
        const updUser = await User.findByIdAndUpdate(id, {
            isActive: !existedUser.isActive
        })
        return successTemplate(res, updUser, "Lấy tất cả khách hàng thành công!", 200)

    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

// manage address

const addAddressCtrl = async (req, res) => {
    try {
        const userId = req?.params?.id;

        validationId(userId)

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }
        let addresses = user.address
        if (addresses.length === 0) {
            addresses.push({ ...req?.body, default: true })
        }
        else {
            if (req?.body?.default) addresses.map(item => {
                if (item.default) {
                    let newAd = item
                    newAd.default = false
                    return newAd
                }
                else
                    return item
            })
            addresses.push({ ...req?.body })
        }

        const updateAddress = await User.findByIdAndUpdate(userId, {
            address: addresses
        }, { new: true })
        return successTemplate(res, updateAddress, "Thêm địa chỉ mới thành công!", 200)

    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const updateAddressCtrl = async (req, res) => {
    try {
        const userId = req?.params?.id;

        validationId(userId)

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }
        const addressesNew = user.address.map(ad => {
            if (ad.id.toString() === req?.params?.addressId) {
                return { ...req.body }
            }
            else {
                if (ad.default && req?.body?.default) {
                    let newAd = ad
                    newAd.default = false
                    return newAd
                }
                else {
                    return { ...ad }
                }
            }
        })

        // console.log(addressesNew)

        const updateAddress = await User.findByIdAndUpdate(userId, {
            address: addressesNew
        }, { new: true })
        return successTemplate(res, updateAddress, "Câp nhật địa chỉ thành công!", 200)


    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const getAllAddresssCtrl = async (req, res) => {
    try {
        const userId = req?.params?.id;

        validationId(userId)

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        return successTemplate(res, user.address, "Lấy tất cả địa chỉ thành công!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const deleteAddressCtrl = async (req, res) => {
    try {
        const userId = req?.params?.id;

        validationId(userId)

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }
        const addressesNew = user.address.filter(ad => ad.id.toString() !== req?.params?.addressId)

        const updateAddress = await User.findByIdAndUpdate(userId, {
            address: addressesNew
        }, { new: true })

        return successTemplate(res, updateAddress, "Delete address successfully!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

// manage order

const getAllOrderCtrl = async (req, res) => {
    try {
        const userId = req?.params?.id;

        validationId(userId)

        const user = await User.findOne({ _id: userId }).populate({
            path: "orders",
            populate: {
                path: "orderItem"
            }
        })



        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        return res.status(200).json(user.orders)

        // return successTemplate(res, updateAddress, "Create address successfully!", 200)

    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const updateOrderItem = async (id, data) => {
    try {

        const order = await Order.findById(id)

        if (!order) {
            throw new Error('Order is not existed. Please log in!');
        }

        const orderItemIds = order.orderItem

        orderItemIds ? orderItemIds.push(data) : orderItemIds = []

        await Order.findByIdAndUpdate(id, { orderItem: orderItemIds }, { new: true })
    }
    catch (err) {
        throw new Error(err);
    }
}

const createOrderCtrl = async (req, res) => {
    try {
        const userId = req?.params?.id;

        validationId(userId)

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }
        const { orderItem, ...other } = req?.body
        const order = await Order.create({
            ...other,
            orderDate: new Date(),
            userId: user._id
        })

        const orderIds = user.orders
        orderIds ? orderIds.push(order.id) : orderIds = []

        const promise = (item) => new Promise(async resolve => {
            const orderItem = await OrderItem.create({
                "productId": item.productId,
                "productName": item?.productName,
                "image": item?.image,
                "size": item?.size,
                "color": item?.color,
                "quantity": item?.quantity,
                "price": item?.price,
                "discountPerc": item?.discountPerc
            })


            // Quí comment
            // await Product.updateOne({
            //     _id: item.productId, 
            //     "colors.colorName": item?.color,
            //     "colors.sizes.sizeName": item?.size
            // },{$inc: {
            //     'colors.$[].sizes.$[xxx].quantity': -item?.quantity
            // }},
            // {arrayFilters: [
            //     {"xxx.sizeName": item?.size}
            // ]})

            resolve(orderItem.id)
        });

        let p = promise(req?.body?.orderItem[0])

        for (let i = 1; i < req?.body?.orderItem.length; i++) {
            p = p.then(async (data) => {
                await updateOrderItem(order.id, data)
                return promise(req?.body?.orderItem[i]);
            })
        }

        p.then(async data => {
            await updateOrderItem(order.id, data)
        })

        // Quí comment
        // if(req?.body?.voucher){
        //     await Voucher.findOneAndUpdate({voucherCode: req?.body?.voucher?.voucherCode}, {$inc: {
        //         'quanlity': -1
        //     }})
        // }

        await User.findByIdAndUpdate(userId, { orders: orderIds, cart: [] })
        await sendMail({
            email: user.email,
            subject: '[SHOP-WATCHVIP]: ĐƠN ĐẶT HÀNG CỦA BẠN',
            html: templateHTMLOrder(req.body)
        })

        return successTemplate(res, user.id, "Create order successfully!", 200)

    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const cancelOrderCtrl = async (req, res) => {
    try {
        const orderId = req?.params?.orderId;

        validationId(orderId)

        const order = await Order.findByIdAndUpdate(orderId, {
            status: "Cancelled"
        }, { new: true })

        return successTemplate(res, order, "Create address successfully!", 200)

    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

// MOMO
const getApiMoMo = async (req, res) => {
    try {
        const userId = req?.params?.id;

        validationId(userId)

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }
        const bodyOrder = req?.body
        bodyOrder.userId = userId
        bodyOrder.key = 'payment'
        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var requestId = partnerCode + new Date().getTime();
        bodyOrder.orderId = requestId
        let objJsonStr = JSON.stringify(bodyOrder);
        let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

        var orderInfo = 'PAYWITHMOMO'
        var orderId = requestId;
        var redirectUrl = `http://localhost:3000/successPayment`
        var ipnUrl = "https://callback.url/notify";
        var amount = bodyOrder.money
        var requestType = "payWithATM"
        // var requestType = "captureWallet"
        var extraData = objJsonB64;
        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
        const crypto = require('crypto');
        var signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'vn'
        });
        //Create the HTTPS objects
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        }
        //Send the request and get the response
        const https = require('https');
        const req2 = https.request(options, res2 => {
            res2.setEncoding('utf8');
            let url = ''
            res2.on('data', (body) => {
                url = JSON.parse(body).payUrl;
            });
            res2.on('end', async () => {
                res.status(200).json({
                    data: url
                })
            });
        })

        req2.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        console.log("Sending....")
        req2.write(requestBody);
        req2.end();
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const handlePaymentMomoSuccess = async (req, res) => {
    try {
        const { extraData, orderId } = req.body
        const json = Buffer.from(extraData, "base64").toString()
        const decode = JSON.parse(json);
        if (orderId === decode.orderId) {
            if (decode.key === 'payment') {
                delete decode.orderId
                delete decode.key
                const options = {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true
                };
                const userId = decode.userId
                delete decode.userId
                validationId(userId)

                const user = await User.findById(userId)
        
                if(!user){
                    throw new Error('User is not existed. Please log in!');
                }
                const {orderItem, ...other} = decode
                const orderDate = new Date()
                const order = await Order.create({
                    ...other,
                    orderDate: orderDate,
                    userId: user._id
                })
                await Bill.create({
                    orderId: order._id,
                    time: orderDate,
                    method: 'Thanh toán trực tuyến',
                    money: decode.money,
                })
                const orderIds = user.orders
                if (!orderIds) orderIds = []
                if (!orderIds.includes(order.id)) {
                    orderIds.push(order.id)
                }
                const promise = (item) => new Promise(async resolve => {
                    const orderItem = await OrderItem.create({
                        "productId": item.productId,
                        "productName": item?.productName,
                        "image": item?.image,
                        "size": item?.size,
                        "color": item?.color,
                        "quantity": item?.quantity,
                        "price": item?.price,
                        "discountPerc": item?.discountPerc
                    })
                    resolve(orderItem.id)
                });
        
                let p = promise(decode.orderItem[0])
        
                for (let i = 1; i < decode.orderItem.length; i++) {
                    p = p.then(async (data) => {
                        await updateOrderItem(order.id,data)
                        return promise(decode.orderItem[i]);
                    })
                }
        
                p.then(async data => {
                    await updateOrderItem(order.id,data)
                })
        
                await User.findByIdAndUpdate(userId, {orders: orderIds, cart: []})
                
                await sendMail({
                    email: decode.address.email,
                    subject: '[SHOP-WATCHER]: ĐƠN ĐẶT HÀNG CỦA BẠN',
                    html: templateHTMLOrder(decode)
                })
                res.status(200).json({
                    message: 'Thanh toán thành công'
                })

            }
            else throw new Error('Không tồn tại giao dịch')

        }
        else throw new Error('Không tồn tại giao dịch')


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//review 
const getAllReviewCtrl = async (req, res) => {
    try {
        const userId = req?.params?.id;

        validationId(userId)

        const user = await User.findOne({ _id: userId }).populate({
            path: "orders",
            populate: {
                path: "orderItem",
                populate: {
                    path: "review"
                }
            }
        })

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        return successTemplate(res, user.orders, "Create address successfully!", 200)


    } catch (error) {
        return errorTemplate(res, error.message)
    }
}




const updateImagesReview = async (id, data) => {
    try {
        const review = await Review.findById(id)

        if (!review) {
            throw new Error('Review is not existed. Please log in!');
        }

        const images = review.imagesRv

        images ? images.push(data) : images = []

        await Review.findByIdAndUpdate(id, { imagesRv: images }, { new: true })
    }
    catch (err) {

    }
}

const createReviewCtrl = async (req, res) => {
    try {
        const userId = req?.params?.id;
        validationId(userId)

        const review = await Review.create({
            user: userId,
            star: req?.body?.star,
            orderItem: req?.params?.orderItemId,
            content: req?.body?.content,
            reviewDate: new Date(),
            isResponsed: false
        })

        await OrderItem.findByIdAndUpdate(req?.params?.orderItemId, { review: review._id }, { new: true })

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        let reviewIds = user.reviews

        reviewIds ? reviewIds.push(review._id) : reviewIds = []

        await User.findByIdAndUpdate(userId, { reviews: reviewIds }, { new: true })

        const promise = (item) => new Promise(async resolve => {
            const imgUpload = await cloudinaryUploadImage(item, {
                folder: 'reviews'
            })
            resolve(imgUpload?.url)
        });


        for (let i = 0; i < req?.body?.imagesRv.length; i++) {
            if (i === 0) p = promise(req?.body?.imagesRv[0])
            else p = p.then(async (data) => {
                await updateImagesReview(review._id, data)
                return promise(req?.body?.imagesRv[i]);
            })
        }

        p.then(async data => {
            await updateImagesReview(review._id, data)
        })

        const reviewRes = await Review.findById(review._id)

        return successTemplate(res, reviewRes, "Create review successfully!", 200)

    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const getForuProductCtrl = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products)

    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

//cart

const increaseQuantityCartItem = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        let cartIts = user.cart
        const productId = cartIts.find((item) => item.id === req?.params?.cartItemId).product

        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Product is not existed!');
        }
        let size = product.colors?.find(item => item.colorName == req?.body?.color)?.sizes?.find(item => item.sizeName === req?.body?.size)

        if (size?.quantity === 0) {
            return res.json({
                result: false,
                message: "Đã hết sản phẩm có size và màu mà bạn chọn!"
            })
        }

        cartIts = cartIts.map(item => {
            if (item.id === req?.params?.cartItemId) {
                let a = item
                a.quantity = a.quantity + req?.body?.quantity
                console.log(a)
                return a
            }
            else
                return { ...item }
        })

        await User.findByIdAndUpdate(req?.params?.id, { cart: cartIts }, { new: true })

        return successTemplate(res, req?.body?.quantity, "Update cart successfully!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const decreaseQuantityCartItem = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        let cartIts = user.cart

        let cartItem = cartIts.find(item => item.id === req?.params?.cartItemId)
        if (cartItem.quantity == 1) {
            cartIts = cartIts.filter(item => item.id !== req?.params?.cartItemId)
            await User.findByIdAndUpdate(req?.params?.id, { cart: cartIts }, { new: true })
            return res.json({
                result: false,
                message: "Xóa sản phẩm nhé!"
            })
        }
        else {
            cartIts = cartIts.map(item => item.id === req?.params?.cartItemId ? { ...item, quantity: --item.quantity } : { ...item })
            await User.findByIdAndUpdate(req?.params?.id, { cart: cartIts }, { new: true })
            return successTemplate(res, cartItem._id, "Update cart successfully!", 200)
        }
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        let cartIts = user.cart

        cartIts = cartIts.filter(item => item.id !== req?.params?.cartItemId)

        await User.findByIdAndUpdate(req?.params?.id, { cart: cartIts }, { new: true })

        return successTemplate(res, req?.params?.cartItemId, "Update cart successfully!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const createCartItem = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id)

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        const cart = user.cart

        cart ? cart.push({ ...req?.body }) : cart = [{ ...req?.body }]

        const product = await Product.findById(req?.body?.product);

        if (!product) {
            throw new Error('Product is not existed!');
        }
        let size = product.colors?.find(item => item.colorName == req?.body?.color)?.sizes?.find(item => item.sizeName === req?.body?.size)

        if (size?.quantity === 0) {
            return res.json({
                result: false,
                message: "Đã hết sản phẩm có size và màu mà bạn chọn!"
            })
        }

        // await Product.updateOne({
        //     _id: product._id, 
        //     "colors.colorName": req?.body?.color,
        //     "colors.sizes.sizeName": req?.body?.size
        // },{$inc: {
        //     'colors.$[].sizes.$[xxx].quantity': -1
        // }},
        // {arrayFilters: [
        //     {"xxx.sizeName": req?.body?.size}
        // ]})

        const item = await User.findByIdAndUpdate(req?.params?.id, { cart: cart }, { new: true }).populate('cart.product');

        return successTemplate(res, item.cart[item.cart.length - 1], "Update cart successfully!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const getAllCartItem = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id).populate('cart.product');

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        return successTemplate(res, user.cart, "Get all cart item successfully!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const getDefaultAddress = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id);

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        const addressDf = user.address.find((item) => item.default)

        return successTemplate(res, addressDf, "Get default address successfully!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}

const checkVoucherDiscountCode = async (req, res) => {
    try {
        const user = await Voucher.findById(req?.body?.id);

        if (!user) {
            throw new Error('User is not existed. Please log in!');
        }

        const addressDf = user.address.find((item) => item.default)

        return successTemplate(res, addressDf, "Get default address successfully!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}
const saveVoucherBuyer = async (req, res) => {
    try {
        validationId(req?.body?.id)
        validationId(req?.body?.voucherId)
        const founduser = await User.findById(req?.body?.id).populate('vouchers');
        const isAdded = founduser.vouchers.find(voucher => voucher.id.toString() === (req?.body?.voucherId).toString());
        console.log(isAdded)
        if (isAdded) {
            return successTemplate(res, founduser, "Mã voucher này đã đựợc lưu!", 200)
        }
        else {
            const user = await User.findByIdAndUpdate(req?.body?.id, {
                $push: { vouchers: req?.body?.voucherId }
            }, { new: true }).populate('vouchers')
            return successTemplate(res, user, "Lưu mã voucher thành công!", 200)
        }


    } catch (error) {
        return errorTemplate(res, error.message)
    }
}
const convertDate = (d) => {
    const date = new Date(d);

    // Lấy thông tin ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Tạo chuỗi ngày tháng định dạng 'DD-MM-YYYY'
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}
const templateHTMLOrder = (order) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Xác nhận đơn hàng</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .email-container {
          max-width: 600px;
          margin-left: 80px;
          padding: 20px;
        }
        .thank-you {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .order-details {
          margin-top: 20px;
        }
        .item {
          margin-bottom: 15px;
          padding-left: 20px; /* Thụt lề so với cha của nó */
          border-left: 2px solid #333; /* Đường kẻ bên trái để làm nổi bật */
        }
        .item p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>SHOP APP</h1>
        <p class="thank-you">Chào bạn,</p>
        <p>Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Dưới đây là chi tiết đơn hàng của bạn:</p>
        
        <div class="order-details">
          <!-- Thay đổi các thông tin sau theo đơn hàng cụ thể của bạn -->
         ${order.orderItem.map(item => {
        return `<div class="item">
            <p><strong>Tên sản phẩm:</strong> ${item.productName}</p>
            <p><strong>Màu:</strong> ${item.color}</p>
            <p><strong>Size:</strong> ${item.size}</p>
            <p><strong>Số lượng:</strong> ${item.quantity}</p>
            <p><strong>Giá:</strong> ${item.price} VNĐ</p>
          </div>`
    })}
          <!-- Thêm các mục khác nếu có -->
        </div>
         
        <p><strong>Tiền sau cùng:</strong> ${order.money} VNĐ</p>
        <p><strong>Thông tin người nhận:</strong> ${order.address.name}, ${order.address.phoneNumber} / ${order.address.detail}, ${order.address.ward}, ${order.address.district}, ${order.address.province} / ${order.address.note}</p>
        <p><strong>Ngày đặt hàng:</strong> ${convertDate(new Date())}</p>
    
        <p>Xin vui lòng kiểm tra lại thông tin đơn hàng của bạn. Nếu có bất kỳ vấn đề gì, hãy liên hệ với chúng tôi ngay lập tức.</p>
    
        <p>Xin chân thành cảm ơn bạn và chúc bạn một ngày tốt lành!</p>
      </div>
    </body>
    </html>
    `
}
const getDataStatistical = async (req, res) => {
    try {
        const buyers = await User.find({ role: 'Buyer' }).populate({
            path: 'orders',
            populate: {
                path: 'orderItem'
            }
        });
        const orders = await Order.find({}).populate([
            {
                path: 'orderItem',
                model: 'OrderItem',
                populate: {
                    path: 'productId',
                    model: 'Product'
                }
            }
        ]).exec();
        const allImports = await ImportProduct.find().exec();
        const years = [];
        buyers.forEach(item=> {
            var month = new Date(item?.createdAt).getFullYear();
            if(!years?.includes(month)){
                years.push(month)
            }
        })
        orders.forEach(item=> {
            var month = new Date(item?.orderDate).getFullYear();
            if(!years?.includes(month)){
                years.push(month)
            }
        })
        allImports.forEach(item=> {
            var month = new Date(item?.date).getFullYear();
            if(!years?.includes(month)){
                years.push(month)
            }
        })
        years.sort((a, b) => b - a);
        const data = {
            years: years,
            allImports: allImports,
            orders:orders,
            buyers: buyers
        }
        return successTemplate(res, data, "Lấy dữ liệu thống kê thành công!", 200)
    } catch (error) {
        return errorTemplate(res, error.message)
    }
}
module.exports = {
    userLoginCtrl,
    userRegisterCtrl,
    getAllBuyer,
    updateActiveBuyer,
    getAllUser,
    addAddressCtrl,
    deleteUser,
    getUserInfo,
    updateUserInfo,
    saveVoucherBuyer,
    updateAddressCtrl,
    getAllAddresssCtrl,
    deleteAddressCtrl,
    getAllOrderCtrl,
    createOrderCtrl,
    cancelOrderCtrl,
    getAllReviewCtrl,
    createReviewCtrl,
    getForuProductCtrl,
    increaseQuantityCartItem,
    decreaseQuantityCartItem,
    deleteCartItem,
    createCartItem,
    getAllCartItem,
    getDefaultAddress,
    checkVoucherDiscountCode,
    getApiMoMo,
    handlePaymentMomoSuccess,
    getDataStatistical
}