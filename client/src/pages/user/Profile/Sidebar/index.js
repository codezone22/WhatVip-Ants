import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind';
import { BsArrowRight } from "react-icons/bs";
import { useState } from 'react';
import { VoucherIcon, LocationIcon, AccountIcon, OrderIcon, RatingIcon, QuestionIcon, LogOutIcon } from '~/assets/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoutUser } from '~/redux/api/authRequest';
import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function Sidebar() {
    const [activeItem , setActiveItem ] = useState('info')
    const handleClickItem = (item) =>{
        setActiveItem(item)
    }

    let currentUser = useSelector((state) => state.auth.login.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try{
            logoutUser(currentUser?._id, dispatch, currentUser?.accessToken, navigate)
        }
        catch (err){
            notify("error", err)
        }
    }
    const notify = (type, message) => toast(message, {type: type});
    return (
        <div className={cx('main__sideBar')} onClick={() =>  window.scrollTo({top: 0, behavior: 'smooth'})}>
            <ToastContainer/>
            <Link to={'/user-profile/info'} className={cx(`sidebar-item-link`)} onClick={()=>{handleClickItem('info')}}>
                <div className={cx('tab_container', {
                        'active-item':activeItem==='info'
                    })}>
                    <div className={cx('tab_container_info')}>
                        <img alt='img' src={AccountIcon} className={cx('tab_icon')} />
                        <span className={cx('tab_info')}>Thông tin tài khoản</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <Link to={'/user-profile/orders'} className={cx(`sidebar-item-link` )} onClick={()=>{handleClickItem('order')}}>
                <div className={cx('tab_container', {
                        'active-item':activeItem==='order'
                    })}>
                    <div className={cx('tab_container_info')}>
                        <img alt='img' src={OrderIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Lịch sử đơn hàng</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <Link to={'/user-profile/vouchers'} className={cx(`sidebar-item-link`)} onClick={()=>{handleClickItem('voucher')}}>
                <div className={cx('tab_container', {
                        'active-item':activeItem==='voucher'
                    })}>
                    <div className={cx('tab_container_info')}>
                        <img alt='img' src={VoucherIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Ví voucher</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            
            <Link to={'/user-profile/addresses'} className={cx(`sidebar-item-link`)} onClick={()=>{handleClickItem('address')}}>
                <div className={cx('tab_container', {
                        'active-item':activeItem==='address'
                    })}>
                    <div className={cx('tab_container_info')}>
                        <img alt='img' src={LocationIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Sổ địa chỉ</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <Link to={'/user-profile/reviews'} className={cx(`sidebar-item-link` )} onClick={()=>{handleClickItem('review')}}>
                <div className={cx('tab_container', {
                        'active-item':activeItem==='review'
                    })}>
                    <div className={cx('tab_container_info')}>
                        <img alt='img' src={RatingIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Đánh giá và phản hồi</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <Link to={'/user-profile/policies'} className={cx(`sidebar-item-link`)} onClick={()=>{handleClickItem('policies')}}>
                <div className={cx('tab_container', {
                        'active-item':activeItem==='policies'
                    })}>
                    <div className={cx('tab_container_info')}>
                        <img alt='img' src={QuestionIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Chính sách và câu hỏi thường gặp</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <div className={cx('tab_container')} onClick={handleLogout}>
                <div className={cx('tab_container_info')}>
                    <img alt='img' src={LogOutIcon} className={cx('tab_icon')}></img>
                    <span className={cx('tab_info')}>Đăng xuất</span>
                </div>
                <BsArrowRight className={cx('tab_arrowRight')}/>
            </div>
        </div>
    );
}

export default Sidebar;