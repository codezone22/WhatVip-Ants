const successTemplate = require('../../templates/succesTemplate');
const errorTemplate = require("../../templates/errorTemplate");
const OrderItem = require('../../model/orderItem/OrderItem');
const Order = require('../../model/order/Order');
const sendMail = require('../../utils/email')


const updateOrderItem  = async (id, data) => {
    try {

        const order = await Order.findById(id)

        if(!order){
            throw new Error('Order is not existed. Please log in!');
        }

        const orderItemIds = order.orderItem

        orderItemIds ? orderItemIds.push(data): orderItemIds = []

        await Order.findByIdAndUpdate(id, {orderItem: orderItemIds}, {new: true})
    }
    catch(err){
        throw new Error(err);
    }
}

const createOrderNonUserCtrl = async (req, res) => {
    try {
        console.log("1")
        const {orderItem, ...other} = req?.body
        debugger
        const order = await Order.create({
            ...other,
            orderDate: new Date()
        })
        console.log("2")


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
        console.log("3")


        let p = promise(req?.body?.orderItem[0])

        for (let i = 1; i < req?.body?.orderItem.length; i++) {
            p = p.then(async (data) => {
                await updateOrderItem(order.id,data)
                return promise(req?.body?.orderItem[i]);
            })
        }

        p.then(async data => {
            await updateOrderItem(order.id,data)
        })
        console.log("4")
        await sendMail({
            email: req.body.address.email,
            subject: '[SHOP-WATCHER]: ĐƠN ĐẶT HÀNG CỦA BẠN',
            html: templateHTMLOrder(req.body)
        })
        return successTemplate(res, "Something", "Create order successfully!", 200)

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
        <h1>SHOP WATCHER</h1>
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
module.exports = {
    createOrderNonUserCtrl,
}