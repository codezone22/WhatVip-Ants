import styles from './Payment.module.scss'
import classNames from 'classnames/bind';
import TransportInfo from './TransportInfo';
import { useEffect, useRef, useState } from 'react';
import PaymentForm from './PaymentForm';
import Cart from './Cart';
import { BiLeftArrow } from 'react-icons/bi';
import { createOrder, getDefaultAddress, getAPIMoMo } from '~/redux/api/userRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { resetSuccess } from '~/redux/slices/userSlice';
import Addresses from '../Profile/Addresses';
import { Modal } from '~/components';
const cx = classNames.bind(styles);

function Payment() {
    let address = useSelector(state => state.user?.cart?.address)

    let currentUser = useSelector((state) => state.auth.login.currentUser)
    let cartProducts = useSelector(state => state.user?.cart?.cartProducts)
    let cartProductsNonUser = useSelector(state => state.nonUser?.cart?.cartProductsNonUser)
    let isSuccessPayment = useSelector(state => state.user?.cart?.isSuccessPayment)
    let isSuccessGetMoMo = useSelector(state => state.user?.cart?.isSuccessGetMoMo)
    let urlMoMo = useSelector(state => state.user?.cart?.urlMoMo)
    
    let isLoading = useSelector(state => state.user?.cart?.isLoading)

    const [addressSL, setAddress] = useState();
    const [addressPopup, setAddressPopup] = useState(false);
    const [money,setMoney] = useState(0)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getDefaultAddress(currentUser, dispatch)
    }, [])

    useEffect(() => {
       if(address) setAddress(address)
    }, [address])

    useEffect(() => {
        if(isSuccessPayment){
           navigate("/successPayment")

        }
    }, [isSuccessPayment])
    useEffect(() => {
        if(isSuccessGetMoMo){
            window.location.href = urlMoMo
        }
    },[isSuccessGetMoMo])

    let transportInfo = useRef();
    let voucherInfo = useRef();

    const [errAD, setErrAD] = useState({
    })

    const validateAddress = (item) => {
        let count = 0;
        console.log(item)
        var errIT = {

        }
        if(item.name === ""){
            errIT.name = "Vui lòng nhập họ và tên"
            count++;
        }
        if(item.phoneNumber === ""){
            errIT.phoneNumber = "Vui lòng nhập số điện thoại"
            count++;
        } 
        if(item.email === ""){
            errIT.email= "Vui lòng nhập email"
            count++;
        } 
        if(item.detail === ""){
            errIT.detail= "Vui lòng nhập chi tiết địa chỉ"
            count++;
        } 
        if(item.province === ""){
            errIT.province= "Vui lòng chọn tỉnh"
            count++;
        } 
        if(item.district === ""){
            errIT.district= "Vui lòng chọn quận/huyện"
            count++;
        } 
        if(item.ward === ""){
            errIT.ward= "Vui lòng chọn phường/xã"
            count++;
        } 
        if(count === 0) return true;
        setErrAD(errIT)
        return false;
    }
    const handleChangeMoney = (money) => {
        setMoney(money)
    }
    const handleKeyCOD = (currentUser,order,dispatch) => {
        createOrder(currentUser, order, dispatch)
    }
    const handleKeyMoMo = (currentUser,order,dispatch) => {
        getAPIMoMo(currentUser,order,dispatch)
    }
    const handlePayment = (paymentMethod) => {
        

        const voucherIF = voucherInfo?.current?.getChildVoucher()
        const {id, _id, ...main} = transportInfo?.current?.getChildSelected()

        if(!validateAddress(main)){
            return;
        }
        if(currentUser){
            if(cartProducts.length === 0){
                notify("warning", "Bạn chưa có sản phẩm nào trong giỏ hàng")
                return;
            }
        }
        else{
            if(cartProductsNonUser.length === 0){
                notify("warning", "Bạn chưa có sản phẩm nào trong giỏ hàng")
                return;
            }
        }


        const order = {
            "orderItem": currentUser ? cartProducts.map((item) => {
                return {
                    productId: item.product._id,
                    size: item.size,
                    image: item.product.colors.find((i) => i.colorName === item.color).images[0],
                    quantity: item.quantity,
                    color: item.color,
                    price: item.productPrice,
                    productName: item.productName
                }
            }) : 
            cartProductsNonUser.map((item) => {
                return {
                    productId: item.product._id,
                    size: item.size,
                    image: item.product.colors.find((i) => i.colorName === item.color).images[0],
                    quantity: item.quantity,
                    color: item.color,
                    price: item.productPrice,
                    productName: item.productName
                }
            }),
            "status": "Đang xử lý",
            "address": main ? main: null,
            "voucher": voucherIF ? {
                voucherPrice: voucherIF.voucherPrice,
                isPercent: voucherIF.isPercent,
                voucherCode: voucherIF.voucherCode,
            } : null
        }
        let totalMoney = 0;
        if (currentUser) {
            totalMoney = cartProducts.reduce((acc,cur) => {
                return acc + cur.productPrice*cur.quantity
            },0);
        }
        else {
            totalMoney = cartProductsNonUser.reduce((acc,cur) => {
                return acc + cur.productPrice*cur.quantity
            },0);
        }
        if (voucherIF) {
            totalMoney -= voucherIF.isPercent ? voucherIF.voucherPrice/100 * totalMoney : voucherIF.voucherPrice
        }
        order.money = totalMoney
        console.log(order)
        if (paymentMethod.key === 'COD') {
            handleKeyCOD(currentUser,order, dispatch);
        }
        if (paymentMethod.key === 'MoMo') {
            handleKeyMoMo(currentUser,order, dispatch)
        }
    
    }
    const notify = (type, message) => toast(message, { type: type });
    return ( <>
        <div className={cx('container')}>
            <ToastContainer/>
            <div className={cx('nav_left')}>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <span className={cx('title')}>Thông tin vận chuyển</span>
                        {
                            currentUser &&
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px', cursor: 'pointer'}} onClick={() => setAddressPopup(true)}>
                                <img src={"https://www.coolmate.me/images/address_book_icon.svg"} alt='' style={{width: '16px', height: '16px'}}/>
                                <span style={{color: '#2f5acf', fontSize: '14px'}}>Chọn từ sổ địa chỉ</span>
                            </div>
                        }
                    </div>
                    <TransportInfo _ref={transportInfo} error={errAD} props={currentUser? addressSL : null} userMail={currentUser? currentUser.email : ''}/>
                </div>
                <div style={{marginTop: '20px'}}>
                    <span className={cx('title')}>Hình thức thanh toán</span>
                    <PaymentForm handlePayment={handlePayment}/>
                </div>
            </div>
            <div className={cx('nav_right')}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span className={cx('title')}>Giỏ hàng</span>
                    <div>
                        {
                            isLoading &&
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                                <div style={{marginRight: '10px'}}>Đang kiểm tra</div>
                                <svg style={{marginLeft: '-4px', marginRight: '12px', height: '20px', width: '20px', color: 'black'}} className={cx("animate-spin")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle style={{opacity: '25%'}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path style={{opacity: '75%%'}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        }
                    </div>
                </div>
                <Cart _ref={voucherInfo}/>
            </div>
            {
                currentUser && 
                    <Modal visible={addressPopup} setModal={setAddressPopup}>
                        <div className={cx('outer-address-popup')} style={{backgroundColor: 'white', width: '700px'}}>
                            <Addresses payment onClickAddress={(item) => {setAddress(item); setAddressPopup(false)}}/>  
                        </div>
                    </Modal>
            }
        </div>
    </> );
}

export default Payment;