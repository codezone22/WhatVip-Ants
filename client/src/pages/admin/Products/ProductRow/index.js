import classNames from "classnames/bind";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ProductDetail from "../ProductDetail";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import {  useSelector } from "react-redux";
import styles from './ProductRow.module.scss'
const cx = classNames.bind(styles)



function ProductRow({ index, getAllProducts}) {

    const product = useSelector(state => state.product.listProductsState[index])
    const quantityStorage = product.colors.reduce((accumulator, currentValue) => {
        const quantityColor = currentValue.sizes.reduce((acc,curr) => {
            return acc + curr.quantity
        },0)
        return accumulator + quantityColor;
    },0)
    const element = useRef(null)
    const imageProductDefault = "https://cdn-app.kiotviet.vn/sample/fashion/38.png";
    const img = product.colors[0]?.images[0] ?? imageProductDefault
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
                <td className={cx('img')}>
                    <img src={img}/>
                </td>
                <td className={cx('code')}>{product.productCode}</td>
                <td className={cx('name')}>{product.productName}</td>
                <td className={cx('status')}>{product.status}</td>
                <td className={cx('price-buy')}>{product.exportPrice}</td>
                <td className={cx('price-origin')}>{product.importPrice}</td>
                <td className={cx('quantity')}>{quantityStorage}</td>

            </tr>

            {
                openDetail &&
                <tr className={cx('product-detail')}>
                    <td colSpan={8} style={{ padding: '0' }}>
                        <ProductDetail index={index} getAllProducts={getAllProducts}/>
                    </td>
                </tr>
            }
        </React.Fragment>
    );
}

export default ProductRow;