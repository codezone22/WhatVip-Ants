import React, { useRef, useState } from "react";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import BillDetailCus from "../BillDetailCus";
import classNames from 'classnames/bind';

import styles from './CusRow.module.scss'
import convertDate from "~/utils/convertDate";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);

function CusRow({ item, index, currentPage, setCustomerList }) {
    const element = useRef(null)
    const notify = (type, message) => toast(message, { type: type });

    // const [isActive, setIsActive] = useState(item.isActive)
    const [openDetail, setOpenDetail] = useState(false);
    const [MaKH] = useState('KH_'+ item?._id.substring(16))
    const handleClickProducItem = () => {
        setOpenDetail(prev => !prev);
    }
    const handleBlock = async () => {
        try {
            await axios.post(`${baseUrl}/api/users/update-active-buyer/${item.id}`, {});
            setCustomerList(prev => {
                const arr = [...prev]
                arr[index].isActive = !item.isActive
                return arr
            })
            notify("success", 'Cập nhật hoạt động của khách hàng thành công!')

        } catch (error) {
            console.log(error.response.data.error.message)
        }
    }
    const totalAmountCus = (or) => {
        var total = 0;
        or?.forEach(element => {
            if (element?.status === 'Giao thành công') {
                var tt = 0;
                element?.orderItem.forEach((it) => {
                    tt += it.price * it.quantity
                })
                if(element?.voucher){
                    if (element?.voucher?.isPercent) {
                        total += tt * (1 - element?.voucher?.voucherPrice / 100)
                    }
                    else {
                        total += tt - element?.voucher?.voucherPrice
                    }
                } else {
                    total += tt
                }
            }
        });
        return total;
    }
    return (
        <React.Fragment>
            <ToastContainer />

            <tr className={cx('row-item', { showDetail: openDetail })} ref={element}>
                <td style={{ paddingLeft: '22px', width: '10%', color:'blue' }}>{MaKH}</td>
                <td style={{ width: '20%' }}>{item.fullName}</td>
                <td style={{ width: '17%' }}>{item.phoneNumber}</td>
                <td style={{ width: '14%' }}>{convertDate(item.createdAt)}</td>
                <td style={{ width: '14%' }}>{totalAmountCus(item?.orders)} đ</td>
                <td style={{ width: '14%' }}>
                    <div className={cx({ 'expired-item': !item.isActive }, { 'unExpired-item': item.isActive })}>
                        {item.isActive ? 'Hoạt động' : 'Bị khóa'}
                    </div>
                </td>
                <td>
                    <div style={{ display: 'flex' }}>
                        <button onClick={handleClickProducItem} style={{ marginRight: '4px' }}>
                            <BsEye fontSize={20} color='blue' />
                        </button>
                        <button onClick={handleBlock}>
                            {
                                item.isActive
                                    ? <BiLock fontSize={20} color='red' />
                                    : <BiLockOpen fontSize={20} color='green' />}
                        </button>
                    </div>
                </td>

            </tr>
            {
                openDetail &&
                <tr className={cx('bill-detail-cus')}>
                    <td colSpan={7} style={{ padding: '0' }}>
                        <BillDetailCus item={item} cusId={MaKH} totalAmount={totalAmountCus(item?.orders)}/>
                        {/* Chức năng */}
                        <div className={cx('product-fucntion')} onClick={() => setOpenDetail(false)}>
                            <span className={cx('btn', 'btn-succeed')} style={{ backgroundColor: '#e24949' }}>  Đóng</span>
                        </div>
                    </td>
                </tr>
            }
        </React.Fragment>
    );
}

export default CusRow;