const Order = require('../../model/order/Order');
const Product = require('../../model/product/Product');
const OrderItem = require('../../model/orderItem/OrderItem');
const Bill = require('../../model/bill/Bill');
const Voucher = require('../../model/voucher/Voucher');
const validationId = require('../../utils/validationId');
const successTemplate = require("../../templates/succesTemplate");
const errorTemplate = require("../../templates/errorTemplate");
const sendMail = require('../../utils/email')
const orderController = {
    createOrder: async (req, res) => {
        try {
            const currentDate = new Date();

            const order = await Order.create({
                ...req?.body, orderDate: currentDate, status: "Processing"
            })
            return successTemplate(res, order, "Thêm đơn hàng mới thành công!", 200)
        } catch (error) {
            return errorTemplate(res, error.message)
        }
    },

    getAllOrder: async (req, res) => {
        try {
            const orders = await Order.find({});
            return successTemplate(res, orders, "Lấy tất cả orders thành công!", 200)
        } catch (error) {
            return errorTemplate(res, error.message)
        }
    },

    cancelOrder: async (req, res) => {
        try {
            const updOrderId = req?.params?.id;
            validationId(updOrderId)
            const existedOrder = await Order.findById(updOrderId);
            if (!existedOrder) throw new Error('Đơn hàng không tồn tại');
            const updUser = await Order.findByIdAndUpdate(updOrderId, {
                status: "Cancelled",
            }, { new: true })

            return successTemplate(res, { ...req?.body }, "Cập nhật Order thành công!", 200)

        } catch (error) {
            return errorTemplate(res, error.message)
        }
    },



    // admin
    adminGetAllOrder: async (req, res) => {
        try {
            const orders = await Order.find({}).populate([
                {
                    path: 'orderItem',
                    model: 'OrderItem',
                    populate: {
                        path: 'productId',
                        model: 'Product'
                    }
                }
            ])
                .sort({ orderDate: 'desc' })
                .exec();
            res.status(200).json({
                message: "Lấy tất cả orders thành công!",
                data: orders
            })
        } catch (error) {
            return errorTemplate(res, error.message)
        }


    },
    adminEditStatus: async (req, res) => {
        try {
            const { id, status } = req.body
            const order = await Order.findById(id).exec();
            order.status = status;
            await order.save();
            if (order.status === 'Đã xác nhận') {
                const order2 = await Order.findById(id)
                    .populate('orderItem')
                    .exec();
                const orderItemsGroup = await OrderItem.aggregate([
                    {
                        $match: {
                            _id: { $in: order2.orderItem.map(item => item._id) }
                        }
                    },
                    {
                        $group: {
                            _id: '$productId',
                            orderItems: { $push: '$$ROOT' } // Lưu trữ tất cả các orderItem của mỗi productId
                        }
                    }
                ]).exec()
                for (let i = 0; i < orderItemsGroup.length; i++) {
                    const productId = orderItemsGroup[i]._id
                    const quantity = orderItemsGroup[i].orderItems.reduce((acc, orderItem) => {
                        return acc + orderItem.quantity
                    }, 0)
                    const product = await Product.findById(productId).exec();
                    product.quantitySold = product.quantitySold + quantity
                    await product.save()

                }

                const orderItems = order2.orderItem;
                for (let i = 0; i < orderItems.length; i++) {
                    await Product.updateOne(
                        {
                            _id: orderItems[i].productId,
                            "colors.colorName": orderItems[i].color,
                            "colors.sizes.sizeName": orderItems[i].size
                        },
                        {
                            $inc: {
                                'colors.$.sizes.$[xxx].quantity': -orderItems[i].quantity
                            }
                        },
                        {
                            arrayFilters: [
                                { "xxx.sizeName": orderItems[i]?.size }
                            ]
                        }
                    )
                }
                if (order.voucher) {
                    await Voucher.findOneAndUpdate({ voucherCode: order.voucher?.voucherCode }, {
                        $inc: {
                            'quanlity': -1
                        }
                    })
                }


            }
            if (order.status === 'Đã hủy') {
                const order2 = await Order.findById(id)
                    .populate('orderItem')
                    .populate('userId')
                    .exec();
                    let totalMoney = order2.orderItem.reduce((acc, cur) => {
                        return acc + cur.price * cur.quantity
                    }, 0);
                    order2.money = totalMoney;
                if (order2.userId) {
                    await sendMail({
                        email: order2.userId.email,
                        subject: '[SHOP-WATCHER]: THÔNG BÁO HỦY ĐƠN ĐẶT HÀNG',
                        html: templateHTMLCancelOrder(order2)
                    })
                }
                else {
                    await sendMail({
                        email: order2.address.email,
                        subject: '[SHOP-WATCHER]: THÔNG BÁO HỦY ĐƠN ĐẶT HÀNG',
                        html: templateHTMLCancelOrder(order2)
                    })
                }
                
            }
            if (order.status === 'Giao thành công') {
                const bill = await Bill.findOne({ orderId: order._id }).exec()
                if (!bill) {
                    const order2 = await Order.findById(id)
                        .populate('orderItem')
                        .exec();
                    let totalMoney = order2.orderItem.reduce((acc, cur) => {
                        return acc + cur.price * cur.quantity
                    }, 0);
                    if (order2.voucher) {
                        totalMoney -= order2.voucher.isPercent ? order2.voucher.voucherPrice / 100 * totalMoney : order2.voucher.voucherPrice
                    }
                    await Bill.create({
                        orderId: order._id,
                        time: new Date(),
                        method: 'COD',
                        money: totalMoney,
                    })
                }

            }
            res.status(200).json({
                message: "Thay đổi trạng thái thành công!",
                data: order
            })

        } catch (error) {
            debugger
            return errorTemplate(res, error.message)
        }
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
const templateHTMLCancelOrder = (order) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hủy đơn hàng</title>
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
        <p>Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Nhưng chúng tôi rất tiếc phải hủy đơn hàng vì một số lý do không mong muốn:</p>
        
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
        <p><strong>Ngày đặt hàng:</strong> ${convertDate(new Date())}</p>
    
        <p></p>
    
        <p>Xin chân thành cảm ơn bạn và chúc bạn một ngày tốt lành!</p>
      </div>
    </body>
    </html>
    `
}

module.exports = orderController;