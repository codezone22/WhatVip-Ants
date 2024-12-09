import { Link } from 'react-router-dom';
import styles from './VoucherItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function VoucherItem({voucherCode, voucherDes, voucherOutDate} ) {
    
    return (
        <>
            <div className={cx('outerVoucher')}>
                <div className={cx('halfBubble')}>

                </div>
                <div className={cx('lineBreak')}>
                </div>
                <div className={cx('contentContainer')}>
                    <h1 className={cx('voucherCode')}>
                        {voucherCode}
                    </h1>
                    <p className={cx('voucherDes')}>
                        {voucherDes}
                    </p>
                    <div className={cx('voucherOutDate')}>
                        HSD: 
                        <span>
                            {voucherOutDate}
                        </span>
                    </div>
                    <div>
                        <div className={cx('buttonApply')}>
                            <span className={cx('textButtonApply')}>Sử dụng ngay</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VoucherItem;