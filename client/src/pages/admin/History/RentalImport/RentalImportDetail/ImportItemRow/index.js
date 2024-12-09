
import classNames from "classnames/bind";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";


import styles from './ImportItemRow.module.scss'
const cx = classNames.bind(styles)

function ImportItemRow({  product }) {
   

    return (
        <React.Fragment >
            <tr  className={cx('bill-item')}>
                {/* <td className={cx('delete')} ><span onClick={() => handleClickDeleteItem(index)}><RiDeleteBin6Line className={cx('icon-delete')} /></span></td> */}
                <td className={cx('code')}>{product.productCode}</td>
                <td className={cx('name')}>{product.productName}</td>
                <td className={cx('type')}>{product.productType}</td>
                <td className={cx('color-size')}>{product.color+'/'+product.size}</td>
                <td className={cx('quantity')}>{product.quantity}</td>
                <td className={cx('unitPrice')}>{product.unitPriceImport}</td>
                <td className={cx('price')}>{product.unitPriceImport*product.quantity}</td>


            </tr>
        </React.Fragment>
    );
}

export default ImportItemRow;