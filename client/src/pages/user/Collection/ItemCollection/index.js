import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './ItemCollection.module.scss';
import { useNavigate } from "react-router-dom";
import baseUrl from "~/utils/baseUrl";
import axios from "axios";


const cx = classNames.bind(styles)

function ItemCollection({product, handleToCart}) {
    const [indexColorActive, setIndexColorActive] = useState(0);
    const [reviews, setReviews] = useState([])
    const [rate, setRate] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        getReviewsByProductId();
    }, [])
    const getReviewsByProductId = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/reviews/getReviewsByProductId/${product._id}`);
            setReviews(res.data.data || [])
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const totalRate = reviews.reduce((acc, cur) => {
            return acc + cur.star
        }, 0)
        const rate = (totalRate / reviews.length)
        setRate(rate)
    }, [reviews])

    return (
        <div className={cx('wrapper')} onClick={() => window.location.href = `/product/${product._id}`}>
            <div className={cx('image-wrapper')}>
                <img className={cx('image-1')} src={product?.colors[indexColorActive]?.images[0]} />
                <img className={cx('image-2')} src={product?.colors[indexColorActive]?.images[1]}  />
                <div className={cx('section-size')}>
                    <div className={cx('title-size')}>Thêm nhanh vào giỏ hàng</div>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '12px', flexWrap: 'wrap' }}>
                        {
                            product?.colors[indexColorActive]?.sizes?.map((item, index) => {
                                return <span onClick={(e) => {e.stopPropagation();handleToCart(product, item, product?.colors[indexColorActive])}} key={index} className={cx('item-size')}>{item.sizeName}</span>
                            })
                        }
                    </div>
                </div>
                {
                    reviews.length !== 0 &&
                    <div className={cx('rating-star')}>
                        <span className={cx('rating')}>{rate.toFixed(1)} <img style={{marginBottom: '4px'}} src="https://www.coolmate.me/images/star-new.svg?08a379c24952a980d5430515abb8be4e"/></span>
                        
                        <span className={cx('num-review')}>({reviews.length})</span>
                    </div>
                }
                <div className={cx('overlay')}></div>
            </div>
            <div className={cx('section-color')}>
                {
                    product?.colors.map((item, index) => {
                        return (
                            <div key={index} className={cx('color-item', { active: index === indexColorActive })}>
                                <img onClick={(e) => { e.stopPropagation() ;setIndexColorActive(index) }} alt="" src={item.images[0]} className={cx('img-color')} />
                            </div>
                        )
                    })
                }
            </div>
            <div className={cx('section-info')}>
                <h3 className={cx('product-name')}>
                    <a style={{cursor: 'pointer'}} onClick={() => window.location.href = `/product/${product._id}`}>{product?.productName}</a>
                </h3>
                <p className={cx('product-color')}>{product?.colors[indexColorActive]?.colorName}</p>
                <div className={cx('layout-price')}>
                    <span className={cx('price')}>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(product?.discountPerc ? product?.exportPrice * (100 - product?.discountPerc) / 100 : product?.exportPrice)}</span>
                    {
                        product?.discountPerc === 0 ? null :
                        <>
                            <span className={cx('sale-off')}>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(product?.exportPrice)}</span>
                            <span className={cx('percent')}>-{product?.discountPerc}%</span>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default ItemCollection;