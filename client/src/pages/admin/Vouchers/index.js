import { BiSearch, BiTrash } from 'react-icons/bi';
import styles from './style.module.scss'
import classNames from 'classnames/bind';
import Select from 'react-select';
import { BsEye } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { CustomeButton, Modal } from '~/components';
import { MdAdd } from 'react-icons/md';
import AddVoucher from './AddVoucher';
import EditVoucher from './EditVoucher';
import ViewVoucher from './ViewVoucher';
import axios from 'axios';
import baseUrl from '~/utils/baseUrl';
import convertDate from '~/utils/convertDate';
const cx = classNames.bind(styles);
function Vouchers() {
    const cbb = [
        { value: 'All', label: 'Tất cả' },
        { value: 'Expired', label: 'Còn hạn' },
        { value: 'UnExpired', label: 'Hết hạn' }
    ]
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [selectedTextFilter, setSelectedTextFilter] = useState('')
    const [voucherList, setVoucherList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPages = 10;
    const lastIndex = currentPage * recordPerPages;
    const firstIndex = lastIndex - recordPerPages;
    const npage = Math.ceil(voucherList.length / recordPerPages);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    // set open close modal 
    const [modalAddVoucher, setModalAddVoucher] = useState(false)
    const [modalEditVoucher, setModalEditVoucher] = useState(false)
    const [modalViewVoucher, setModalViewVoucher] = useState(false)
    const [seletedItem, setSetlectedItem] = useState(null)

    const getAllVouchers = async () => {
        try {
            const config = {}
            const { data } = await axios.get(`${baseUrl}/api/vouchers`, config)
            console.log(data)
            setVoucherList([...data.result])
        } catch (error) {
            console.log(error)
        }
    }
    const handleChangeCombobox = (selectedOption) => {
        setSelectedFilter(selectedOption.value)
    }
    const handleChangeSearchField = (e)=>{
        setSelectedTextFilter(e.target.value)
    }
    
    const checkStatus = (item) => {
        if (item.quanlity <= 0) return false;
        const expirationDate = new Date(item.expiredDate);

        // Lấy ngày hôm nay
        const today = new Date();
        if (today > expirationDate) return false;
        return true;
    }

    useEffect(() => {
        getAllVouchers()
    }, [voucherList])
    return (
        <div className={cx('wrapper')} style={{ fontSize: '14px' }}>
            <div className={cx('container')}>
                <div>
                    <h1>QUẢN LÝ KHUYẾN MÃI</h1>
                    <div style={{ color: '#05CD99' }}>Lalitpur Branch</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('header-content')}>
                        <div style={{ display: 'flex' }}>
                            <div className={cx('search-field')}>
                                <BiSearch fontSize={20} style={{ position: 'absolute', top: '0', left: 0, marginTop: '20px', marginLeft: '18px' }} />
                                <input onChange={e=>handleChangeSearchField(e)} type='text' name='searchField' id='searchField' className={cx('search-input')} placeholder='Tìm kiếm' />
                            </div>
                            <Select options={cbb}
                                defaultValue={cbb[0]}
                                onChange={handleChangeCombobox}
                                className={cx('combobox')} />
                        </div>
                        <div onClick={() => setModalAddVoucher(true)}>
                            <CustomeButton className={cx('cus-button')} title={'Thêm Voucher'} icon={<MdAdd fontSize={20} />} isLeft={true} bgHover={'#2f5acf'} textColorHover={'white'} containStyles={{ width: '150px', backgroundColor: 'black', color: 'white', borderRadius: '8px', padding: '10px 10px', marginTop: '6px', marginRight: '12px' }} />
                        </div>
                    </div>
                    <div style={{ padding: '10px 32px 40px', width: '100%', minHeight: '550px' }}>
                        <table style={{ width: '100%', borderRadius: '10px', borderColor: 'transparent', border: 'none', position: 'relative' }}>
                            <thead className={cx('thead')} style={{ width: '100%', borderRadius: '10px', borderColor: 'transparent', border: 'none', }} >
                                <tr style={{ width: '100%', backgroundColor: '#e6f1fe', color: 'black', borderRadius: '10px' }}>
                                    <th className={cx('col-tbl')} style={{ paddingLeft: '20px' }}>VoucherID</th>
                                    <th className={cx('col-tbl')}>Mã Voucher</th>
                                    <th className={cx('col-tbl')}>Gía giảm</th>
                                    <th className={cx('col-tbl')}>Số lượng</th>
                                    <th className={cx('col-tbl')}>Ngày bắt đầu</th>
                                    <th className={cx('col-tbl')}>Ngày hết hạn</th>
                                    <th className={cx('col-tbl')}>Tình trạng</th>
                                    <th className={cx('col-tbl')}>Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody className={cx('tbody')}>
                                {
                                    ((voucherList.slice(firstIndex, lastIndex).filter(item => {
                                        if (selectedFilter === 'All') return true
                                        if (selectedFilter === 'Expired') return checkStatus(item)
                                        if (selectedFilter === 'UnExpired') return !checkStatus(item)
                                        return true
                                    })).filter(i => {
                                        if(selectedTextFilter.length===0) return true;
                                        else return (i.voucherCode.toLowerCase()).includes(selectedTextFilter.toLowerCase()) 
                                    })).map((item, index) => {
                                            return (
                                                <tr key={index} className={cx('row-item')}>
                                                    <td style={{ paddingLeft: '34px', width: '12%' }}>KM{index + (currentPage - 1) * recordPerPages + 1}</td>
                                                    <td style={{ width: '20%' }}>{item.voucherCode}</td>
                                                    <td style={{ width: '13%' }}>{item.isPercent ? `${item.voucherPrice} %` : `${item.voucherPrice} VND`} </td>
                                                    <td style={{ width: '10%' }}>{item.quanlity}</td>
                                                    <td style={{ width: '10%' }}>{convertDate(item.startDate)}</td>
                                                    <td style={{ width: '12%' }}>{convertDate(item.expiredDate)}</td>
                                                    <td style={{ width: '11%' }}>
                                                        <div className={cx({ 'expired-item': !checkStatus(item) }, { 'unExpired-item': checkStatus(item) })}>
                                                            {!checkStatus(item) ? 'Hết hạn' : 'Còn hạn'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex' }}>
                                                            <button style={{ marginRight: '4px' }} onClick={() => { setModalEditVoucher(true); setSetlectedItem(item) }}>
                                                                <AiOutlineEdit fontSize={20} color='blue' />
                                                            </button>
                                                            <button style={{ marginRight: '4px' }} onClick={() => { setModalViewVoucher(true); setSetlectedItem(item) }}>
                                                                <BsEye fontSize={20} color='blue' />
                                                            </button>
                                                            <button>
                                                                <BiTrash fontSize={20} color='red' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'flex', padding: '0 32px 20px', justifyContent: 'space-between' }}>
                        <div>Showing: <span>{recordPerPages}</span> of {voucherList.length} entries</div>
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
            <footer className={cx("sticky-footer")} style={{ zIndex: 10 }}>
                <div className={cx("container")}>
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2023</span>
                    </div>
                </div>
            </footer>
            <Modal visible={modalAddVoucher} setModal={setModalAddVoucher}>
                <AddVoucher closeFunc={setModalAddVoucher} setVoucherList={setVoucherList} />
            </Modal>
            <Modal visible={modalEditVoucher} setModal={setModalEditVoucher}>
                <EditVoucher item={seletedItem} closeFunc={setModalEditVoucher} setVoucherList={setVoucherList} />
            </Modal>
            <Modal visible={modalViewVoucher} setModal={setModalViewVoucher}>
                <ViewVoucher item={seletedItem} />
            </Modal>
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
export default Vouchers;