import { useEffect } from 'react';
import OrderItem from './OrderItem';
import styles from './Orders.module.scss'
import classNames from 'classnames/bind';
import { getAllOrder } from '~/redux/api/userRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Orders() {

    const dispatch = useDispatch()
    let currentUser = useSelector((state) => state.auth.login.currentUser)
    let orders = useSelector((state) => state.user.order.orders)

    useEffect(() => {
        getAllOrder(currentUser, dispatch)
    }, [])
    return ( 
        <>
            <div className={cx('container')}>
                <Link to={'/user-profile'} className={cx('account-page__icon')}>
                    <BiArrowBack /> 
                </Link>
                <h1 className={cx('account-page__title')}>Lịch sử đơn hàng</h1>
                
                {
                    orders?.map((item, index) => {
                        return <div style={{margin: '10px 0px'}}>
                            <OrderItem key={index} props={item}/>
                        </div>
                    })
                }

            </div>
        </>
    );
}

export default Orders;