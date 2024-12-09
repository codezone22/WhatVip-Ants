import classNames from "classnames/bind";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeItemImport, handleChangeUnitPriceImport } from "~/redux/slices/importProductsSlice";

import styles from './ImportProductRow.module.scss'
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles)



function ImportProductRow({ index, setModal, setIndexItemImport, product, onClickRemoveItem, listImportsLength }) {
    const itemImport = useSelector(state => state.importProduct.listImportProducts[index]);
    const dispatch = useDispatch();
    const handleClickImport = () => {
        setIndexItemImport(index)
        setModal(true)
    }
    const handleClickDeleteItem = (index) => {
        onClickRemoveItem(index)
    }


    return (
        <React.Fragment >
            <tr className={cx('product-item')}>
                <td className={cx('delete')} >{listImportsLength>1 && <span onClick={() => dispatch(removeItemImport({index}))}><RiDeleteBin6Line className={cx('icon-delete')} /></span>}</td>
                <td className={cx('stt')}>{index + 1}</td>
                <td className={cx('code')}>{itemImport.productCode}</td>
                <td className={cx('name')}>{itemImport.productName}</td>
                <td className={cx('quantity')}>{itemImport.quantity}</td>
                <td className={cx('unitPrice')}>
                    <input value={itemImport.unitPriceImport}  placeholder="100000" onChange={(e) => dispatch(handleChangeUnitPriceImport({index,unitPriceImport: e.target.value}))} type="text" style={{ width: '80px', textAlign: 'center', background: 'transparent' }}  />
                </td>
                <td className={cx('price')}>{itemImport.totalMoey}</td>
                <td className={cx('import')}>
                    <span onClick={handleClickImport} className={cx('btn', 'btn-succeed')}>Nhập</span>
                </td>

            </tr>


        </React.Fragment>
    );
}

export default ImportProductRow;