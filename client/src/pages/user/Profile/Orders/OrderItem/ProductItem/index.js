import { useEffect, useState } from 'react';
import styles from './ProductItem.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function ProductItem({props}) {
    let [item, setItem] = useState({})

    useEffect(() => {
        setItem(props ? props : {
            orderItemId: "1",
            productId: "1",
            productName: 'Shorts thể thao 7" Movement',
            image: 'https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2023/AT220-1.jpg',
            size: "S",
            color: "Nâu",
            quantity: 2,
            price: 120000,
        })
    }, [])

    return ( 
        <>
            <div className={cx('container')}>
                <div className={cx('image')}>
                    <img className={cx('image')} src={item.image} alt=''/>
                </div>
                <div className={cx('rightContent')}>
                    <div>
                        <div className={cx('outerContent')}>
                            <span className={cx('productName')}>{item.productName}</span>
                            <span className={cx('colorSize')} style={{marginTop: '5px'}}>{`${props.color} / ${props.size}`}</span>
                            <span className={cx('colorSize')} style={{marginTop: '5px'}}>x {props.quantity}</span>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'flex-end', marginBottom: '15px', marginTop: '5px'}}>
                            <div style={{fontWeight: '600'}}>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(item.price)}</div>
                            {/* <del style={{fontWeight: '400', fontSize: '14px', color: '#ccc'}}>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(item.price)}</del> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductItem;