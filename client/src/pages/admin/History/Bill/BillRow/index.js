
import classNames from "classnames/bind";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import BillDetail from "../BillDetail";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";


import styles from './BillRow.module.scss'
const cx = classNames.bind(styles)

function BillRow({ itemBill }) {
    const element = useRef(null)
    const [openDetail, setOpenDetail] = useState(false);
    const handleClickProducItem = () => {
        setOpenDetail(prev => !prev);
    }
    useEffect(() => {
        if (openDetail) {
            const topElement = element.current?.offsetTop;
            window.scroll({ top: topElement, behavior: 'smooth' })
        }
    }, [openDetail])
    return (
        <React.Fragment >
            <tr onClick={handleClickProducItem} className={cx('product-item', { showDetail: openDetail })} ref={element}>
                {/* <td className={cx('delete')} ><span onClick={() => handleClickDeleteItem(index)}><RiDeleteBin6Line className={cx('icon-delete')} /></span></td> */}
                <td className={cx('billCode')}>{'#' + itemBill._id.substring(12)}</td>
                <td className={cx('orderCode')}>{'#' + itemBill.orderId._id.substring(12)}</td>
                <td className={cx('date')}>{itemBill.time}</td>
                <td className={cx('payMethod')}>{itemBill.method}</td>
                <td className={cx('customerName')}>{itemBill.customerName}</td>
                <td className={cx('totalPrice')}>{itemBill.money}</td>
      

            </tr>
            {
                openDetail &&
                <tr className={cx('product-detail')}>
                    <td colSpan={8} style={{ padding: '0' }}>
                        <BillDetail itemBill={itemBill}/>
                    </td>
                </tr>
            }

           
        </React.Fragment>
    );
}

export default BillRow;