import { BiSearch } from 'react-icons/bi';
import styles from './style.module.scss'
import classNames from 'classnames/bind';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from '~/utils/baseUrl';
import axios from 'axios';
import CusRow from './CusRow';

const cx = classNames.bind(styles);
const cbb = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Đang hoạt động' },
    { value: 'Block', label: 'Đang bị khóa' }

]

function CustomerManage() {

    const [currentPage, setCurrentPage] = useState(1);
    const [customerList, setCustomerList] = useState([]);
    const [selectedTextFilter, setSelectedTextFilter] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('All')
    const recordPerPages = 10;
    const lastIndex = currentPage * recordPerPages;
    const firstIndex = lastIndex - recordPerPages;
    const npage = Math.ceil(customerList.length / recordPerPages);
    const numbers = [...Array(npage + 1).keys()].slice(1);


    const handleChangeSearchField = (e) => {
        setSelectedTextFilter(e.target.value)
    }
    const handleChangeCombobox = (selectedOption) => {
        setSelectedFilter(selectedOption.value)
    }
    useEffect(() => {
        const getAllBuyers = async () => {
            try {
                const config = {}
                const { data } = await axios.get(`${baseUrl}/api/users/get-all-buyers`, config)
                // console.log(data)
                setCustomerList([...data.result])
            } catch (error) {
                console.log(error)
            }
        }
        getAllBuyers()
    }, [customerList])

    return (
        <div className={cx('wrapper')} >

            <div className={cx('container')}>
                <div>
                    <h1>QUẢN LÝ KHÁCH HÀNG</h1>
                    <div style={{ color: '#05CD99' }}>Lalitpur Branch</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('header-content')}>
                        <div className={cx('search-field')}>
                            <BiSearch fontSize={20} style={{ position: 'absolute', top: '0', left: 0, marginTop: '20px', marginLeft: '18px' }} />
                            <input onChange={e => handleChangeSearchField(e)} type='text' name='searchField' id='searchField' className={cx('search-input')} placeholder='Tìm kiếm' />
                        </div>
                        <Select options={cbb}
                            defaultValue={cbb[0]}
                            onChange={handleChangeCombobox}
                            className={cx('combobox')} />
                    </div>
                    <div style={{ padding: '10px 32px 40px', width: '100%', minHeight: '550px' }}>
                        <table style={{ width: '100%', borderRadius: '10px', borderColor: 'transparent', border: 'none', position: 'relative' }}>
                            <thead className={cx('thead')} style={{ width: '100%', borderRadius: '10px', borderColor: 'transparent', border: 'none', }} >
                                <tr style={{ width: '100%', backgroundColor: '#e6f1fe', color: 'black', borderRadius: '10px' }}>
                                    <th className={cx('col-tbl')} style={{ paddingLeft: '20px' }}>CusID</th>
                                    <th className={cx('col-tbl')}>Tên khách hàng</th>
                                    <th className={cx('col-tbl')}>Số điện thoại</th>
                                    <th className={cx('col-tbl')}>Ngày đăng ký</th>
                                    <th className={cx('col-tbl')}>Tổng giao dịch</th>
                                    <th className={cx('col-tbl')}>Tình trạng</th>
                                    <th className={cx('col-tbl')}>Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody className={cx('tbody')}>
                                {
                                    ((customerList.slice(firstIndex, lastIndex).filter(item => {
                                        if (selectedFilter === 'All') return true
                                        if (selectedFilter === 'Active') return item.isActive
                                        if (selectedFilter === 'Block') return !item.isActive
                                        return true
                                    })).filter(i => {
                                        if (selectedTextFilter.length === 0) return true;
                                        else return (i.fullName.toLowerCase()).includes(selectedTextFilter.toLowerCase())
                                            || (i.phoneNumber.toLowerCase()).includes(selectedTextFilter.toLowerCase())
                                    })).map((item, index) => {
                                        return (
                                            <CusRow key={index} item={item} index={index} currentPage={currentPage} setCustomerList={setCustomerList} />
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', padding: '0 32px 20px', justifyContent: 'space-between' }}>
                        <div>Showing: <span>{recordPerPages}</span> of {customerList.length} entries</div>
                        <nav >
                            <ul className={cx('pagination')} >
                                <li className={cx('page-item')}>
                                    <Link href='#' onClick={prePage}
                                        className={cx('page-link')}>Prev</Link>
                                </li>
                                {
                                    numbers.map((item, index) => (
                                        <li key={index} className={cx(`page-item`, { 'active': currentPage === item })}>
                                            <Link href='#' onClick={() => changeCPage(item)}
                                                className={cx('page-link')}>{item}</Link>
                                        </li>
                                    ))
                                }
                                <li className={cx('page-item')}>
                                    <Link href='#' onClick={nextPage}
                                        className={cx('page-link')}>Next</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
            <footer className={cx("sticky-footer")}>
                <div className={cx("container")}>
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2023</span>
                    </div>
                </div>
            </footer>
        </div>
    );
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
}
export default CustomerManage;