import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind';
import {
    AiOutlineApartment,
    AiOutlineHome,
    AiOutlineHistory,
    AiOutlineTags
} from "react-icons/ai";
import {PiShirtFolded} from 'react-icons/pi'
import { MdOutlineAnalytics,MdOutlineRateReview } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import {BiLogOut, BiMessageError} from 'react-icons/bi'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from '~/redux/api/authRequest';
const cx = classNames.bind(styles);
function Sidebar() {
    const [activeItem , setActiveItem ] = useState('Dashboard')
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

        <div  className={cx(`sidebar-container` )}  style={{ width: "250px", position: 'fixed', top:0, left: 0, bottom:0 }}>
            <ToastContainer/>
            <div className={cx(`header-logo` )} >
                    <Link onClick={()=>{handleClickItem('Dashboard')}} to="/admin" style={{ color: 'white', fontWeight: 'bold', fontSize: '26px' }}>
                        Shop<span style={{ backgroundColor: 'white', color: 'black', borderRadius: '3px', padding: '0' }}>App</span>
                    </Link>
                </div>
            <hr />
            <div className="d-flex nav nav-pills flex-column mb-auto pt-2">
                <div className={cx('sidebar-item')} >
                    <Link to={'/admin'}  className={cx(`sidebar-item-link`, {
                        'active-item':activeItem==='Dashboard'
                    } )} onClick={()=>{handleClickItem('Dashboard')}}>
                        <AiOutlineHome className={cx('sidebar-icon')}/>
                        <div>Dashboard</div>
                    </Link>
                </div>
                <div className={cx('sidebar-item')}>
                    <Link to={'/admin/orders'}  className={cx(`sidebar-item-link`, {
                        'active-item':activeItem==='Orders'
                    } )} onClick={()=>{handleClickItem('Orders')}}>
                        <MdOutlineAnalytics className={cx('sidebar-icon')}/>
                        <div>Orders</div>
                    </Link>
                </div>
                <div className={cx('sidebar-item')}>
                    <Link to={'/admin/products'}  className={cx('sidebar-item-link', {
                        'active-item':activeItem==='Products'
                    } )} onClick={()=>{handleClickItem('Products')}}>
                        <PiShirtFolded className={cx('sidebar-icon')}/>
                        <div>Products</div>
                    </Link>
                </div>
                <div className={cx('sidebar-item')}>
                    <Link to={'/admin/customer-manage'}  className={cx('sidebar-item-link', {
                        'active-item':activeItem==='Customer'
                    } )} onClick={()=>{handleClickItem('Customer')}}>
                        <BsPeople className={cx('sidebar-icon')}/>
                        <div>Customer</div>
                    </Link>
                </div>
                <div className={cx('sidebar-item')}>
                    <Link to={'/admin/vouchers-manage'}  className={cx('sidebar-item-link', {
                        'active-item':activeItem==='Vouchers'
                    })} onClick={()=>{handleClickItem('Vouchers')}}>
                        <AiOutlineTags className={cx('sidebar-icon')}/>
                        <div>Vouchers</div>
                    </Link>
                </div>
                <div className={cx('sidebar-item')}>
                    <Link to={'/admin/reviews'}  className={cx('sidebar-item-link', {
                        'active-item':activeItem==='Reviews'
                    })} onClick={()=>{handleClickItem('Reviews')}}>
                        <MdOutlineRateReview className={cx('sidebar-icon')}/>
                        <div>Reviews</div>
                    </Link>
                </div>
                <div className={cx('sidebar-item')}>
                    <Link to={'/admin/feedbacks'}  className={cx('sidebar-item-link', {
                        'active-item':activeItem==='Feedback'
                    })} onClick={()=>{handleClickItem('Feedback')}}>
                        <BiMessageError className={cx('sidebar-icon')}/>
                        <div>Feedback</div>
                    </Link>
                </div>
                <div className={cx('sidebar-item')}>
                    <Link to={'/admin/history/bill'}  className={cx('sidebar-item-link', {
                        'active-item':activeItem==='History'
                    })} onClick={()=>{handleClickItem('History')}}>
                        <AiOutlineHistory className={cx('sidebar-icon')}/>
                        <div>History</div>
                    </Link>
                </div>
                <div className={cx('sidebar-item')} onClick={handleLogout}>
                    <div className={cx('sidebar-item-link', )}>
                        <BiLogOut className={cx('sidebar-icon')}/>
                        <div>Logout</div>
                    </div>
                </div>
            </div>
            <hr />
            <div >
                <div className="d-flex align-items-center text-white text-decoration-none "  >
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/000/290/610/small_2x/10__2850_29.jpg" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>Admin</strong>
                </div>
            </div>
        </div>


    );
}

export default Sidebar;