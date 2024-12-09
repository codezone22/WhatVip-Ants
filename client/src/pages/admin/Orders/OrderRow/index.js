
import classNames from "classnames/bind";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import OrderDetail from "../OrderDetail";
import { useSelector } from "react-redux";

import styles from './OrderRow.module.scss'
const cx = classNames.bind(styles)

function OrderRow({ index, getAllOrders}) {
    const order = useSelector(state => state.orderAdmin.listOrders[index])

    const element = useRef(null)
    const [openDetail,setOpenDetail] = useState(false);
    const handleClickProducItem = () => {
        setOpenDetail(prev => !prev);
    }
    
    useEffect(() => {
        if (openDetail) {
            const topElement = element.current?.offsetTop;
            window.scroll({top: topElement, behavior: 'smooth'})
        } 
    },[openDetail])
    return (
        <React.Fragment >
            <tr onClick={handleClickProducItem} className={cx('product-item', {showDetail: openDetail})} ref={element}>
        
                <td className={cx('code')}>{'#' + order._id.substring(12)}</td>
                <td className={cx('date')}>{order.orderDate}</td>
                <td className={cx('customerName')}>{order.address.name}</td>
                <td className={cx('customerPhone')}>{order.address.phoneNumber}</td>
                <td className={cx('province')}>{order.address.province}</td>
                <td className={cx('totalPrice')}>{order.finalPrice}</td>
                <td className={cx('status')}>{order.status}</td>

            </tr>

            {
                openDetail &&
                <tr className={cx('product-detail')}>
                    <td colSpan={8} style={{ padding: '0' }}>
                        <OrderDetail index={index} getAllOrders={getAllOrders}/>
                    </td>
                </tr>
            }
        </React.Fragment>
    );
}

export default OrderRow;