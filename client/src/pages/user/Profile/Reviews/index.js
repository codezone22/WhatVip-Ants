import { useDispatch, useSelector } from 'react-redux';
import OrderItem from './OrderItem';
import styles from './Reviews.module.scss'
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { getAllOrderReview } from '~/redux/api/userRequest';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { resetSuccess } from '~/redux/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);

function Reviews() {

    const dispatch = useDispatch()
    let currentUser = useSelector((state) => state.auth.login.currentUser)
    let orders = useSelector((state) => state.user.orderReview.orders)
    let isSuccessCR = useSelector((state) => state.user.orderReview.isSuccessCR)

    useEffect(() => {
        getAllOrderReview(currentUser, dispatch)
    }, [])
    useEffect(() => {
        if(isSuccessCR){
            getAllOrderReview(currentUser, dispatch)
            setTimeout(() => {
                getAllOrderReview(currentUser, dispatch)
            }, 3000)
            resetSuccess()
            setTimeout(() => {
                getAllOrderReview(currentUser, dispatch)
            }, 7000)

            setTimeout(() => {
                getAllOrderReview(currentUser, dispatch)
            }, 10000)

            setTimeout(() => {
                getAllOrderReview(currentUser, dispatch)
            }, 20000)
            resetSuccess()
        }
    }, [isSuccessCR])

    return (
        <>
            <div className={cx('container')}>
                <ToastContainer/>
                <Link to={'/user-profile'} className={cx('account-page__icon')}>
                    <BiArrowBack />
                </Link>
                <h1 className={cx('account-page__title')}>Đánh giá và phản hồi</h1>
                {
                    orders?.filter(i=>i.status==='Giao thành công')?.map((item, index) => {
                        return <div key={index} style={{ margin: '10px 0px' }}>
                            <OrderItem props={item} />
                        </div>
                    })
                }

            </div>
        </>
    );
}

export default Reviews;