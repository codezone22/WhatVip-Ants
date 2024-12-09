import axios from "axios";
import { createAddressFailed, createAddressStart, createAddressSuccess, createCartItemFailed, createCartItemStart, createCartItemSuccess, createOrderFailed, createOrderStart, createOrderSuccess, createReviewFailed, getAPIMoMoStart, getAPIMoMoSuccess, getAPIMoMoFailed ,createReviewStart, createReviewSuccess, decreaseCartItemFailed, decreaseCartItemStart, decreaseCartItemSuccess, deleteAddressFailed, deleteAddressStart, deleteAddressSuccess, deleteCartItemFailed, deleteCartItemStart, deleteCartItemSuccess, getAllAddressFailed, getAllAddressStart, getAllAddressSuccess, getAllOrderFailed, getAllOrderReviewFailed, getAllOrderReviewStart, getAllOrderReviewSuccess, getAllOrderStart, getAllOrderSuccess, getAllVoucherFailed, getAllVoucherStart, getAllVoucherSuccess, getCartProductsFailed, getCartProductsStart, getCartProductsSuccess, getDefaultAddressFailed, getDefaultAddressStart, getDefaultAddressSuccess, getForUProductCartFailed, getForUProductCartStart, getForUProductCartSuccess, increaseCartItemFailed, increaseCartItemStart, increaseCartItemSuccess, resetSuccess, updateAddressFailed, updateAddressStart, updateAddressSuccess } from "../slices/userSlice";
import baseUrl from "~/utils/baseUrl";

//orders

export const getAllOrder = async (user, dispatch) => {
    dispatch(getAllOrderStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/getAllOrders/"+ user._id, {
            headers: {token: "Bearer " + user.accessToken}
        })
        dispatch(getAllOrderSuccess(res.data))
    }   
    catch(err){
        dispatch(getAllOrderFailed())
    }
}

//addresses

export const getAllAddresses = async (user, dispatch) => {
    dispatch(resetSuccess())
    dispatch(getAllAddressStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/addresses/"+ user._id, {
            headers: {token: "Bearer " + user.accessToken}
        })
       dispatch(getAllAddressSuccess(res.data.result))
    }   
    catch(err){
        dispatch(getAllAddressFailed())
    }
}

export const createAddresses = async (user, address, dispatch, callback) => {
    dispatch(resetSuccess())
    dispatch(createAddressStart())
    try{
        const res = await axios.put(baseUrl + "/api/users/addresses/addAddress/"+ user._id, address, {
            headers: {token: "Bearer " + user.accessToken}
        })
       dispatch(createAddressSuccess(res.data.result))
       callback(res)
    }   
    catch(err){
        dispatch(createAddressFailed())
    }
}


export const updateAddresses = async (user, address, dispatch, callback) => {
    dispatch(resetSuccess())
    dispatch(updateAddressStart())
    try{
        const res = await axios.put(baseUrl + "/api/users/addresses/updateAddress/"+ user._id + "/" + address._id, address, {
            headers: {token: "Bearer " + user.accessToken}
        })
       dispatch(updateAddressSuccess())
       callback(res)
    }   
    catch(err){
        dispatch(updateAddressFailed())
    }
}

export const deleteAddresses = async (user, address, dispatch, callback) => {
    dispatch(resetSuccess())
    dispatch(deleteAddressStart())
    try{
        const res = await axios.delete(baseUrl + "/api/users/addresses/deleteAddress/"+ user._id + "/" + address._id, {
            headers: {token: "Bearer " + user.accessToken}
        })
       dispatch(deleteAddressSuccess())
       callback(res)
    }   
    catch(err){
        dispatch(deleteAddressFailed())
    }
}


//ordersRevew

export const getAllOrderReview = async (user, dispatch) => {
    dispatch(getAllOrderReviewStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/reviews/"+ user._id, {
            headers: {token: "Bearer " + user.accessToken}
        })
        dispatch(getAllOrderReviewSuccess(res.data.result))
    }   
    catch(err){
        dispatch(getAllOrderReviewFailed())
    }
}

export const createReview = async (user, orderItemId, data, productId ,dispatch, callback) => {
    dispatch(createReviewStart(productId))
    try{
        const res = await axios.post(baseUrl + "/api/users/reviews/createReview/"+ user._id + "/" + orderItemId, data, {
            headers: {token: "Bearer " + user.accessToken},
        })
        console.log(res.data.result)
        dispatch(createReviewSuccess(res.data.result))
        callback(res)
    }   
    catch(err){
        dispatch(createReviewFailed())
    }
}

