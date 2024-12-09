import { useState } from 'react';
import VoucherItem from './VoucherItem/VoucherItem';
import VoucherPopup from './VoucherPopup';
import styles from './Vouchers.module.scss'
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
const cx = classNames.bind(styles);

function Vouchers({onClickVoucher}) {
    let currentUser = useSelector((state) => state.auth.login.currentUser)
    const [popup, setPopup] = useState(undefined)
    const [selected, setSelected] = useState({voucherCode: 'concec'})
    return ( 
        <>
            <div className={cx('container')}>
                <Link to={'/user-profile'} className={cx('account-page__icon')}>
                    <BiArrowBack /> 
                </Link>
                <h1 className={cx('account-page__title')}>Ví voucher</h1>
                <div className={cx('outerVouchers')}>
                    {/* List Vouchers */}
                    {
                        currentUser.vouchers.map((item, index) => {
                            return (
                                <div style={{margin: '5px 10px', cursor: onClickVoucher ? 'pointer': ''}} key={index} 
                                onClick={() =>{ if(onClickVoucher) onClickVoucher(item)}}
                                >
                                    <VoucherItem props={item} onClickCondition={() => {setSelected(item); setPopup(true);}} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className={cx('vouchers-footer')}>
                    {/* <img style={{width: '100%'}} src="https://mcdn.coolmate.me/image/September2023/mceclip0_96.jpg" alt=""/>  */}
                    <div className={cx('vouchers-footer__content')}>
                        <h3 className={cx('content')}>Nhiều ưu đãi hấp dẫn<br/>đang chờ bạn</h3> 
                        <div className={cx('btn', 'account-info__btn')}>Khám phá ngay</div>
                    </div>
                </div>
                <div className={cx('overLay', `${popup ? 'popMask' : ''}`)} onClick={() => setPopup(false)}></div>
                <div className={cx('outerPopup', `${popup === true ? 'pop' : popup === false ? 'down' : ''}`)}>
                    <VoucherPopup props={selected} onClose={() => setPopup(false)}/>
                </div>
            </div>
        </>
    );
}

export default Vouchers;