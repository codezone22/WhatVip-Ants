import classNames from "classnames/bind";
import styles from './ItemSearch.module.scss';


const cx = classNames.bind(styles)

function ItemSearch({result}) {
    const getImage = () => {
        for(let i = 0; i < result.colors.length; i++){
            if(result.colors[i].sizes && result.colors[i].images){
                return result.colors[i].images[0]
            }
        }
        return "";
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <img className={cx('image')} src={getImage()} />
            </div>
            <div className={cx('section-info')}>
                <h3 className={cx('product-name')}>
                    <a href="/">{result.productName}</a>
                </h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontFamily: 'Pangea,sans-serif', fontSize: '14px', color: 'rgb(35, 31, 32)' }}>{result.importPrice}đ</span>
                    <span style={{ fontWeight: '500', fontFamily: 'Pangea,sans-serif', color: '#c4c4c4', textDecoration: 'line-through', fontSize: '14px', }}>{result.exportPrice}đ</span>
                    <span style={{ fontWeight: '500', fontFamily: 'Pangea,sans-serif', color: '#ff3102', fontSize: '14px', }}>-{result.discountPerc}%</span>
                </div>
            </div>
        </div>
    );
}


export default ItemSearch;