import { AccountIcon, vnpayIcon, momoIcon, codIcon, zaloPayIcon, qaCodeIcon } from '~/assets/icons';
import styles from './PaymentForm.module.scss'
import classNames from 'classnames/bind';
import { useState } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function PaymentForm({handlePayment}) {
    const paymentItems = [ 
        {
            id: 1,
            key: 'COD',
            icon: <img style={{margin: '0px 20px', height: '35px'}} src={codIcon} alt=''/>,
            name: "COD",
            des: "Thanh toán khi nhận hàng"
        },
        {
            id: 2,
            key: 'VNPAY',
            icon:  <img style={{margin: '0px 20px', height: '12px'}} src={vnpayIcon} alt=''/>,
            name: "Ví điện tử VNPAY / VNPAY QR"
        },
        {
            id: 3,
            key: 'MoMo',
            icon: <img style={{margin: '0px 20px', height: '35px'}} src={momoIcon} alt=''/>,
            name: "Thanh toán Momo"
        },
        {
            id: 4,
            key: 'ZaloPay',
            icon: <img style={{margin: '0px 20px', height: '18px'}} src={zaloPayIcon} alt=''/>,
            name: "Ví điện tử ZaloPay",
            des: "Thẻ ATM / Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card)"
        },
        {
            id: 5,
            key: 'QR Code',
            icon:  <img style={{margin: '0px 20px', height: '36px', borderRadius: '3px'}} src={qaCodeIcon} alt=''/>,
            name: "Chuyển khoản liên ngân hàng bằng QR Code",
            des: "Chuyển tiền qua ví điện tử (MoMo, Zalopay,...)"
        },
    ]
    let [selected, setSelected] = useState(paymentItems[0]);
    return ( 
        <>
            {
                paymentItems.map((item, index) => {
                    return <>
                        <div className={cx('outer', item.id === selected.id ? 'outline' : '')} onClick={() => {setSelected(item)}}>
                            <div className={cx('dot_outer', item.id === selected.id ? 'outline_dot' : '')}>
                                <div className={cx(item.id === selected.id ? 'dot' : '')}></div>
                            </div>
                            <div className={cx('icon', item.id === selected.id ? 'opacity_1' : '')}>
                                {item.icon}
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('title')}>
                                    {item.name}
                                </div>
                                <div className={cx('des')}>
                                    {item.des}
                                </div>
                            </div>
                        </div>
                    </>
                })
            }
            
            <div>
                <div className={cx('account-info__btn')} onClick={() => handlePayment(selected)}>
                    <span className={cx('account-info__btn-text')}>{`Thanh toán ${selected.key ? "(" + selected.key + ")" : ''}`}</span>
                </div>
            </div>
        </>
    );
}

export default PaymentForm;