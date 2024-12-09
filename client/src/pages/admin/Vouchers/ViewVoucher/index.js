import styles from './ViewVoucher.module.scss';
import { HiOutlineInformationCircle } from 'react-icons/hi'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
function ViewVoucher({ item }) {
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
    const checkStatus = (item) => {
        if (item.quanlity <= 0) return false;
        const expirationDate = new Date(item.expiredDate);

        // Lấy ngày hôm nay
        const today = new Date();
        if (today < expirationDate) return false;
        return true;
    }
    return (
        <div className={cx('wrapper')} style={{ animation: 'dropTop .3s linear' }}>
            <div style={{ fontWeight: 500, fontSize: '18px', marginBottom: '20px', backgroundColor: 'black', color: 'white', padding: '8px', width: '15%', borderRadius: '4px' }}>Xem Voucher</div>
            <div style={{ display: 'flex', alignItems: 'end' }}>
                <div style={{ paddingLeft: '4rem', marginBottom: '8px' }}>
                    <img src={item.voucherImage} alt='avtVoucher' style={{ width: '200px', height: '140px' }} />
                </div>
            </div>
            <div style={{ padding: '2rem 4rem 2.5rem 4rem', width: '100%' }}>
                <div className={cx('row-input')} >
                    <div className={cx('input-field-left')} >
                        <div className={cx('label-input')}>Mã giảm giá <HiOutlineInformationCircle fontSize={'18px'} /> </div>
                        <div className={cx('input')}>{item.voucherCode}</div>
                    </div>
                    <div className={cx('input-field-right')} >
                        <div className={cx('label-input')}>Số lượng <HiOutlineInformationCircle fontSize={'18px'} /> </div>
                        <div className={cx('input')}>{item.quanlity}</div>
                    </div>
                </div>
                <div className={cx('row-input')} >
                    <div style={{ width: '55%', display: 'flex', flexDirection: 'row' , alignItems:'center'}}>
                        <label htmlFor='isPercent' className={cx('label-input')}>Giảm theo % <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                        <input name='isPercent' style={{marginLeft:'-28px'}} checked={item.isPercent} id='isPercent' type='checkbox'  />
                    </div>
                </div>
                <div className={cx('row-input')} >
                    <div className={cx('input-field-left')} >
                        <div className={cx('label-input')}>Giá được giảm <HiOutlineInformationCircle fontSize={'18px'} /> </div>
                        <div className={cx('input')}>{item.voucherPrice} {item.isPercent?'%':'VNĐ'}</div>
                    </div>
                    <div className={cx('input-field-right')} >
                        <div className={cx('label-input')}>Giá trị tối thiểu <HiOutlineInformationCircle fontSize={'18px'} /> </div>
                        <div className={cx('input')}>{item.minPrice} VNĐ</div>
                    </div>
                </div>
                <div className={cx('row-input')} >
                    <div className={cx('input-field-left')} >
                        <div className={cx('label-input')}>Ngày bắt đầu <HiOutlineInformationCircle fontSize={'18px'} /> </div>
                        <div className={cx('input')}>{convertDate(item.startDate)}</div>
                    </div>
                    <div className={cx('input-field-right')} >
                        <div className={cx('label-input')}>Ngày kết thúc <HiOutlineInformationCircle fontSize={'18px'} /> </div>
                        <div className={cx('input')}>{convertDate(item.expiredDate)}</div>
                    </div>
                </div>
                <div className={cx('row-input')} >
                    <div className={cx('input-field-left')} >
                        <label htmlFor='statusVoucher' className={cx('label-input')}>Trạng thái <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                        <div className={cx({ 'expired-item': checkStatus(item) }, { 'unExpired-item': !checkStatus(item) })}>
                            {checkStatus(item)?'Hết hạn':"Còn hạn"}
                        </div>
                    </div>
                    <div className={cx('input-field-right')} >
                        <div className={cx('label-input')}>Áp dụng cho <HiOutlineInformationCircle fontSize={'18px'} /> </div>
                        <div style={{borderBottom:'none'}} className={cx('input')}>{item?.applyFor === 'new' ? 'Khách hàng mới' : item?.applyFor === 'close' ? 'Khách hàng thân thiết' :'Tất cả'}</div>
                    </div>
                </div>
                <div className={cx('row-input')} style={{height: 'auto'}} >
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }} >
                        <div className={cx('label-input')}>Mô tả <HiOutlineInformationCircle fontSize={'18px'} /> </div>
                        <textarea rows={4} name='description' id='description' type='text' value={item.description} disabled placeholder='Sale ngày phụ nữ việt nam. Áp dụng để giảm tiền trực tiếp cho đơn hàng!' style={{ marginTop: '12px', border: '1px solid #ccc', padding: '8px' }} />
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ViewVoucher;