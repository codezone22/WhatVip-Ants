import {createSlice} from "@reduxjs/toolkit"

const nonUserSlice = createSlice({
    name: 'nonUser',
    initialState:{
        cart:{
            isLoadingNonUserNonUser: false,
            cartProductsNonUser: [],
            forUProductsNonUser: [],
            vouchersNonUser: [],
            addressNonUser: [],
            errorNonUserNonUser: false,
            isSuccessNonUserNonUser: false,
        },
    },
    reducers: {
        //cart
        getProductCartStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
            state.cart.isSuccessNonUser = false;
        },
        getProductCartSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            state.cart.cartProductsNonUser = action?.payload?.cartProductsNonUser
            state.cart.isSuccessNonUser = true;
        },
        getProductCartFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
            state.cart.isSuccessNonUser = false;
        },

        // forU product

        getForUProductCartStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
        },
        getForUProductCartSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            state.cart.forUProducts = action?.payload
        },
        getForUProductCartFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
        },

        getAllVoucherStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
        },
        getAllVoucherSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            state.cart.vouchers = action?.payload
        },
        getAllVoucherFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
        },

        increaseCartItemStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
            state.cart.isSuccessNonUser = false;
        },
        increaseCartItemSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            state.cart.cartProductsNonUser = state.cart.cartProductsNonUser.map((item) => {
                if(item._id === action?.payload?.cartItemId) {
                    return{...item, quantity: item.quantity + action?.payload?.quantity}
                }
                return {...item}
            })
            state.cart.isSuccessNonUser = true;
        },
        increaseCartItemFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
            state.cart.isSuccessNonUser = false;
        },

        decreaseCartItemStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
            state.cart.isSuccessNonUser = false;
        },
        decreaseCartItemSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            state.cart.cartProductsNonUser = state.cart.cartProductsNonUser.map((item) => {
                if(item._id === action?.payload) {
                    return{...item, quantity: item.quantity - 1}
                }
                return {...item}
            })
            state.cart.isSuccessNonUser = true;
        },
        decreaseCartItemFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
            state.cart.isSuccessNonUser = false;
        },

        deleteCartItemStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
            state.cart.isSuccessNonUser = false;
        },
        deleteCartItemSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            if(action?.payload) state.cart.cartProductsNonUser = [...state.cart.cartProductsNonUser.filter((item) => item._id !== action.payload)]
            state.cart.isSuccessNonUser = true;
        },
        deleteCartItemFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
            state.cart.isSuccessNonUser = false;
        },

        createCartItemStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
            state.cart.isSuccessNonUser = false;
        },
        createCartItemSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            if(action?.payload) state.cart.cartProductsNonUser = [...state.cart.cartProductsNonUser, action?.payload];
            state.cart.isSuccessNonUser = true;
        },
        createCartItemFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
            state.cart.isSuccessNonUser = false;
        },

        getCartProductsStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
        },

        getCartProductsSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            state.cart.cartProductsNonUser = action?.payload
        },

        getCartProductsFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
        },

        getDefaultAddressStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
        },

        getDefaultAddressSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            state.cart.address = action?.payload
        },

        getDefaultAddressFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
        },

        createOrderStart: (state) => {
            state.cart.isLoadingNonUser = true;
            state.cart.errorNonUser = false;
            state.cart.isSuccessNonUserPayment = false;
        },

        createOrderSuccess: (state, action) => {
            state.cart.isLoadingNonUser = false;
            state.cart.isSuccessNonUserPayment = true;
        },

        createOrderFailed: (state) => {
            state.cart.isLoadingNonUser = false;
            state.cart.errorNonUser = true;
            state.cart.isSuccessNonUserPayment = false;
        },
    }
})

export const {
    getProductCartStart,
    getProductCartSuccess,
    getProductCartFailed,
    getForUProductCartStart,
    getForUProductCartSuccess,
    getForUProductCartFailed,
    getAllVoucherStart,
    getAllVoucherSuccess,
    getAllVoucherFailed,
    increaseCartItemStart,
    increaseCartItemSuccess,
    increaseCartItemFailed,
    decreaseCartItemStart,
    decreaseCartItemSuccess,
    decreaseCartItemFailed,
    deleteCartItemStart,
    deleteCartItemSuccess,
    deleteCartItemFailed,
    createCartItemStart,
    createCartItemSuccess,
    createCartItemFailed,
    getCartProductsStart,
    getCartProductsSuccess,
    getCartProductsFailed,
    getDefaultAddressStart,
    getDefaultAddressSuccess,
    getDefaultAddressFailed,
    createOrderStart,
    createOrderSuccess,
    createOrderFailed,
} = nonUserSlice.actions;

export default nonUserSlice.reducer;