//cart

export const getForUProduct = async (dispatch) => {
    dispatch(getForUProductCartStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/cart/getForUProduct")
        dispatch(getForUProductCartSuccess(res.data))
    }   
    catch(err){
        dispatch(getForUProductCartFailed())
    }
}

export const getAllVoucher = async (dispatch) => {
    dispatch(getAllVoucherStart())
    try{
        const res = await axios.get(baseUrl + "/api/vouchers/")
        dispatch(getAllVoucherSuccess(res.data.result))
    }   
    catch(err){
        dispatch(getAllVoucherFailed())
    }
}

export const increaseQuantityCartItem = async (user, cartItem, dispatch) => {
    dispatch(increaseCartItemStart())
    try{
        const res = await axios.put(baseUrl + "/api/users/cart/increateCartItem/" + user._id + "/" + cartItem._id, cartItem, {
            headers: {token: "Bearer " + user.accessToken}
        })
        if(!res?.data?.result) return;
        dispatch(increaseCartItemSuccess({"cartItemId": cartItem._id, "quantity": res?.data?.result}))
    }   
    catch(err){
        dispatch(increaseCartItemFailed())
    }
}

export const decreaseQuantityCartItem = async (user, cartItem, dispatch) => {
    dispatch(decreaseCartItemStart())
    try{
        const res = await axios.put(baseUrl + "/api/users/cart/deceaseCartItem/" + user._id + "/" + cartItem._id, cartItem, {
            headers: {token: "Bearer " + user.accessToken}
        })
        console.log()
        if(!res?.data?.result) dispatch(deleteCartItemSuccess(cartItem._id))
        else dispatch(decreaseCartItemSuccess(cartItem._id))
    }   
    catch(err){
        dispatch(decreaseCartItemFailed())
    }
}

export const deleteCartItem = async (user, cartItem, dispatch) => {
    dispatch(deleteCartItemStart())
    try{
        const res = await axios.put(baseUrl + "/api/users/cart/deleteCartItem/" + user._id + "/" + cartItem._id, {
            headers: {token: "Bearer " + user.accessToken}
        })
        if(!res?.data?.result) return;
        dispatch(deleteCartItemSuccess(cartItem._id))
    }   
    catch(err){
        dispatch(deleteCartItemFailed())
    }
}

export const createCartItem = async (user, cart, dispatch) => {
    dispatch(createCartItemStart())
    try{
        const res = await axios.post(baseUrl + "/api/users/cart/createCartItem/" + user._id, cart)
        if(!res?.data?.result) return;
        dispatch(createCartItemSuccess(res?.data?.result))
    }   
    catch(err){
        dispatch(createCartItemFailed())
    }
}

export const getCartProducts = async (user, dispatch) => {
    dispatch(getCartProductsStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/cart/" + user._id)
        dispatch(getCartProductsSuccess(res?.data?.result))
    }   
    catch(err){
        dispatch(getCartProductsFailed())
    }
}

export const getDefaultAddress = async (user, dispatch) => {
    dispatch(getDefaultAddressStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/cart/defaultAddress/" + user._id)
        dispatch(getDefaultAddressSuccess(res?.data?.result))
    }   
    catch(err){
        dispatch(getDefaultAddressFailed())
    }
}

export const createOrder = async (user, data, dispatch) => {    
    dispatch(createOrderStart())
    try{
        var res;
        console.log("dô")

        if(user){
            res = await axios.post(baseUrl + "/api/users/createOrder/" + user._id, data)
        }
        else{
            console.log("dô")
            res = await axios.post(baseUrl + "/api/users/createOrderNonUser", data)
        }
        dispatch(createOrderSuccess(res?.data?.result))
    }   
    catch(err){
        dispatch(createOrderFailed())
    }
}
export const getAPIMoMo = async (user, data, dispatch) => {
    dispatch(getAPIMoMoStart())
    try{
        const res = await axios.post(baseUrl + "/api/users/getApiMoMo/" + user._id, data)
        dispatch(getAPIMoMoSuccess(res?.data?.data))
    }   
    catch(err){
        dispatch(getAPIMoMoFailed())
    }
}


