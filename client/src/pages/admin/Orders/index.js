import classNames from "classnames/bind";
import { AiOutlineSearch, AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import React, { useEffect, useState, useRef } from "react";

import convertDate from "~/utils/convertDate";
import styles from './Order.module.scss'
import DropDown from "../Products/DropDown";
import OrderRow from "./OrderRow";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from '~/utils/baseUrl';
import axios from "axios";
import { setListOrders, filterListOrder } from "~/redux/slices/orderAdminSlice";
import { CSVLink } from 'react-csv'
import formatMoney from "~/utils/formatMoney";

const cx = classNames.bind(styles)

function Orders() {
    const dispatch = useDispatch()
    const listOrders = useSelector(state => state.orderAdmin.listOrders)
    const [listOrdersExport, setListOrdersExport] = useState([])
    const [inputFocus, setInputFocus] = useState(false);
    const listStatus = ['Tất cả', 'Đang xử lý', 'Đã xác nhận', 'Đang giao hàng', 'Giao thành công', 'Đã hủy']
    const [showStatus, setShowStatus] = useState(false)
    const filterStatus = useRef(null)
    const dateInputElement = useRef(null);
    const [filter, setFilter] = useState({
        status: '',
        textSearch: '',
        date: null,

    })

    const handleMouseOverDateFilter = () => {
        dateInputElement.current?.showPicker();
    }
    const convertDate2 = (value) => {
        const tmpArr = value.split('-');
        let date = [];
        for (let i = tmpArr.length - 1; i >= 0; i--) date = [...date, tmpArr[i]];
        const res = date.join('/');
        return res;
    }
    const nowDate = convertDate(new Date());
    const handleChangeDateInput = (e) => {
        let value = e.target.value;
        if (!value) {
            setFilter(prev => ({ ...prev, date: '' }))
            return;
        }
        const res = convertDate2(value);

        setFilter(prev => ({ ...prev, date: res }))

    }

    useEffect(() => {
        setFilter(prev => ({ ...prev, date: '' }))

    }, [])
    useEffect(() => {
        console.log(listOrders)
        setListOrdersExport(prev => {
            const nextState = [];
            [...listOrders].forEach(row => {
                nextState.push({
                    'MDH': '#' + row._id.substring(12),
                    'NDH': row.orderDate,
                    'TGDH': formatMoney(row.finalPrice),
                    'TTNN': `${row.address?.name}, ${row.address?.phoneNumber}, ${row.address?.ward}, ${row.address?.district}, ${row.address?.province}/${row.address?.detail}`,
                    'TT': row.status,
                })
                row.orderItem.forEach(subRow => {
                    nextState.push({
                        'MSP': subRow.productId.productCode,
                        'TSP': subRow.productId.productName,
                        'LSP': subRow.productId.productType,
                        'M': subRow.color,
                        'S': subRow.size,
                        'SL': subRow.quantity,
                    })
                })
    
            })
            return nextState
        })
    }, [listOrders])
    const headers = [
        { label: 'Mã đơn hàng', key: 'MDH' },
        { label: 'Ngày đặt hàng', key: 'NDH' },
        { label: 'Trị giá đơn hàng', key: 'TGDH' },
        { label: 'Thông tin người nhận', key: 'TTNN' },
        { label: 'Trạng thái', key: 'TT' },

        // Nếu có bảng con, thêm cột cho nó
        { label: 'Mã sản phẩm', key: 'MSP', parentKey: 'subTable' },
        { label: 'Tên sản phẩm', key: 'TSP', parentKey: 'subTable' },
        { label: 'Loại sản phẩm', key: 'LSP', parentKey: 'subTable' },
        { label: 'Màu', key: 'M', parentKey: 'subTable' },
        { label: 'Size', key: 'S', parentKey: 'subTable' },
        { label: 'Số lượng', key: 'SL', parentKey: 'subTable' },
      ];
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (filterStatus.current && !filterStatus.current.contains(e.target)) {
                setShowStatus(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide)

        }
    }, [filterStatus])
    const getAllOrders = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/orders/adminGetAllOrder`)
            if (res) {

                dispatch(setListOrders(res.data.data))

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllOrders();
    }, [])
    useEffect(() => {
        dispatch(filterListOrder(filter))
    }, [filter])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div>
                    <h1>QUẢN LÝ ĐƠN HÀNG</h1>
                    <div style={{ color: '#05CD99' }}>Lalitpur Branch</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('toolbox')}>
                        {/* Filter */}
                        <div className={cx('filter-box')}>
                            <div className={cx('search-box', {
                                'input-focus': inputFocus
                            })}>
                                <AiOutlineSearch className={cx('icon')} />
                                <input onChange={(e) => setFilter(prev => ({ ...prev, textSearch: e.target.value }))} onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} type="text" placeholder="Theo mã, tên khách hàng" className={cx('search-input')} />
                                <AiFillCaretDown className={cx('icon')} />
                            </div>

                            {/* nhóm hàng */}
                            <div ref={filterStatus} className={cx('product-category')} onClick={() => setShowStatus(prev => !prev)}>
                                <div className={cx('function-button')}>
                                    <span className={cx('btn', 'btn-succeed')}>{filter.status || 'Trạng thái'} <AiFillCaretDown /></span>
                                </div>


                                {showStatus && <DropDown items={listStatus} onClick={(item) => setFilter(prev => ({ ...prev, status: item }))} />}
                            </div>

                            {/* Loại hàng */}
                            <div className={cx('product-type')} onClick={handleMouseOverDateFilter}>
                                <div className={cx('function-button')}>
                                    <span className={cx('btn', 'btn-succeed')} >{filter.date || nowDate}<AiFillCaretDown style={{ marginLeft: '4px' }} /></span>
                                </div>
                                <input onChange={handleChangeDateInput} ref={dateInputElement} type="date" style={{ opacity: '0', top: '6px', left: '6px', right: '0', position: 'absolute' }} />




                            </div>

                        </div>

                        {/* function */}
                        <CSVLink filename={"donhang.csv"} data={listOrdersExport} headers={headers} className={cx('btn', 'btn-succeed')} style={{ textDecoration: 'none' }}>Xuất file Excel</CSVLink>

                    </div>

                    <div className={cx('tableView')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    {/* <th className={cx('delete')}></th> */}
                                    <th className={cx('code')}>Mã đơn hàng</th>
                                    <th className={cx('date')}>Thời gian tạo</th>
                                    <th className={cx('customerName')}>Tên khách hàng</th>
                                    <th className={cx('customerPhone')}>Số điện thoại</th>
                                    <th className={cx('province')}>Khu vực giao</th>
                                    <th className={cx('totalPrice')}>Trị giá</th>
                                    <th className={cx('status')}>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>

                                {listOrders.map((item, index) => {
                                    return (
                                        <OrderRow key={index} index={index} getAllOrders={getAllOrders} />
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Orders;