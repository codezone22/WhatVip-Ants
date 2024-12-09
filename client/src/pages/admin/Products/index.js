import classNames from "classnames/bind";
import { AiOutlineSearch, AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import React, { useEffect, useState, createContext } from "react";
import {
    resetCurrentProduct, setListProducts, filterListProductsState, setListProductsState,
    setListProductCategories
} from "~/redux/slices/productSlice";

import ProductRow from "./ProductRow";
import styles from './Products.module.scss'
import Modal from "./Modal";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import baseUrl from '~/utils/baseUrl';
import { useRef } from "react";

const cx = classNames.bind(styles)
export const ModalContext = createContext();
function Products() {
    const dispatch = useDispatch();
    const listProducts = useSelector(state => state.product.listProducts)
    const listProductsState = useSelector(state => state.product.listProductsState)
    const listCategories = useSelector(state => state.product.listCategories)
    const [inputFocus, setInputFocus] = useState(false);
    const [listStatus, setListStatus] = useState(['Tất cả', 'Bán trực tiếp', 'Chưa đăng bán', 'Ngừng kinh doanh'])
    const listProductCategory = ['Tất cả', 'Áo', 'Quần', 'Đồ lót']
    const [listProductType, setListProductType] = useState([]);
    const [filter, setFilter] = useState({
        productType: '',
        productCategory: '',
        status: '',
        searchText: ''

    })
    const [showCategory, setShowCategory] = useState(false)
    const [showType, setShowType] = useState(false)
    const filterTypeElement = useRef(null)
    const filterCategoryElement = useRef(null)
    const filterStatusElement = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [showStatus, setShowStatus] = useState(false)
    const [typeModal, setTypeModal] = useState('');
    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/products/getAllProducts`)
            if (res && res.data) {
                dispatch(setListProducts(res.data.data))
                dispatch(setListProductsState(res.data.data))
                dispatch(filterListProductsState({ filter }));
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const getAllProductCaterogies = async () => {
        try {
            const res1 = await axios.get(`${baseUrl}/api/productCategory/getAllProductCaterogies`)
            const res2 = await axios.get(`${baseUrl}/api/productType/getAllProductType`);
            if (res1 && res1.data && res2 && res2.data) {
                const list = res1.data.data.reduce((acc, cur) => {
                    let tmp = res2.data.data.filter(item => item.productCategory === cur._id);
                    return acc.concat({
                        productCategoryName: cur.productCategoryName,
                        productCategoryId: cur._id,
                        listProductType: [...tmp].map(item => ({ productTypeId: item._id, productTypeName: item.productTypeName }))
                    })
                }, [])
                console.log(list)
                dispatch(setListProductCategories(list))
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getAllProducts()
        getAllProductCaterogies()
    }, [])
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterTypeElement.current && !filterTypeElement.current.contains(event.target)) {
                setShowType(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterTypeElement]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterCategoryElement.current && !filterCategoryElement.current.contains(event.target)) {
                setShowCategory(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterCategoryElement]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterStatusElement.current && !filterStatusElement.current.contains(event.target)) {
                setShowStatus(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterStatusElement]);
    useEffect(() => {
        if (filter.productCategory === '' || filter.productCategory === 'Tất cả') {
            setListProductType(['Tất cả'])
        }
        else {
            setListProductType(prev => {
                const productCategory = listCategories.find(item => item.productCategoryName === filter.productCategory);
                return ['Tất cả'].concat(productCategory.listProductType.map(item => item.productTypeName));
            })
        }
        dispatch(filterListProductsState({ filter }));
    }, [filter])
    useEffect(() => {
        setFilter(prev => ({ ...prev, productType: '' }))
    }, [filter.productCategory])
    return (
        <ModalContext.Provider value={{ setShowModal, setTypeModal }}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div>
                        <h1>QUẢN LÝ SẢN PHẨM</h1>
                        <div style={{ color: '#05CD99' }}>Lalitpur Branch</div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('toolbox')}>
                            <div className={cx('filter-box')}>
                                <div className={cx('search-box', {
                                    'input-focus': inputFocus
                                })}>
                                    <AiOutlineSearch className={cx('icon')} />
                                    <input onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} type="text" placeholder="Theo mã, tên hàng" className={cx('search-input')}
                                        value={filter.searchText} onChange={(e) => setFilter(prev => ({ ...prev, searchText: e.target.value }))} />
                                </div>

                                <div ref={filterCategoryElement} className={cx('product-category')} onClick={() => setShowCategory(prev => !prev)}>
                                    <div className={cx('function-button')}>
                                        <span className={cx('btn', 'btn-succeed')}>{filter.productCategory || 'Nhóm hàng'} <AiFillCaretDown /></span>
                                    </div>


                                    {showCategory && <DropDown items={listProductCategory} onClick={(item) => { setFilter(prev => ({ ...prev, productCategory: item })) }} />}
                                </div>

                                {/* Loại hàng */}
                                <div ref={filterTypeElement} className={cx('product-type')} onClick={() => setShowType(prev => !prev)}>
                                    <div className={cx('function-button')}>
                                        <span className={cx('btn', 'btn-succeed')}>{filter.productType || 'Loại hàng'} <AiFillCaretDown /></span>
                                    </div>

                                    {showType && <DropDown items={listProductType} onClick={(item) => { setFilter(prev => ({ ...prev, productType: item })) }} />}

                                </div>
                                <div ref={filterStatusElement} className={cx('product-type')} onClick={() => setShowStatus(prev => !prev)}>
                                    <div className={cx('function-button')}>
                                        <span className={cx('btn', 'btn-succeed')}>{filter.status || 'Trạng thái'}<AiFillCaretDown /></span>
                                    </div>

                                    {showStatus && <DropDown items={listStatus} onClick={(item) => { setFilter(prev => ({ ...prev, status: item })) }} />}

                                </div>
                            </div>
                            <div className={cx('function-box')}>

                                {/* thêm */}
                                <div className={cx('function-button')}>
                                    <span onClick={() => { dispatch(resetCurrentProduct()); setTypeModal('add'); setShowModal(true) }} className={cx('btn', 'btn-succeed')}><AiOutlinePlus className={cx('icon')} /> Thêm mới</span>
                                </div>


                            </div>
                        </div>
                        <div className={cx('tableView')}>
                            <table className={cx('table')}>
                                <thead className={cx('thead')}>
                                    <tr>
                                        <th className={cx('img')}></th>
                                        <th className={cx('code')}>Mã hàng</th>
                                        <th className={cx('name')}>Tên hàng</th>
                                        <th className={cx('status')}>Trạng thái</th>
                                        <th className={cx('price-buy')}>Giá bán</th>
                                        <th className={cx('price-origin')}>Giá vốn</th>
                                        <th className={cx('quantity')}>Tồn kho</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {listProductsState.map((item, index) => {
                                        return (
                                            <ProductRow key={index} index={index} getAllProducts={getAllProducts} />
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                        {showModal && <Modal setModal={setShowModal}
                            typeModal={typeModal} filter={filter} getAllProducts={getAllProducts}
                            getAllProductCaterogies={getAllProductCaterogies} />}
                    </div>
                </div>
            </div>



        </ModalContext.Provider>
    );
}

export default Products;