const initState = {
    cart : [
        {
            productId: '1',
            productavatar: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/September2023/_CMM2123-Edits.jpg',
            productName: 'T-Shirt Cotton 220GSM',
            importPrice: 500000,
		    exportPrice: 537000,
            discountPerc: 0.2,
            colors:[
                {
                    colorCode: '#1',
                    colorName: "Trắng",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/September2023/trang189_2.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                        L: {
                            quantity: 12,
                        },
                        XL: {
                            quantity: 10,
                        },
                        XXL: {
                            quantity: 100,
                        },
                        XXXL: {
                            quantity: 90,
                        },
                    }
                },
                {
                    colorCode: '#2',
                    colorName: "Xanh biển",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2023/AT220-2582-6.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                        L: {
                            quantity: 12,
                        }
                    }
                },
                {
                    colorCode: '#3',
                    colorName: "Vàng",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/September2023/at220xpt-2-1.jpg',
                    size:{
                    }
                },
                {
                    colorCode: '#4',
                    colorName: "Nâu",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2023/AT220-1.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                    }
                }
            ],
            size: 'M',
            color: 'Trắng',
            quantity: 2,
        },
        {
            productId: '2',
            productavatar: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/September2023/_CMM2123-Edits.jpg',
            productName: 'Shorts thể thao 7" Movement',
            importPrice: 500000,
		    exportPrice: 537000,
            colors:[
                {
                    colorCode: '#1',
                    colorName: "Xanh rêu",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2022/DSC01693-copymovexanh_6.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                        L: {
                            quantity: 12,
                        },
                        XL: {
                            quantity: 10,
                        },
                        XXL: {
                            quantity: 100,
                        },
                        XXXL: {
                            quantity: 90,
                        },
                    }
                },
                {
                    colorCode: '#2',
                    colorName: "Xanh ngọc",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2022/DSC01693-copyngocxxan_61.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                        L: {
                            quantity: 12,
                        },
                        XL: {
                            quantity: 10,
                        },
                        XXL: {
                            quantity: 100,
                        },
                        XXXL: {
                            quantity: 90,
                        },
                    }
                },
                {
                    colorCode: '#3',
                    colorName: "Xanh biển",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/September2023/at220xpt-2-1.jpg',
                    size:{
                    }
                },
                {
                    colorCode: '#4',
                    colorName: "Nâu",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2023/AT220-1.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                    }
                }
            ],
            discountPerc: 0.2,
            quantity: 2,
            size: 'M',
            color: 'Xanh rêu',
        }
    ],
    forUProducts : [
        {
            productId: '3',
            productavatar: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/September2023/graphic.spec.2_4.jpg',
            productName: 'Combo 5 Đôi tất Basics',
            importPrice: 399000,
		    exportPrice: 499000,
            colors:[
                {
                    colorCode: '#1',
                    colorName: "Đen",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/November2023/combo4dt.1_32.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                        L: {
                            quantity: 12,
                        },
                        XL: {
                            quantity: 10,
                        },
                        XXL: {
                            quantity: 100,
                        },
                        XXXL: {
                            quantity: 90,
                        },
                    }
                },
                {
                    colorCode: '#2',
                    colorName: "Trắng",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/November2023/combo4dt.3_18.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                        L: {
                            quantity: 12,
                        }
                    }
                },
                {
                    colorCode: '#3',
                    colorName: "Xám Melange",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/November2023/combo4dt.2_60.jpg',
                    size:{
                    }
                },
            ],
            discountPerc: 0.2,
            quantity: 1,
            size: 'M',
            color: 'Đen',
        },
        {
            productId: '4',
            productavatar: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/November2023/combo4dt.1.jpg',
            productName: 'Áo khoác thể thao Pro Active',
            importPrice: 500000,
		    exportPrice: 537000,
            colors:[
                {
                    colorCode: '#1',
                    colorName: "Xám",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/October2023/QD001.20_38.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                        L: {
                            quantity: 12,
                        },
                        XL: {
                            quantity: 10,
                        },
                        XXL: {
                            quantity: 100,
                        },
                        XXXL: {
                            quantity: 90,
                        },
                    }
                },
                {
                    colorCode: '#2',
                    colorName: "Xanh đen",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/October2023/QD001.9_84.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                        L: {
                            quantity: 12,
                        },
                        XL: {
                            quantity: 10,
                        },
                        XXL: {
                            quantity: 100,
                        },
                        XXXL: {
                            quantity: 90,
                        },
                    }
                },
                {
                    colorCode: '#3',
                    colorName: "Xanh biển",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/September2023/at220xpt-2-1.jpg',
                    size:{
                    }
                },
                {
                    colorCode: '#4',
                    colorName: "Đen",
                    images: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/October2023/QD001.15_46.jpg',
                    size:{
                        S: {
                            quantity: 20,
                        },
                        M: {
                            quantity: 30,
                        },
                    }
                }
            ],
            discountPerc: 0.2,
            quantity: 1,
            size: 'M',
            color: 'Đen',
        }
    ]
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'cart/increaseQuantity':
            return {
                ...state,
                cart: state.cart.map(product => product.productId === action.payload.id && product.color === action.payload.color ? {...product, quantity: ++product.quantity} : {...product})
            } 
        case 'cart/reduceQuantity':
            return {
                ...state,
                cart: state.cart.map(product => product.productId === action.payload.id && product.color === action.payload.color ? {...product, quantity: --product.quantity} : {...product})
            }
        case 'cart/deleteOrderItem':
            return {
                ...state,
                cart: state.cart.filter((product => product.productId !== action.payload.id && product.color === action.payload.color))
            }
        case 'cart/filterChange':
            return {
                ...state,
                cart: state.cart.map(product => product.productId === action.payload.id && product.color === action.payload.color ? {...product,  [action.payload.type]: action.payload.value} : {...product})
            }
        case 'cart/importItemToOrder':
            const item = state.cart.find(o => o.productId === action.payload.product.productId && o.color === action.payload.product.color)
            return {
                ...state,
                cart: item ? (state.cart.map(product => product.productId === action.payload.product.productId && product.color === action.payload.color ? {...product, quantity: ++product.quantity} : {...product})) :
                        [...state.cart, {...action.payload.product}]
            }
        default:
            return state
    }
}

export default rootReducer;