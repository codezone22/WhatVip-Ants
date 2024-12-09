import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import { createCartItemFailed, createCartItemStart, createCartItemSuccess, createOrderFailed, createOrderStart, createOrderSuccess, decreaseCartItemFailed, decreaseCartItemStart, decreaseCartItemSuccess, deleteCartItemFailed, deleteCartItemStart, deleteCartItemSuccess, getAllVoucherFailed, getAllVoucherStart, getAllVoucherSuccess, getCartProductsFailed, getCartProductsStart, getCartProductsSuccess, getDefaultAddressFailed, getDefaultAddressStart, getDefaultAddressSuccess, getForUProductCartFailed, getForUProductCartStart, getForUProductCartSuccess, increaseCartItemFailed, increaseCartItemStart, increaseCartItemSuccess } from "../slices/nonUserSlice";
import { v4 as uuid } from "uuid";
//cart

export const getForUProductNonUser = async (dispatch) => {
    dispatch(getForUProductCartStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/cart/getForUProduct")
        dispatch(getForUProductCartSuccess(res.data))
    }   
    catch(err){
        dispatch(getForUProductCartFailed())
    }
}

export const getAllVoucherNonUser = async (dispatch) => {
    dispatch(getAllVoucherStart())
    try{
        const res = await axios.get(baseUrl + "/api/vouchers/")
        dispatch(getAllVoucherSuccess(res.data.result))
    }   
    catch(err){
        dispatch(getAllVoucherFailed())
    }
}

export const increaseQuantityCartItemNonUser = async (cartItem, dispatch) => {
    dispatch(increaseCartItemStart())
    try{
        dispatch(increaseCartItemSuccess({"cartItemId": cartItem._id, "quantity": cartItem.quantity}))
    }   
    catch(err){
        dispatch(increaseCartItemFailed())
    }
}

export const decreaseQuantityCartItemNonUser = async (cartItem, dispatch) => {
    dispatch(decreaseCartItemStart())
    try{
        dispatch(decreaseCartItemSuccess(cartItem._id))
    }   
    catch(err){
        dispatch(decreaseCartItemFailed())
    }
}

export const deleteCartItemNonUser = async (cartItem, dispatch) => {
    dispatch(deleteCartItemStart())
    try{
        dispatch(deleteCartItemSuccess(cartItem._id))
    }   
    catch(err){
        dispatch(deleteCartItemFailed())
    }
}

export const createCartItemNonUser = async (cart, dispatch) => {
    dispatch(createCartItemStart())
    try{
        dispatch(createCartItemSuccess({...cart, _id: uuid()}))
    }   
    catch(err){
        dispatch(createCartItemFailed())
    }
}

export const getCartProductsNonUser = async (user, dispatch) => {
    dispatch(getCartProductsStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/cart/" + user._id)
        dispatch(getCartProductsSuccess(res?.data?.result))
    }   
    catch(err){
        dispatch(getCartProductsFailed())
    }
}

export const getDefaultAddressNonUser = async (user, dispatch) => {
    dispatch(getDefaultAddressStart())
    try{
        const res = await axios.get(baseUrl + "/api/users/cart/defaultAddress/" + user._id)
        dispatch(getDefaultAddressSuccess(res?.data?.result))
    }   
    catch(err){
        dispatch(getDefaultAddressFailed())
    }
}

export const createOrderNonUser = async (user, data, dispatch) => {
    dispatch(createOrderStart())
    try{
        const res = await axios.post(baseUrl + "/api/users/createOrder/" + user._id, data)
        dispatch(createOrderSuccess(res?.data?.result))
    }   
    catch(err){
        dispatch(createOrderFailed())
    }
}