import classNames from "classnames/bind";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import baseUrl from '~/utils/baseUrl';
import axios from "axios";
import convertDate from "~/utils/convertDate";
import styles from './RentalImport.module.scss'
import RentalImportRow from "./RentalImportRow";
import { CSVLink} from 'react-csv'
import formatMoney from "~/utils/formatMoney";

const cx = classNames.bind(styles)

function RentalImport() {
    const [inputFocus, setInputFocus] = useState(false);
    const [listImport,setListImport] = useState([])
    const [listImportOrigin,setListImportOrigin] = useState([])
    const [listImportExport,setListImportExport] = useState([])
    const dateInputElement = useRef(null);
    const nowDate = convertDate(new Date()).substring(3);

    const [filter,setFilter] = useState({
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
    const handleChangeDateInput = (e) => {
        let value = e.target.value;
        if (!value) {
            setFilter(prev => ({...prev, date: ''}))
            return;
        }
        const res = convertDate2(value);

        setFilter(prev => ({...prev, date: res}))

    }
    const getAllImports = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/importProduct/getAllImports`)
            if (res) {
                const list = res.data.data.map((item,index) => {
                    console.log(item.date)
                    const date = convertDate(item.date)
                    return {
                        ...item,
                        date,
                        productQuantity: item.listImportProducts.length,
                        itemQuantity: item.listImportProducts.reduce((acc,cur) => acc + cur.quantity,0),
                        listImportProducts: [...item.listImportProducts].reduce((acc,cur) => {
                            const tmp = cur.colors.reduce((acc2,cur2) => {
                                const tmp2 = cur2.sizes.reduce((acc3,cur3) => {
                                    return acc3.concat({
                                        productName: cur.productName,
                                        productCode: cur.productCode,
                                        productType: cur.productType,
                                        color: cur2.colorName,
                                        size: cur3.sizeName,
                                        quantity: cur3.quantity,
                                        unitPriceImport: cur.unitPriceImport,
                                    })
                                },[])
                                return acc2.concat(tmp2)
                            },[])
                            return acc.concat(tmp)
                        },[])

                    }
                })
                console.log(res.data.data)
                setListImport([...list])
                setListImportOrigin([...list])
                
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getAllImports()
    },[])

    useEffect(() => {
        setFilter(prev => ({...prev, date: ''}))
    }, [])
    useEffect(() => {
        let tmp = [...listImportOrigin]
        if (filter.date!=='') {
            tmp = tmp.filter(item => item.date.substring(3) === filter.date)
        }
        if (filter.textSearch.trim()!=='') {
            tmp = tmp.filter(item => ('#' + item._id).includes(filter.textSearch.trim()))
        }
        setListImport([...tmp])
    },[filter])
    useEffect(() => {
        console.log(listImport)
        setListImportExport(prev => {
           
            const nextState = [];
            [...listImport].forEach(row => {
                nextState.push({
                            'MPN': '#' + row._id.substring(12),
                            'NN': row.date,
                            'SSPN': row.productQuantity,
                            'SMHN': row.itemQuantity,
                            'TTH': formatMoney(row.totalMoneyGoods),
                })
                row.listImportProducts.forEach(subRow => {
                    nextState.push({
                        'MSP': subRow.productCode,
                        'TSP': subRow.productName,
                        'L': subRow.productType,
                        'M': subRow.color,
                        'S': subRow.size,
                        'SL': subRow.quantity,
                        'DGN': formatMoney(subRow.unitPriceImport),
                        'TT': formatMoney(subRow.unitPriceImport*subRow.quantity)
                    })
                })
            })
            return nextState
        })
    },[listImport])
    const headers = [
        { label: 'Mã phiếu nhập', key: 'MPN' },
        { label: 'Ngày nhập', key: 'NN' },
        { label: 'Số sản phẩm nhập', key: 'SSPN' },
        { label: 'Số mặt hàng nhập', key: 'SMHN' },
        { label: 'Tổng tiền', key: 'TTH' },

        // Nếu có bảng con, thêm cột cho nó
        { label: 'Mã sản phẩm', key: 'MSP', parentKey: 'subTable' },
        { label: 'Tên sản phẩm', key: 'TSP', parentKey: 'subTable' },
        { label: 'Loại', key: 'L', parentKey: 'subTable' },
        { label: 'Màu', key: 'M', parentKey: 'subTable' },
        { label: 'Size', key: 'S', parentKey: 'subTable' },
        { label: 'Số lượng', key: 'SL', parentKey: 'subTable' },
        { label: 'Đơn giá nhập', key: 'DGN', parentKey: 'subTable' },
        { label: 'Thành tiền', key: 'TT', parentKey: 'subTable' },
      ];
    return (

        <div className={cx('wrapper')} >
            <div className={cx('container')}>
                <div>
                    <h1>QUẢN LÝ LỊCH SỬ</h1>
                    <div style={{ color: '#05CD99' }}>Lalitpur Branch</div>
                </div>
                <div className={cx('tabpanel')}>
                    <div className={cx('tabpanel-item')}>
                        <Link to="/admin/history/bill" style={{textDecoration: 'none', color: '#000'}}>Hóa đơn</Link>
                    </div>
                    <div className={cx('tabpanel-item', 'active')}>
                        Nhập hàng
                    </div>
                </div>
                <div className={cx('content-total')}>
                    <div className={cx('content')}>
                        <div className={cx('wrapper-body')}>
                            <div className={cx('toolbox')}>
                                {/* Filter */}
                                <div className={cx('filter-box')}>
                                    <div className={cx('search-box', {
                                        'input-focus': inputFocus
                                    })}>
                                        <AiOutlineSearch className={cx('icon')} />
                                        <input onChange={(e) => setFilter(prev => ({...prev,textSearch: e.target.value }))} onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} type="text" placeholder="Theo mã phiếu nhập" className={cx('search-input')} />
                                        <AiFillCaretDown className={cx('icon')} />
                                    </div>


        
                                    <div className={cx('product-type')} onClick={handleMouseOverDateFilter}>
                                        <div className={cx('function-button')}>
                                            <span className={cx('btn', 'btn-succeed')} >{filter.date || nowDate}<AiFillCaretDown style={{ marginLeft: '4px' }} /></span>
                                        </div>
                                        <input onChange={handleChangeDateInput} ref={dateInputElement} type="month" style={{ opacity: '0', top: '6px', left: '6px', right: '0', position: 'absolute' }} />

                                    </div>
                                </div>

                                <CSVLink filename={"phieunhap.csv"} headers={headers} data={listImportExport} className={cx('btn','btn-succeed')} style={{textDecoration: 'none'}}>Xuất file Excel</CSVLink>
                            </div>

                            <div className={cx('tableView')}>
                                <table className={cx('table')}>
                                    <thead className={cx('thead')}>
                                        <tr>
                                            {/* <th className={cx('delete')}></th> */}
                                            <th className={cx('code')}>Mã phiếu nhập</th>
                                            <th className={cx('date')}>Thời gian</th>
                                            <th className={cx('productQuantity')}>Số sản phẩm</th>
                                            <th className={cx('itemQuantity')}>Số mặt hàng</th>
                                            <th className={cx('totalPrice')}>Tổng tiền</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {listImport.map((item, index) => {
                                            return (
                                                <RentalImportRow key={index} itemImport={item}/>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default RentalImport;