const express = require('express');
const { 
    getAllUser,
    addAddressCtrl,
    deleteUser,
    getAllBuyer,
    updateActiveBuyer,
    updateUserInfo,
    getUserInfo,
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
    createCartItem,
    deleteCartItem,
    getAllCartItem,
    getDefaultAddress,
    checkVoucherDiscountCode,
    getDataStatistical,
    getApiMoMo,
    handlePaymentMomoSuccess
} = require('../../controller/userController/UserController');

const { 
    createOrderNonUserCtrl,
} = require('../../controller/NonUserController/nonUserController');

const verify = require('../../middlewares/auth/verify');

const userRoutes = express.Router();

userRoutes.get('/', verify.verifyToken, getAllUser);

userRoutes.delete('/:id', verify.verifyTokenAndAdmin, deleteUser);

userRoutes.get('/get-all-buyers', getAllBuyer);

userRoutes.get('/get-data-statisical', getDataStatistical);

userRoutes.get('/:id', getUserInfo);

userRoutes.put('/addresses/addAddress/:id', addAddressCtrl);

userRoutes.get('/addresses/:id', getAllAddresssCtrl);

userRoutes.put('/addresses/updateAddress/:id/:addressId', updateAddressCtrl);


userRoutes.delete('/addresses/deleteAddress/:id/:addressId', deleteAddressCtrl);



userRoutes.post('/update-active-buyer/:id', updateActiveBuyer);


userRoutes.post('/update-User/:id', updateUserInfo);

userRoutes.get('/getAllOrders/:id', getAllOrderCtrl);

userRoutes.post('/createOrder/:id', createOrderCtrl);

userRoutes.put('/cancelOrder/:orderId', cancelOrderCtrl);

//review

userRoutes.get('/reviews/:id', getAllReviewCtrl);

userRoutes.post('/reviews/createReview/:id/:orderItemId', createReviewCtrl);

userRoutes.get('/getAllOrders/:id', getAllOrderCtrl);

userRoutes.post('/createOrder/:id', createOrderCtrl);
userRoutes.post('/getApiMoMo/:id', getApiMoMo);
userRoutes.post('/handlePaymentMomoSuccess', handlePaymentMomoSuccess);




userRoutes.put('/cancelOrder/:orderId', cancelOrderCtrl);

//review

userRoutes.get('/reviews/:id', getAllReviewCtrl);

userRoutes.post('/reviews/createReview/:id/:orderItemId', createReviewCtrl);

userRoutes.post('/save-voucher-buyer', saveVoucherBuyer);

userRoutes.post('/save-voucher-buyer', saveVoucherBuyer);

//cart

userRoutes.get('/cart/getForUProduct', getForuProductCtrl);

userRoutes.put('/cart/increateCartItem/:id/:cartItemId', increaseQuantityCartItem);

userRoutes.put('/cart/deceaseCartItem/:id/:cartItemId', decreaseQuantityCartItem);

userRoutes.post('/cart/createCartItem/:id', createCartItem);

userRoutes.put('/cart/deleteCartItem/:id/:cartItemId', deleteCartItem);

userRoutes.get('/cart/:id', getAllCartItem);

userRoutes.get('/cart/defaultAddress/:id', getDefaultAddress);

userRoutes.get('/cart/checkVoucherDiscountCode', checkVoucherDiscountCode)

userRoutes.post('/createOrderNonUser', createOrderNonUserCtrl)

module.exports = userRoutes;