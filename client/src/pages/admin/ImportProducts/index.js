import classNames from "classnames/bind";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineSearch, AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import React from "react";
import axios from "axios";
import baseUrl from '~/utils/baseUrl';
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import convertDate from "~/utils/convertDate2";


import styles from './ImportProducts.module.scss'
import DropDownImport from "./DropDownImport";
import ImportProductRow from "./ImportProductRow";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { addIntoListImportProducts, setListImportProducts, handleChangeDiscount } from "~/redux/slices/importProductsSlice";

const cx = classNames.bind(styles)

function ImportProducts() {
    const listImportProducts = useSelector(state => state.importProduct.listImportProducts)
    const totalMoneyGoods = useSelector(state => state.importProduct.totalMoneyGoods)
    const discount = useSelector(state => state.importProduct.discount)
    const finalMoney = useSelector(state => state.importProduct.finalMoney)
    const Import = useSelector(state => state.importProduct)
    const location = useLocation();
    const dispatch = useDispatch();

    const [indexItemImport, setIndexItemImport] = useState(-1);
    const [inputFocus, setInputFocus] = useState(false);
    const [openModelImport, setOpenModalImport] = useState(false)
    const [showContract, setShowContract] = useState(true)
    const [isClickFromDropDown, setClickFromDropDown] = useState(false);
    const inputElement = useRef(null);
    const dropElement = useRef(null);
    const [formErrors, setFormErrors] = useState({})
    const dateNow = convertDate(new Date())
    const validateForm = () => {
        let isValid = true;
        const errors = {};


        for (let i = 0; i < listImportProducts.length; i++) {
            if (!(/^\d+$/.test(listImportProducts[i].unitPriceImport.trim()))) {
                errors.unitPriceImport = `Giá nhập sản phẩm thứ ${i + 1} phải là một số >=0`
            }
            if (listImportProducts[i].colors[0].colorName === '') {
                errors.colors = `Vui lòng điền thông tin nhập hàng của sản phẩm thứ ${i + 1} `
            }
        }


        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            isValid = false
        }
        else setFormErrors({})
        return isValid;

    }
    const validateForm2 = () => {
        let isValid = true;
        const errors = {};


        for (let i = 0; i < listImportProducts.length; i++) {
            if (!(/^\d+$/.test(listImportProducts[i].unitPriceImport.trim()))) {
                errors.unitPriceImport = `Giá nhập sản phẩm thứ ${i + 1} phải là một số`
            }
            if (listImportProducts[i].colors[0].colorName === '') {
                errors.colors = `Vui lòng điền thông tin nhập hàng của sản phẩm thứ ${i + 1} `
            }
        }


        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            isValid = false
        }
        else setFormErrors({})
        return isValid;

    }
    const [listSearchProducts, setListSearchProducts] = useState([

    ])
    const handleClickItemSearch = (item) => {
        if (item.colors.length === 0 || item.colors[0].sizes.length === 0) {
            toast.error('Sản phẩm hiện chưa có mặt hàng nào để nhập hàng')
            return;
        }
        dispatch(addIntoListImportProducts(item))
        setInputFocus(false)

    }

    const handleChangeSearch = async (e) => {
        setInputFocus(true);
        const value = e.target.value
        if (value.trim() === '') {
            setListSearchProducts([])
            return;
        }
        try {
            const res = await axios.post(`${baseUrl}/api/importProduct/getProductsByKey`, { key: value })
            if (res) {

                setListSearchProducts(res.data.data)
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        dispatch(setListImportProducts(location.state))
    }, [])
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropElement.current && !dropElement.current.contains(e.target)) {
                setInputFocus(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropElement])
    const handleClickAcceptImport = async () => {
        if (discount.trim() !== '' && !(/^\d+$/.test(discount.trim()))) {
            setFormErrors(prev => ({ ...prev, discount: 'Giá giảm phải là một số' }))
            return;
        }


        try {
            const res = await axios.post(`${baseUrl}/api/importProduct/addImport`, {
                ...Import,
                discount: Number(discount)
            })
            if (res) {
                console.log(res.data)
                toast.success('Nhập hàng thành công!')
                setTimeout(() => {
                    window.location.href = '/admin/products'
                }, 1000)
            }
        } catch (error) {

        }
    }
    const handleClickAcceptOne = () => {
        let valid = validateForm();
        if (valid) {
            setShowContract(false)
        }

    }
    return (
        <div className={cx('wrapper')}>
            <ToastContainer
                position='top-right'
                autoClose={1000}
                hideProgressBar={true}
                draggable={false}
            />
            <div style={{ flex: '1' }}>
                <div className={cx('toolbox')}>

                    <div className={cx('title-import')}>
                        <Link to="/admin/products" className={cx('icon')}><IoArrowBack /></Link>
                        <span>  Nhập hàng</span>
                    </div>
                    {/* Filter */}
                    <div className={cx('filter-box')}>
                        <div className={cx('search-box', {
                            'input-focus': inputFocus
                        })}>
                            <AiOutlineSearch className={cx('icon')} />
                            <input onChange={handleChangeSearch} ref={inputElement} type="text" placeholder="Theo mã, tên hàng" className={cx('search-input')} />

                        </div>
                        {inputFocus &&
                            <div ref={dropElement}>
                                <DropDownImport items={listSearchProducts} onClick={handleClickItemSearch} />
                            </div>
                        }
                    </div>

                    <div onClick={handleClickAcceptOne} style={{ marginLeft: '32px' }} >

                        <span className={cx('btn', 'btn-succeed')}>Xác nhận nhập hàng</span>
                    </div>

                </div>

                <div className={cx('tableView')}>
                    {formErrors.unitPriceImport && <p style={{ color: 'red' }}>{formErrors.unitPriceImport}</p>}
                    {formErrors.colors && <p style={{ color: 'red' }}>{formErrors.colors}</p>}
                    <table className={cx('table')}>
                        <thead className={cx('thead')}>
                            <tr>
                                <th className={cx('delete')}></th>
                                <th className={cx('stt')}>STT</th>
                                <th className={cx('code')}>Mã hàng</th>
                                <th className={cx('name')}>Tên hàng</th>
                                <th className={cx('quantity')}>Số lượng</th>
                                <th className={cx('unitPrice')}>Đơn giá</th>
                                <th className={cx('price')}>Thành tiền</th>
                                <th className={cx('import')}></th>
                            </tr>
                        </thead>
                        <tbody>

                            {listImportProducts.map((item, index) => {
                                return (
                                    <ImportProductRow key={index} index={index} setModal={setOpenModalImport}
                                        setIndexItemImport={setIndexItemImport}
                                        listImportsLength={listImportProducts.length} />
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                {openModelImport && <Modal setModal={setOpenModalImport} indexItemImport={indexItemImport} />}
            </div>
            <div style={{ position: 'fixed', top: '0', left: '0', bottom: '0', right: '0', display: showContract && 'none', backgroundColor: 'rgba(4,4,4,0.3)' }}>
                <div className={cx('import-contract', { hide: showContract })}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className={cx('button-right')} onClick={() => setShowContract(prev => !prev)}>
                            <FaAngleRight className={cx('icon-right')} />
                        </div>

                        <div>
                            <span className={cx('time')} style={{ marginRight: '4px' }}>{dateNow}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <div className={cx('form-group')} >
                            <label>Mã phiếu nhập</label>
                            <input type="text" style={{ width: '140px', background: 'transparent' }} value={'Mã phiếu tự động'} disabled />
                        </div>

                        <div className={cx('form-group')}>
                            <label>Trạng thái</label>
                            <span className={cx('text')}>Chờ xác nhận</span>
                        </div>

                        <div className={cx('form-group')}>
                            <label>Tổng tiền hàng</label>
                            <span className={cx('text')} style={{ textAlign: 'right' }}>{totalMoneyGoods + ' VNĐ'}</span>
                        </div>

                        <div className={cx('form-group')}>
                            <label>Giảm giá</label>
                            <div style={{ width: '140px', display: 'inline-block' }}>
                                <input onChange={(e) => dispatch(handleChangeDiscount({ discount: e.target.value }))} value={discount} className={cx('text')} type="text" style={{ width: '100px', background: 'transparent', textAlign: 'right', marginRight: '8px' }} />
                                <span>VNĐ</span>
                            </div>
                        </div>
                        {formErrors.discount && <p style={{ color: 'red' }}>{formErrors.discount}</p>}

                        <div className={cx('form-group')}>
                            <label>Thành tiền</label>
                            <span className={cx('text')} style={{ textAlign: 'right', fontWeight: 'bold' }}>{finalMoney + ' VNĐ'}</span>
                        </div>

                        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
                            <span onClick={handleClickAcceptImport} className={cx('btn', 'btn-succeed')} style={{ fontSize: '16px', padding: '10px 24px' }}>Hoàn tất <BsCheckLg style={{ marginLeft: '4px', fontSize: '20px' }} /></span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default ImportProducts;