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


import styles from './BillDetail.module.scss'
import DropDown from "~/pages/admin/Products/DropDown";
import OrderItem from "~/pages/admin/Orders/OrderDetail/OrderItem";
import BillItemRow from "./BillItemRow";
import formatMoney from "~/utils/formatMoney";

const cx = classNames.bind(styles)

function BillDetail({itemBill}) {
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
                        Hóa đơn {'#' + itemBill._id.substring(12)}

                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <div className={cx('wrap-form-groups')}>
                            <div className={cx('form-group', 'no-border')} style={{ width: '30%' }}>
                                <label>Mã đơn hàng: </label>
                                <div className={cx('info-value')}>{'#' + itemBill.orderId._id.substring(12)}</div>
                            </div>
                            <div className={cx('form-group', 'no-border')} style={{ width: '30%' }}>
                                <label>Khách hàng: </label>
                                <div className={cx('info-value')}>{itemBill.customerName}</div>
                            </div>
                            <div className={cx('form-group', 'no-border')} style={{ width: '30%' }}>
                                <label>Số điện thoại: </label>
                                <div className={cx('info-value')}>{itemBill.customerPhone}</div>
                                {/* 15/08/2019 11:05 */}
                            </div>

                        </div>
                        <div className={cx('wrap-form-groups')}>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                                <label>Thời gian: </label>
                                <div className={cx('info-value')}>{itemBill.time}</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                                <label>Phương thức: </label>
                                <div className={cx('info-value')}>{itemBill.method}</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                                <label>Số sản phẩm: </label>
                                <div className={cx('info-value')}>{itemBill.orderId.orderItem.length}</div>
                            </div>

                        </div>
                        <div className={cx('wrap-form-groups')}>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                                <label>Tiền thanh toán: </label>
                                <div className={cx('info-value')}>{formatMoney(itemBill.money)}</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                                
                            </div>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                               
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

                                </tr>
                            </thead>
                            <tbody>

                                {itemBill.orderId?.orderItem?.map((item, index) => {
                                    return (
                                        <BillItemRow key={index} item={item}/>
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

export default BillDetail;