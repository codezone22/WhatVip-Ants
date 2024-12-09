import styles from './OrderItem.module.scss'
import classNames from 'classnames/bind';
import ProductItem from './ProductItem';
import { useState } from 'react';
const cx = classNames.bind(styles);

function OrderItem({props}) {
    let [detail, setDetail] = useState(false)
    function calculateTotal(items){
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    return ( <>
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div>
                    <span className={cx('title')}>Đơn hàng:</span> <br></br>#{props?._id?.substring(12)}
                </div>
                <div>
                    <span className={cx('title')}>Ngày đặt hàng:</span> <br></br>{(new Date(props.orderDate)).getDate() + '/ ' + ((new Date(props.orderDate)).getMonth() + 1) +'/ ' + (new Date(props.orderDate)).getFullYear()}
                </div>
                <div>
                    <span className={cx('title')}>Tổng đơn hàng:</span> <br></br>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(calculateTotal(props.orderItem))}
                </div>
                <div>
                    <span className={cx('title')}>Trạng thái:</span> <br></br><span style={{color: '#ED232F'}}>{props.status}</span>
                </div>
                {/* <div onClick={() => setDetail(!detail)} style={{width: '106px'}}><span className={cx('title')} style={{color: '#4bc7bf', cursor: 'pointer'}}>{detail ? 'Less detail' : 'More detail'}</span></div> */}
            </div>
            <div className={cx('header-responsive')}>
                <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                        #DH_{props._id?.slice(16)}
                    </div>
                    <div style={{ color: 'white' }}>{(new Date(props.orderDate)).getDate() + '/ ' + ((new Date(props.orderDate)).getMonth() + 1) + '/ ' + (new Date(props.orderDate)).getFullYear()}</div>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '4px 10px' }}>{props.status}</div>
            </div>
            <div className={cx('body')}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'top', justifyContent: 'space-between'}}>
                    <div style={{flex: 1}}>
                        <div className={cx('containerProduct')}>
                            {
                                props.orderItem.map((item, index) => {
                                    return <div style={props.orderItem.length - 1 !== index ? {margin: '0px 10px', padding: '10px 0px', borderBottom: '0.5px solid #99e0dc'}: {margin: '0px 10px', padding: '10px 0px'}}>
                                        <ProductItem key={index} props={item}/>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default OrderItem;