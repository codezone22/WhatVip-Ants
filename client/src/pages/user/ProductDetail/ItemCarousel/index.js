import classNames from "classnames/bind";
import styles from './ItemCarousel.module.scss'
import formatMoney from "~/utils/formatMoney";
const cx = classNames.bind(styles)
function ItemCarousel({ item }) {
    return (
        <div className={cx('wrapper')} style={{ userSelect: 'none', overflow: 'hidden' }}>
            <a href={`/product/${item._id}`} >
                <img className={cx('img')} src={(item && item.colors[0]?.images[0]) || ''} />
            </a>
            <p style={{ fontSize: '14px', marginTop: '12px', fontWeight: '500' }}>{item.productName}</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', alignItems: 'center' }}>
                {
                    item.discountPerc ?
                    <>
                        <span style={{ fontWeight: '600', fontFamily: 'Pangea,sans-serif', fontSize: '14px', }}>{formatMoney(item.exportPrice*(1-item.discountPerc/100))}</span>
                        <span style={{ fontWeight: '500', fontFamily: 'Pangea,sans-serif', color: '#c4c4c4', textDecoration: 'line-through', fontSize: '14px', }}>{formatMoney(item.exportPrice)}</span>
                    </>
                    :
                    <>
                    <span style={{ fontWeight: '600', fontFamily: 'Pangea,sans-serif', fontSize: '14px', }}>{formatMoney(item.exportPrice)}</span>
                    </>
                }
                {
                    item.discountPerc &&
                    <span style={{ fontWeight: '500', fontFamily: 'Pangea,sans-serif', color: '#ff3102', fontSize: '14px', }}>-{item.discountPerc}%</span>
                }
            </div>
        </div>
    );
}

export default ItemCarousel;