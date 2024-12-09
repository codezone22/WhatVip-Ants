import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import baseUrl from '~/utils/baseUrl';
import styles from './CartPopup.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from '~/redux/api/userRequest';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function CartPopup({ onMouseLeave, cartProducts}) {
    let i = 50
    return ( <>
        <div onMouseLeave={() => onMouseLeave()} className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div className={cx('title')}>{cartProducts? cartProducts.length : 0} Sản phẩm</div>
                    <Link to={'/cart'} onClick={() => onMouseLeave()} style={{cursor: 'pointer', fontSize: '12px', color: '#2f5acf', textDecoration: 'none', fontWeight: '600'}}>Xem tất cả</Link>
                </div>
                <div className={cx('list-product-filter')}>
                    {cartProducts?.map((item, index) => 
                        (
                            <div key={index} style={{position: 'relative', zIndex: i--, cursor: 'pointer'}}>
                                <ProductItem props={item}/>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    </> );
}

export default CartPopup; 