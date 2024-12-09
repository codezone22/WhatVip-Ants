import styles from './VoucherItem.module.scss';
import classNames from 'classnames/bind';
// import { useState } from 'react';
const cx = classNames.bind(styles);

function VoucherItem({props, onClickCondition} ) {
    // const [popup, setPopup] = useState(false)
    const convertDate = (d) => {
        const date = new Date(d);

        // Lấy thông tin ngày, tháng, năm
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        // Tạo chuỗi ngày tháng định dạng 'DD-MM-YYYY'
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    return (
        <>
            <div className={cx('outerVoucher')}>
                <div className={cx('halfBubble')}>

                </div>
                <div className={cx('lineBreak')}>
                </div>
                <div className={cx('contentContainer')}>
                    <h1 className={cx('voucherCode')}>
                        {props.voucherCode}
                    </h1>
                    <p className={cx('voucherDes')}>
                        {props.description}
                    </p>
                    <div className={cx('bottomInfo')}>
                        <div className={cx('voucherOutDate')}>
                            HSD: 
                            <span>
                                {convertDate(props.expiredDate)}
                            </span>
                        </div>
                        <span className={cx('condition')} onClick={onClickCondition}>Điều kiện</span>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default VoucherItem;