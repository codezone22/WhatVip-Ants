const user= {
    id: {type: String},
    firstName: { type: String},
    surName: { type: String},
    email: { type: String},
    phoneNum: { type: String},
    orders: [orderIds],
    vouchers: [voucherIds],
    address:[
        {
            province:{type: String},
            district: {type: String},
            ward: {type: String},
            detail: {type: String},
            default:{type: Boolean}
        },
        {}
    ],
    reviews:[reviewId],
    cart: [
        {
            productId: {type: String},
            size:{type: String},
            color:{type: String},
            quantity: {type:int}
        },
    ],
    feedback: [feedback],
    thongBao:[
        {
            orderId:{ type: String},
            img:{ type: String},
            content: { type: String},
            title:{ type: String}
        }
    ]
}
const feedback = {
    feedbackId:  { type: String},
    userId : { type: String},
    content: { type: String},
    title: { type: String},
    feedbackDate: { type: Date},
    img: [imgLinks],
    isResponsed: {type: Boolean}
}

const voucher = {
    voucherId: { type: String},
    price: { type: double},
    voucherCode: { type: String},
    expDate: { type: Date},
    minPrice: { type: double},
    description:{ type: String},
    startDate: { type: Date},
}
const order = {
    orderId: {type: String},
    orderDate: {type: Date},
    orderItem: [orderItemIds],
    status: {type: String},
}
const orderItem ={
    orderItemId:{type: String},
    productId: {type: String},
    size:{type: String},
    color:{type: String},
    quantity: {type:int},
    price: {type: double}
}
const review={
    reviewId: {type: String},
    orderItemId:{type: String},
    star:{type: double},
    userId:{type: String},
    content: {type: String},
    image: {type: String},
    reviewDate:{type: Date},
}            
const size= {
    sizeId:  {type: String},
    sizeName:  {type: String}
}

const product={
    productId: {type: String},  
    productName:{type: String},
    productTypeId: {type: String, },
    importPrice: {type: double, },
	exportPrice:{Type: double},
    discountPerc: {type: double, },
    colors:[
        {
            colorCode: {type: String},
            colorName: {type: String, },
            images:[imgLinks],
            size:{
                S: {
                    quantity:{type:int}
                },
                M: {
                    quantity:{type:int}
                },
                L: {
                    quantity: {type:int}
                },
                XL: {
                    quantity:{type:int}
                },
                XXL: {
                    quantity:{type:int}
                },
                XXXL: {
                    quantity:{type:int}
                },
            }
        },
        {
            colorName: {type: String, },
            images:[imgLinks]
        },
    ],
    quantitySold: {type: int},
    isSell: {type: Boolean}
}

const productType={
    productTypeId: {type: String},
    productTypeName: {type: String},
    productCategoryId: {type: String},
}
const productCategory={
    productCategoryId: {type: String},
    productCategoryName:{type: String},
}