import { RiCoupon3Fill } from "react-icons/ri";
import Footer from "./Footer";
import Header from "./Header";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { loginSuccess } from "~/redux/slices/authSlice";

function LayoutNoSidebar({ children }) {
    const [openGridVoucher, setOpenGridVoucher] = useState(false);
    const [voucherList, setVoucherList] = useState([])
    const notify = (type, message) => toast(message, { type: type });
    let currentUser = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const handleClose = (e) => {
        if (e.target.id === 'xsngxWrapperOverlayVoucherOpen') setOpenGridVoucher(false)
    }

    const checkStatus = (item) => {
        if (item.quanlity <= 0) return false;
        const expirationDate = new Date(item.expiredDate);
        const createdAt = new Date(currentUser?.createdAt);
        // Lấy ngày hôm nay
        const today = new Date();
        var soOrders = []
        var soOrders = currentUser?.orders ? currentUser?.orders.filter(item => item?.status === 'Giao thành công') : []

        if (today > expirationDate) return false;

        if (item?.applyFor === 'new') {

            var soMiliGiay = today - createdAt;

            // Tính số ngày
            var soNgay = soMiliGiay / (1000 * 60 * 60 * 24);
            if (soNgay >= 30) return false;
            if (soOrders.length >= 3) return false;

        }

        if (item?.applyFor === 'close') {
            var currentMonth = today.getMonth() + 1;
            var ordersCountByMonth = {};

            soOrders.forEach(function (order) {
                var orderMonth = new Date(order?.orderDate).getMonth() + 1;

                // Kiểm tra nếu đơn hàng nằm trong 2 tháng gần đây
                if (currentMonth < orderMonth) currentMonth += 12;
                if (currentMonth - orderMonth <= 2 && currentMonth - orderMonth > 0) {
                    // Tăng đếm đơn hàng cho tháng tương ứng
                    ordersCountByMonth[orderMonth] = (ordersCountByMonth[orderMonth] || 0) + 1;
                }
            });
            if (Object.keys(ordersCountByMonth).length === 0) return false;

            // Kiểm tra xem có ít nhất 2 đơn hàng trong mỗi tháng không
            for (var i = 1; i < 3; i++) {
                var c = today.getMonth() + 1;
                if (c <= i) c += 12;
                if (ordersCountByMonth[c - i] < 2) {
                    return false;
                }
            }

        }
        return true;
    }
    const handleSaveVoucherBuyer = async (id) => {
        if (currentUser === null) {
            notify("error", 'Bạn cần phải đăng nhập để lưu mã!')
            return;
        }
        let isWrong = false;
        currentUser.vouchers.forEach(item => {
            if ((item.id).toString() === id.toString()) {
                isWrong = true
                return;
            }
        })
        if (isWrong) {
            notify("success", 'Mã voucher này đã đựợc lưu!')
            return;
        }
        try {
            const d = {
                id: currentUser._id,
                voucherId: id
            }

            const { data } = await axios.post(`${baseUrl}/api/users/save-voucher-buyer`, d, {
                headers: { token: "Bearer " + currentUser.accessToken }
            })
            dispatch(loginSuccess({ ...currentUser, vouchers: [...data.result.vouchers] }))
            notify("success", data.message)

        } catch (error) {
            notify("error", error)
        }
    }

    const checkUserType = (currUser) => {
        if(currUser.orders){
            if(currUser.orders.map(item => item.status === "Giao thành công").length <= 2 && differDays(new Date(currentUser.createdAt), new Date()) / 30  < 1){
                return -1;
            }
            else{
                if(checkOldUser(currUser) && differDays(new Date(currentUser.createdAt), new Date()) / 30  >= 2){
                    return 1;
                }
                return 0;
            }
        }
        else{
            return -1;
        }
    }

    const differDays = (date1, date2) => {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const getVoucherViaUser = (voucherList, currUser) => {
        const userType = checkUserType(currUser)
        if(userType === -1){
            return voucherList.filter(item => checkStatus(item) && (item.applyFor === "all" || item.applyFor === "new")).slice(0, 10)
        }
        else{
            if(userType === 0){
                return voucherList.filter(item => checkStatus(item) && (item.applyFor === "all")).slice(0, 10)
            }
            else{
                return voucherList.filter(item => checkStatus(item) && (item.applyFor === "all" || item.applyFor === "close")).slice(0, 10)
            }
        }
    }

    useEffect(() => {
        const getAllVouchers = async () => {
            try {
                const config = {}
                const { data } = await axios.get(`${baseUrl}/api/vouchers`, config)
                setVoucherList([...data.result])
            } catch (error) {
                notify("error", error)
            }
        }
        getAllVouchers()
    }, [])

    const checkOldUser = (currUser) => {
        let arrOrderDate = currUser.orders.map(item => item.orderDate.split("T")[0].split("-")).map(item => Number(item[0]) + "" + Number(item[1]))

        let createDate = new Date(currUser.createdAt);
        let now = new Date();
        
        let startyear = createDate.getFullYear();
        let gapYear = now.getFullYear() - createDate.getFullYear()
        
        let startMonth = createDate.getMonth() + 1;
        let endMonth = now.getMonth() + 1 + gapYear * 12;

        let arr = []

        for(let i = startMonth; i <= endMonth; i++){
            arr.push(startyear + "" + (i % 12 !== 0 ? i % 12 : 12))
            if(i % 12 === 0) startyear++
        }
        console.log(arr)

        arr = arr.map(item => arrOrderDate.reduce((acc, i) => (i === item ? ++acc : acc), 0))
        return arr.reverse().filter((item, index) => index < 3).every(item => item >= 2)
    }
    return (
        <>
            <Header />
            <ToastContainer />

            <div style={{ paddingTop: '30px' }}>{children}</div>
            {
                currentUser && 
                <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: openGridVoucher ? 304 : 301, transition: 'all 0.3s', transform: openGridVoucher ? 'translatey(0)' : 'translatey(100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#2f5acf', color: 'white', width: '100%', maxWidth: '563px', padding: '0 1.5rem', height: '50px', fontSize: '16px', borderRadius: '0.5rem 0.5rem 0 0', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <RiCoupon3Fill size={18} style={{ marginRight: '12px' }} />
                            VOUCHER DÀNH CHO BẠN
                        </div>
                        {
                            openGridVoucher
                                ? <FaArrowDown style={{ cursor: 'pointer' }} onClick={() => setOpenGridVoucher(false)} />
                                : <FaArrowUp style={{ cursor: 'pointer' }} onClick={() => setOpenGridVoucher(true)} />
                        }
                    </div>
                    <div style={{ padding: '2.5rem', backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', gap: '3rem', boxSizing: 'border-box', userSelect: 'none', WebkitOverflowScrolling: 'touch', overflowX: 'scroll', whiteSpace: 'nowrap', width: '100%' }}>
                            {
                                getVoucherViaUser(voucherList, currentUser).map((item, index) =>
                                    <div key={index} style={{ width: '380px', height: '210px', borderRadius: '12px', position: 'relative', backgroundColor: '#ccc', padding: '2rem' }}>
                                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'black', marginTop: '50px', zIndex: '300' }}>Giảm {item.voucherPrice}{item.isPercent ? '%' : 'K'}</div>
                                        <div style={{ zIndex: '300' }}>Cho đơn hàng từ {item.minPrice}K</div>
                                        <div style={{ borderTop: '1px solid #efefef', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', zIndex: '300' }}>
                                            <div style={{ zIndex: '300' }}>{item.voucherCode}</div>
                                            <button onClick={() => { handleSaveVoucherBuyer(item.id) }} style={{ border: 'none', backgroundColor: 'white', borderRadius: '20px', padding: '4px 14px', cursor: 'pointer', zIndex: '300' }}>Lưu mã</button>
                                        </div>
                                        {/* <img src={item.voucherImage} style={{width:'380px', height:'210px', position:'absolute', opacity:'0.5', top:0, left:0, borderRadius:'12px', zIndex:'3'}}/> */}
                                    </div>)
                            }

                        </div>
                    </div>
                </div >
            }
            <div id="xsngxWrapperOverlayVoucherOpen" onClick={handleClose} style={{ opacity: openGridVoucher ? 1 : 0, visibility: openGridVoucher ? 'visible' : 'hidden', pointerEvents: openGridVoucher ? 'visible' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#0006', transition: 'all .3s', zIndex: openGridVoucher ? 303 : 300 }}></div>
            <Footer />
        </>
    );
}

export default LayoutNoSidebar;