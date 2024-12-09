import classNames from "classnames/bind";
import { AiOutlineSearch, AiFillCaretDown, AiFillCaretUp, AiOutlineEdit, AiOutlinePlu, AiOutlineSave } from "react-icons/ai";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { MdPublish } from "react-icons/md";
import { BiImport, BiSolidLockAlt } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { BiMap, BiMapPin, BiSitemap, BiPhoneCall, BiMessageSquareDetail } from "react-icons/bi";



import { useContext, useEffect } from "react";


import { useState } from "react";


import styles from './RentalImportDetail.module.scss'
import DropDown from "~/pages/admin/Products/DropDown";
import OrderItem from "~/pages/admin/Orders/OrderDetail/OrderItem";
import ImportItemRow from "./ImportItemRow";

const cx = classNames.bind(styles)

function RentalImportDetail({ itemImport }) {


    return (
        <div className={cx('wrapper')}>
            {/* Header */}
            <div className={cx('header')}>
                <div className={cx('tabpanel')}>Thông tin</div>
            </div>

            {/* Body */}
            <div className={cx('product-container')}>
                <div className={cx('order-container')}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4bac4d' }}>
                        Phiếu nhập #{itemImport._id.substring(12)}

                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <div className={cx('wrap-form-groups')}>
                            <div className={cx('form-group', 'no-border')} style={{ width: '30%' }}>
                                <label>Thời gian: </label>
                                <div className={cx('info-value')}>{itemImport.date}</div>
                            </div>
                            <div className={cx('form-group', 'no-border')} style={{ width: '30%' }}>
                                <label>Số sản phẩm: </label>
                                <div className={cx('info-value')}>{itemImport.productQuantity}</div>
                            </div>
                            <div className={cx('form-group', 'no-border')} style={{ width: '30%' }}>
                                <label>Số mặt hàng: </label>
                                <div className={cx('info-value')}>{itemImport.itemQuantity}</div>
                                {/* 15/08/2019 11:05 */}
                            </div>

                        </div>

                        <div className={cx('wrap-form-groups')}>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                            <label>Tiền hàng: </label>
                                <div className={cx('info-value')}>{itemImport.totalMoneyGoods +' VNĐ'}</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                            <label>Giảm giá: </label>
                                <div className={cx('info-value')}>{itemImport.discount +' VNĐ'}</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                                <label>Tổng tiền: </label>
                                <div className={cx('info-value')}>{itemImport.finalMoney+' VNĐ'}</div>
                            </div>

                        </div>



                    </div>

                    <div className={cx('tableView')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    {/* <th className={cx('delete')}></th> */}
                                    <th className={cx('code')}>Mã sản phẩm</th>
                                    <th className={cx('name')}>Tên sản phẩm</th>
                                    <th className={cx('type')}>Loại</th>
                                    <th className={cx('color-size')}>Màu/Size</th>
                                    <th className={cx('quantity')}>Số lượng</th>
                                    <th className={cx('unitPrice')}>Đơn giá</th>
                                    <th className={cx('price')}>Thành tiền</th>

                                </tr>
                            </thead>
                            <tbody>

                                {itemImport.listImportProducts.map((item, index) => {
                                    return (
                                        <ImportItemRow key={index} product={item} />
                                    )
                                })}

                            </tbody>
                        </table>

                    </div>


                </div>
                {/* Chức năng */}
               
            </div>
        </div>
    );
}

export default RentalImportDetail;