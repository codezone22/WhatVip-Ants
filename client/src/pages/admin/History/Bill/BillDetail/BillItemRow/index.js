
import classNames from "classnames/bind";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";


import styles from './BillItemRow.module.scss'
const cx = classNames.bind(styles)

function BillItemRow({ item }) {

    return (
        <React.Fragment >
            <tr className={cx('bill-item')} >
                {/* <td className={cx('delete')} ><span onClick={() => handleClickDeleteItem(index)}><RiDeleteBin6Line className={cx('icon-delete')} /></span></td> */}
                <td className={cx('code')}>{item.productId.productCode}</td>
                <td className={cx('name')}>{item.productId.productName}</td>
                <td className={cx('type')}>{item.productId.productType}</td>
                <td className={cx('color-size')}>{item.color + '/' +item.size}</td>
                <td className={cx('quantity')}>{item.quantity}</td>


            </tr>
        </React.Fragment>
    );
}

export default BillItemRow;