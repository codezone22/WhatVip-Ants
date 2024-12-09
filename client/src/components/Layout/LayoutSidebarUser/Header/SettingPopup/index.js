import { Link } from 'react-router-dom';
import styles from './SettingPopup.module.scss';
import classNames from 'classnames/bind';
import { VoucherIcon, LocationIcon, AccountIcon, OrderIcon, RatingIcon, QuestionIcon } from '~/assets/icons';
import VoucherItem from './VoucherItem/VoucherItem';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function SettingPopup({closeBtn}) {
    let currentUser = useSelector((state) => state.auth.login.currentUser)
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
    const settingItems = [{icon: VoucherIcon, label: 'Ví Voucher', to:'/user-profile/vouchers'}, {icon: OrderIcon, label: 'Lịch sử đơn hàng', to:'/user-profile/orders'}, {icon: LocationIcon, label: 'Sổ địa chỉ', to:'/user-profile/addresses'}, {icon: AccountIcon, label: 'Cài đặt tài khoản', to:'/user-profile/info'}, {icon: RatingIcon, label: 'Đánh giá và phản hồi', to:'/user-profile/reviews'}, {icon: QuestionIcon, label: 'FAQ & Chính sách', to:'/user-profile/policies'}];
    return (
        <>
            <div className={cx('container')}>
                <h1 className={cx('greetHeader')}>Hi, Khách Hàng</h1>
                <div className={cx('popupContentContainer')}>
                    <div className={cx('vouchersContainer')}>
                        <h1 className={cx('titleVoucher')}>Ưu đãi dành riêng cho bạn</h1>
                        <div className={cx('outerVouchers')}>
                            {/* List Vouchers */}
                            {
                                currentUser?.vouchers.map((item, index) => {
                                    return (
                                        <div key={index} style={{margin: '0 10px'}}>
                                            <VoucherItem  voucherCode={item.voucherCode} voucherDes={item.description} voucherOutDate={convertDate(item.expiredDate)}/>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <div className={cx('outerSetting')}>
                            {/* List items setting */}
                            {
                                settingItems.map((item, index) => {
                                    return (
                                        <Link to={item.to} key={index} style={{cursor: 'pointer', width: '128px', borderRadius: '10px', padding: '15px 20px', margin: '7px', backgroundColor: '#f1f1f1', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <div style={{width: '40px', height: '40px'}}>
                                                <img style={{width: '100%', height: '100%'}} src={item.icon} alt='img'/>
                                            </div>
                                            <span style={{color: 'black', textAlign: 'center'}}>{item.label}</span>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Link to={'/user-profile'}>
                    <label for={closeBtn}>
                        <div className={cx('btnToProfile')}>
                            <span className={cx('textToProfile')}>Đi đến tài khoản</span>
                        </div>
                    </label>  
                </Link>
            </div>
        </>
    );
}

export default SettingPopup;