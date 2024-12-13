import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './ItemCollection.module.scss';
import { useNavigate } from "react-router-dom";
import baseUrl from "~/utils/baseUrl";
import axios from "axios";

const cx = classNames.bind(styles);

function ItemCollection({ product, handleToCart }) {
    const [indexColorActive, setIndexColorActive] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [rate, setRate] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getReviewsByProductId();
    }, []);

    const getReviewsByProductId = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/reviews/getReviewsByProductId/${product._id}`);
            setReviews(res.data.data || []);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const totalRate = reviews.reduce((acc, cur) => acc + cur.star, 0);
        const rate = reviews.length ? totalRate / reviews.length : 0;
        setRate(rate);
    }, [reviews]);

    return (
        <div
            className={cx('wrapper')}
            onClick={() => navigate(`/product/${product._id}`)} // Cho phép click vào để xem chi tiết sản phẩm
        >
            <div className={cx('image-wrapper', { disabled: product.status === "Ngừng kinh doanh" })}>
                <img className={cx('image-1')} src={product?.colors[indexColorActive]?.images[0]} alt="Product" />
                <img className={cx('image-2')} src={product?.colors[indexColorActive]?.images[1]} alt="Product" />

                {product.status === "Ngừng kinh doanh" && (
                    <div className={cx('disabled-overlay')}>Sản phẩm ngừng kinh doanh</div>
                )}

                {product.status !== "Ngừng kinh doanh" && (
                    <div className={cx('section-size')}>
                        <div className={cx('title-size')}>Thêm nhanh vào giỏ hàng</div>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '12px', flexWrap: 'wrap' }}>
                            {product?.colors[indexColorActive]?.sizes?.map((item, index) => (
                                <span
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                                        handleToCart(product, item, product?.colors[indexColorActive]);
                                    }}
                                    className={cx('item-size')}
                                >
                                    {item.sizeName}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {reviews.length !== 0 && (
                    <div className={cx('rating-star')}>
                        <span className={cx('rating')}>
                            {rate.toFixed(1)}{" "}
                            <img
                                style={{ marginBottom: "4px" }}
                                src="https://www.coolmate.me/images/star-new.svg?08a379c24952a980d5430515abb8be4e"
                                alt="Star"
                            />
                        </span>
                        <span className={cx('num-review')}>({reviews.length})</span>
                    </div>
                )}
                <div className={cx('overlay')}></div>
            </div>
            <div className={cx('section-color')}>
                {product?.colors.map((item, index) => (
                    <div key={index} className={cx('color-item', { active: index === indexColorActive })}>
                        <img
                            onClick={(e) => {
                                e.stopPropagation(); // Ngăn chặn sự kiện click vào thẻ màu làm điều hướng
                                setIndexColorActive(index);
                            }}
                            alt="Color option"
                            src={item.images[0]}
                            className={cx('img-color')}
                        />
                    </div>
                ))}
            </div>
            <div className={cx('section-info')}>
                <h3 className={cx('product-name')}>
                    <a
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${product._id}`);
                        }}
                    >
                        {product?.productName}
                    </a>
                </h3>
                <p className={cx('product-color')}>{product?.colors[indexColorActive]?.colorName}</p>
                <div className={cx('layout-price')}>
                    <span className={cx('price')}>
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(
                            product?.discountPerc
                                ? (product?.exportPrice * (100 - product?.discountPerc)) / 100
                                : product?.exportPrice
                        )}
                    </span>
                    {product?.discountPerc > 0 && (
                        <>
                            <span className={cx('sale-off')}>
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(product?.exportPrice)}
                            </span>
                            <span className={cx('percent')}>-{product?.discountPerc}%</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemCollection;
