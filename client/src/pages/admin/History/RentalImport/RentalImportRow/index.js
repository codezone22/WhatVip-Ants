
import classNames from "classnames/bind";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import RentalImportDetail from "../RentalImportDetail";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";


import styles from './RentalImportRow.module.scss'
const cx = classNames.bind(styles)

function RentalImportRow({ itemImport }) {
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
            
                <td className={cx('code')}>{'#' + itemImport._id.substring(12)}</td>
                <td className={cx('date')}>{itemImport.date}</td>
                <td className={cx('productQuantity')}>{itemImport.productQuantity}</td>
                <td className={cx('itemQuantity')}>{itemImport.itemQuantity}</td>
                <td className={cx('totalPrice')}>{itemImport.finalMoney}</td>


            </tr>

            {
                openDetail &&
                <tr className={cx('product-detail')}>
                    <td colSpan={8} style={{ padding: '0' }}>
                        <RentalImportDetail itemImport={itemImport}/>
                    </td>
                </tr>
            }
        </React.Fragment>
    );
}

export default RentalImportRow;