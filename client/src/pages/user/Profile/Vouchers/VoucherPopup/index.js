import { useEffect, useState } from 'react';
import styles from './VoucherPopup.module.scss'
import classNames from 'classnames/bind';
import { AiOutlineClose } from 'react-icons/ai';
const cx = classNames.bind(styles);

function VoucherPopup({props, onClose}) {
    const [selected, setSelected] = useState({})
    useEffect(() => {
        setSelected(props ? props : {
            description: '',
            startDate: '',
            expiredDate: '',
            voucherCode: '',
            minPrice: '',
        })
    }, [props])
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
            <div className={cx('container')}>
                <div className={cx('btnClose')} onClick={onClose}>
                    <AiOutlineClose/>
                </div>
                <div className={cx('outer')}>
                    <h1 className={cx('voucherCode')}>{selected.voucherCode}</h1>
                    <div className={cx('outerInfo')}>
                        <h2 className={cx('infoTitle')}>
                            Chi tiết
                        </h2>
                        <p className={cx('infoContent')}>
                            {selected.description}
                        </p>
                    </div>
                    <div className={cx('outerInfo')}>
                        <h2 className={cx('infoTitle')}>
                            Thời gian áp dụng
                        </h2>
                        <p className={cx('infoContent')}>
                            {`${convertDate(selected.startDate)} - ${convertDate(selected.expiredDate)}`}
                        </p>
                    </div>
                    <div className={cx('outerInfo')}>
                        <h2 className={cx('infoTitle')}>
                            Điều kiện
                        </h2>
                        <p className={cx('infoContent')}>
                            Áp dụng với đơn hàng trên {selected.minPrice} d
                        </p>
                    </div>
                    {/* <div className={cx('outerInfo')}>
                        <h2 className={cx('infoTitle')}>
                            Không áp dụng với
                        </h2>
                        <p className={cx('infoContent')}>
                            Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé!
                            Tặng 01 Quần lót Trunk Cotton cho đơn hàng 259K (Không áp dụng cho sản phẩm SALE)
                        </p>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default VoucherPopup;