import classNames from "classnames/bind";
import { AiOutlineClose } from "react-icons/ai";


import styles from './OrderItem.module.scss'

const cx = classNames.bind(styles)

function OrderItem({ orderItem, index }) {
    return (
        <div className={cx('wrapper')}>

            <div className={cx('image-wrapper')}>
                <img src={orderItem?.image} />
                <span className={cx('stt')}>{index + 1}</span>
            </div>

            <div className={cx('item-info')}>
                <div className={cx('item-name')}>
                    {orderItem?.productId.productName}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={cx('color-size')}>
                        {orderItem?.color + ' / ' + orderItem?.size}
                    </span>
                    <span className={cx('color-size')}>
                        {orderItem?.productId.productCategory + ' / ' + orderItem?.productId.productType}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={cx('quantity')}>
                        Số lượng: <strong style={{ marginLeft: '4px' }}>{orderItem.quantity}</strong>
                    </span>

                    {
                        orderItem.productId.discountPerc !== 0 ?
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} >
                                <span className={cx('price', 'enable')}>
                                    {orderItem?.productId.exportPrice * (1 - orderItem?.productId.discountPerc / 100)}</span>
                                <span className={cx('price', 'price-serapate')}>{orderItem?.productId.exportPrice}</span>
                            </div>
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} >
                                <span className={cx('price', 'enable')}>{orderItem?.productId.exportPrice}</span>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default OrderItem;