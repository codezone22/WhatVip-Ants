import styles from './Addresses.module.scss'
import classNames from 'classnames/bind';
import AddressItem from './AddressItem';
import AddressPopup from './AddressPopup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteAddresses, getAllAddresses } from '~/redux/api/userRequest';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);

function Addresses({payment, onClickAddress}) {
    const [popup, setPopup] = useState(undefined)
    const [isAdd, setIsAdd] = useState(true)
    const [selected, setSelected] = useState({})
    const [reload, setReload] = useState(false)

    const dispatch = useDispatch()
    let currentUser = useSelector((state) => state.auth.login.currentUser)
    let addresses = useSelector((state) => state.user.address?.addresses)

    useEffect(() => {
        getAllAddresses(currentUser, dispatch)
    }, [])

    const onCloseAndReload = (res) => {
        setPopup(false)
        notify("success", res?.data?.message)
        getAllAddresses(currentUser, dispatch)
    }

    const deleteItem = (item) => {
        if(item.default) {
            notify("warning", "Không thể xóa địa chỉ mặc định")
            return;
        }
        deleteAddresses(currentUser, item, dispatch, (res) => {
            getAllAddresses(currentUser, dispatch)
            notify("success", "Xóa địa chỉ thành công")
        })
    }

    const notify = (type, message) => toast(message, { type: type });
    return ( 
        <>
            <ToastContainer />
            <div className={cx('container')}>
            <Link to={'/user-profile'} className={cx('account-page__icon')}>
                    <BiArrowBack /> 
                </Link>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h1 className={cx('account-page__title')}>Địa chỉ của tôi</h1>
                    <div className={cx('account-info__btn')} onClick={() => {setIsAdd(true); setReload(!reload); setPopup(true)}}>
                        <span className={cx('account-info__btn-text')}>Thêm địa chỉ mới</span>
                    </div>
                </div>
                <hr style={{width: '100%', height: '1px', backgroundColor: '#e1e1e1'}}></hr>
                <div className={cx('outerAddresses')}>
                    {
                        addresses?.map((item, index) => <div key={index} style={{position: 'relative'}}>
                            <AddressItem props={item} onClickUpdate={()=>{setSelected(item);setReload(!reload); setIsAdd(false); setPopup(true)}}  onClickDelete={() => deleteItem(item)}/>
                            {
                                payment && <div className={cx('account-info__btn')} style={{position: 'absolute', bottom: '20px', right: 0}} onClick={() => {onClickAddress(item)}}>
                                <span className={cx('account-info__btn-text')}>Chọn</span>
                            </div>
                            }
                            <hr style={{width: '100%', height: '1px', backgroundColor: '#e1e1e1'}}></hr>
                        </div>)
                    }
                </div>
                <div className={cx('overLay', `${popup ? 'popMask' : ''}`)} onClick={() => setPopup(false)}></div>
                <div className={cx('outerPopup', `${popup === true ? 'pop' : popup === false ? 'down' : ''}`)}>
                    <AddressPopup props={isAdd ? undefined : selected} isAdd={isAdd} list={addresses} onClose={() => setPopup(false)} reload={reload} onCloseAndReload={onCloseAndReload}/>
                </div>
            </div>
        </>
    );
}

export default Addresses;