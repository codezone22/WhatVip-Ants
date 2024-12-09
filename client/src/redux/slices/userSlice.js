import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState:{
        order:{
            isLoading: false,
            orders: [],
            error: false,
            isSuccess: false,
        },

        address:{
            isLoading: false,
            addresses: [],
            error: false,
            isSuccess: false,
        },

        orderReview:{
            isLoading: false,
            orders: [],
            error: false,
            isSuccess: false,
        },

        cart:{
            isLoading: false,
            cartProducts: [],
            forUProducts: [],
            vouchers: [],
            address: [],
            error: false,
            isSuccess: false,
            
        },
    },
    reducers: {

        //order
        getAllOrderStart: (state) => {
            state.order.isLoading = true;
            state.order.error = false;
        },
        getAllOrderSuccess: (state, action) => {
            state.order.isLoading = false;
            state.order.orders = action.payload;
        },
        getAllOrderFailed: (state) => {
            state.order.isLoading = false;
            state.order.error = true;
        },

        //addresses

        resetSuccess: (state) => {
            state.order.isSuccess = false
            state.address.isSuccess = false
            state.orderReview.isSuccess = false
            state.cart.isSuccess = false
            state.orderReview.isSuccessCR = false
        },
        getAllAddressStart: (state) => {
            state.address.isLoading = true;
            state.address.error = false;
        },
        getAllAddressSuccess: (state, action) => {
            state.address.isLoading = false;
            state.address.addresses = action.payload;
        },
        getAllAddressFailed: (state) => {
            state.address.isLoading = false;
            state.address.error = true;
        },

        createAddressStart: (state) => {
            state.address.isLoading = true;
            state.address.error = false;
            state.address.isSuccess = false;
        },
        createAddressSuccess: (state, action) => {
            state.address.isLoading = false;
            state.address.isSuccess = true;
        },
        createAddressFailed: (state) => {
            state.address.isLoading = false;
            state.address.error = true;
            state.address.isSuccess = false;
        },

        updateAddressStart: (state) => {
            state.address.isLoading = true;
            state.address.isSuccess = false;
            state.address.error = false;

        },
        updateAddressSuccess: (state, action) => {
            state.address.isLoading = false;
            state.address.isSuccess = true;
        },
        updateAddressFailed: (state) => {
            state.address.isLoading = false;
            state.address.error = true;
            state.address.isSuccess = false;
        },

        deleteAddressStart: (state) => {
            state.address.isLoading = true;
            state.address.isSuccess = false;
            state.address.error = false;

        },
        deleteAddressSuccess: (state, action) => {
            state.address.isLoading = false;
            state.address.isSuccess = true;
        },
        deleteAddressFailed: (state) => {
            state.address.isLoading = false;
            state.address.error = true;
            state.address.isSuccess = false;
        },

        //orderReview

        getAllOrderReviewStart: (state) => {
            state.orderReview.isLoading = true;
            state.orderReview.error = false;
        },
        getAllOrderReviewSuccess: (state, action) => {
            state.orderReview.isLoading = false;
            state.orderReview.orders = action.payload;
        },
        getAllOrderReviewFailed: (state) => {
            state.orderReview.isLoading = false;
            state.orderReview.error = true;
        },

        createReviewStart: (state, action) => {
            state.orderReview.id = action?.payload;
            state.orderReview.isLoadingCR = true;
            state.orderReview.error = false;
            state.orderReview.isSuccessCR = false;
        },
        createReviewSuccess: (state, action) => {
            state.orderReview.isLoadingCR = false;
            state.orderReview.isSuccessCR = true;
        },
        createReviewFailed: (state) => {
            state.orderReview.isLoadingCR = false;
            state.orderReview.error = true;
            state.orderReview.isSuccessCR = false;
        },

        //cart

        getProductCartStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
            state.cart.isSuccess = false;
        },
        getProductCartSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.cartProducts = action?.payload?.cartProducts
            state.cart.isSuccess = true;
        },
        getProductCartFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
            state.cart.isSuccess = false;
        },

        // forU product

        getForUProductCartStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
        },
        getForUProductCartSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.forUProducts = action?.payload
        },
        getForUProductCartFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
        },

        getAllVoucherStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
        },
        getAllVoucherSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.vouchers = action?.payload
        },
        getAllVoucherFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
        },

        increaseCartItemStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
            state.cart.isSuccess = false;
        },
        increaseCartItemSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.cartProducts = state.cart.cartProducts.map((item) => {
                if(item.id === action?.payload?.cartItemId) {
                    return{...item, quantity: item.quantity + action?.payload?.quantity}
                }
                return {...item}
            })
            state.cart.isSuccess = true;
        },
        increaseCartItemFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
            state.cart.isSuccess = false;
        },

        decreaseCartItemStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
            state.cart.isSuccess = false;
        },
        decreaseCartItemSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.cartProducts = state.cart.cartProducts.map((item) => {
                if(item.id === action?.payload) {
                    return{...item, quantity: item.quantity - 1}
                }
                return {...item}
            })
            state.cart.isSuccess = true;
        },
        decreaseCartItemFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
            state.cart.isSuccess = false;
        },

        deleteCartItemStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
            state.cart.isSuccess = false;
        },
        deleteCartItemSuccess: (state, action) => {
            state.cart.isLoading = false;
            if(action?.payload) state.cart.cartProducts = state.cart.cartProducts.filter((item) => item._id !== action.payload)
            state.cart.isSuccess = true;
        },
        deleteCartItemFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
            state.cart.isSuccess = false;
        },

        createCartItemStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
            state.cart.isSuccess = false;
        },
        createCartItemSuccess: (state, action) => {
            state.cart.isLoading = false;
            if(action?.payload) state.cart.cartProducts = [...state.cart.cartProducts, action?.payload];
            state.cart.isSuccess = true;
        },
        createCartItemFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
            state.cart.isSuccess = false;
        },

        getCartProductsStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
        },

        getCartProductsSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.cartProducts = action?.payload
        },
        
        getCartProductsFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
        },

        getDefaultAddressStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
        },

        getDefaultAddressSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.address = action?.payload
        },
        
        getDefaultAddressFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
        },

        createOrderStart: (state) => {
            state.cart.isLoading = true;
            state.cart.error = false;
            state.cart.isSuccessPayment = false;
        },

        createOrderSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.isSuccessPayment = true;
        },
        
        createOrderFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
            state.cart.isSuccessPayment = false;
        },
        getAPIMoMoStart: (state,action) => {
            state.cart.isLoading = true
            state.cart.error = false;
            state.cart.isSuccessGetMoMo = false
        },
        getAPIMoMoSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.isSuccessGetMoMo = true;
            state.cart.urlMoMo = action.payload
        },
        
        getAPIMoMoFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
            state.cart.isSuccessGetMoMo = false;
        },
    }
})

