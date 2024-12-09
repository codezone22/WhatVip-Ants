import { Link } from 'react-router-dom';
import styles from './VoucherItem.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
const cx = classNames.bind(styles);

function VoucherItem({props, onClickVoucher, active} ) {
    const [popup, setPopup] = useState(false)
    return (
        <>
            <div className={cx('outerVoucher')} style={active ? {backgroundColor: '#2f5acf', color: 'white'} : {}} onClick={onClickVoucher}>
                <div className={cx('halfBubble')}>

                </div>
                <div className={cx('lineBreak')} style={active? {borderRight: '1px dashed white'} : {}}>
                </div>
                <div className={cx('contentContainer')} style={active ? {color: 'white'} : {}}>
                    <h1 className={cx('voucherCode')}>
                        {props.voucherCode}
                    </h1>
                    <p className={cx('voucherDes')}>
                        {props.description}
                    </p>
                </div>
                
            </div>
        </>
    );
}

export default VoucherItem;