export const {
    getAllOrderStart,
    getAllOrderSuccess,
    getAllOrderFailed,
    getAllAddressStart,
    getAllAddressSuccess,    
    getAllAddressFailed,
    resetSuccess,
    createAddressStart,
    createAddressSuccess,
    createAddressFailed,
    updateAddressStart,
    updateAddressSuccess,
    updateAddressFailed,
    deleteAddressStart,
    deleteAddressSuccess,
    deleteAddressFailed,
    getAllOrderReviewStart,
    getAllOrderReviewSuccess,
    getAllOrderReviewFailed,
    createReviewStart,
    createReviewSuccess,
    createReviewFailed,
    getForUProductCartStart,
    getForUProductCartSuccess,
    getForUProductCartFailed,
    getAllVoucherStart,
    getAllVoucherSuccess,
    getAllVoucherFailed,
    increaseCartItemStart,
    increaseCartItemSuccess,
    increaseCartItemFailed,
    createCartItemStart,
    createCartItemSuccess,
    createCartItemFailed,
    getCartProductsStart,
    getCartProductsSuccess,
    getCartProductsFailed,
    decreaseCartItemStart,
    decreaseCartItemSuccess,
    decreaseCartItemFailed,
    deleteCartItemStart,
    deleteCartItemSuccess,
    deleteCartItemFailed,
    getDefaultAddressStart,
    getDefaultAddressSuccess,
    getDefaultAddressFailed,
    createOrderStart,
    createOrderSuccess,
    createOrderFailed,
    getAPIMoMoStart,
    getAPIMoMoSuccess,
    getAPIMoMoFailed
} = userSlice.actions;

export default userSlice.reducer;