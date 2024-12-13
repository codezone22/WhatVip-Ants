import classNames from "classnames/bind";
import styles from './ProductDetail.module.scss'
import { useEffect, useRef, useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft, FaArrowRight, FaArrowLeft, FaAngleDown } from "react-icons/fa6";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ItemCarousel from "./ItemCarousel";
import ItemReview from "./ItemReview";
import baseUrl from "~/utils/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import formatMoney from "~/utils/formatMoney";
import { useDispatch, useSelector } from "react-redux";
import { createCartItem, getCartProducts, increaseQuantityCartItem } from "~/redux/api/userRequest";
import ProductItem from "../Home/ProductItem";
import { ToastContainer, toast } from 'react-toastify';
import { createCartItemNonUser, increaseQuantityCartItemNonUser } from "~/redux/api/nonUserRequest";
const cx = classNames.bind(styles);
function ProductDetail() {
    const { id } = useParams();
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 2
        }
    };
    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        const { carouselState: { currentSlide } } = rest;
        return (


            <>
                <div onClick={() =>
                    previous()} className={cx('btn-switch2', 'left')} >
                    <FaArrowLeft className={cx('icon')} />
                </div>
                <div onClick={() => next()} className={cx('btn-switch2', 'right')}>
                    <FaArrowRight className={cx('icon')} />
                </div>
            </>


        );
    };
    const descriptionElement = useRef();
    const [indexColorActive, setIndexColorActive] = useState(0);
    const [indexImageActive, setIndexImageActive] = useState(0);
    const [indexSizeActive, setIndexSizeActive] = useState(-1);
    const [quantityAddCart, setQuantityAddCart] = useState(1);
    const [enableNotiSize, setEnableNotiSize] = useState(false);
    const [enableNotiSize2, setEnableNotiSize2] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false)
    const [selected, setSelected] = useState(null)
    const [popupProductCart, setPopupProductCart] = useState(false)
    let cartProductsNonUser = useSelector(state => state.nonUser?.cart?.cartProductsNonUser)


    const [filterReview, setFilterReview] = useState({
        star: 'all',
        isHasImage: 'all',
        isResponsed: 'all'

    })
    const handleClickNextImage = () => {
        setIndexImageActive(prev => {
            const length = product.colors[indexColorActive].images.length;
            if (prev === length - 1) {
                return 0;
            }
            return prev + 1;
        })
    }
    const handleClickPreviousImage = () => {
        setIndexImageActive(prev => {
            const length = product.colors[indexColorActive].images.length;
            if (prev === 0) {
                return length - 1;
            }
            return prev - 1;
        })
    }
    const setCloseTimer = () => {
        let t = 3
        const a = setInterval(() => {
            if(t-- === 0){
                clearInterval(a)
                setPopupProductCart(false)
                setSelected(null)
            }
        }, 1000)
    }
    const handleClickBtnAddCart = () => {
        if (indexSizeActive === -1) {
            setEnableNotiSize(true);
            return;
        }
        if (product.colors[indexColorActive].sizes[indexSizeActive].quantity === 0) {
            setOutOfStock(true)
            return
        }
        
        const cartItem = {
            product: product._id,
            productName: product.productName,
            productPrice: product.discountPerc ? product.exportPrice * (1 - product.discountPerc / 100) : product.exportPrice,
            size: product.colors[indexColorActive].sizes[indexSizeActive].sizeName,
            color: product.colors[indexColorActive].colorName,
            quantity: quantityAddCart
        }

        if(currentUser){
            const existItem = cartProducts.find((cartIT) => cartIT.product?._id === cartItem.product && cartIT.size === cartItem.size && cartIT.color === cartItem.color)
            existItem ? increaseQuantityCartItem(currentUser, {...existItem, quantity: quantityAddCart}, dispatch) : createCartItem(currentUser, cartItem, dispatch)
        }
        else{
            const existItem = cartProductsNonUser?.find((cartIT) => cartIT.product?._id === cartItem.product && cartIT.size === cartItem.size && cartIT.color === cartItem.color)
            existItem ? increaseQuantityCartItemNonUser({...existItem, quantity: quantityAddCart}, dispatch) : createCartItemNonUser({...cartItem, product: product}, dispatch)
        }

        setSelected({...cartItem, product: product})
        setPopupProductCart(true)
        setCloseTimer()
    }
    const product1 = {
        productName: 'Áo khoác thể thao Pro Active',
        productType: 'Áo khoác',
        colors: [
            {
                colorName: 'Xám',
                images: [
                    "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/October2023/QD001.20_38.jpg",
                    "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/October2023/QD001.24_53.jpg",
                    "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/October2023/QD001.21.jpg",
                ],
                sizes: [
                    {
                        name: 'S',
                        quantity: 10,
                    },
                    {
                        name: 'L',
                        quantity: 102,
                    },
                    {
                        name: 'M',
                        quantity: 90,
                    }
                ]
            },
            {
                colorName: 'Xanh Navy',
                images: [
                    "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/October2023/QD001.9_84.jpg",
                    "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/October2023/QD001.12_94.jpg",
                    "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/October2023/QD001.10.jpg",
                    "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/October2023/AD001.s2.4.jpg"
                ],
                sizes: [
                    {
                        name: 'M',
                        quantity: 10,
                    },
                    {
                        name: 'L',
                        quantity: 102,
                    },
                    {
                        name: 'XL',
                        quantity: 90,
                    },
                    {
                        name: '2XL',
                        quantity: 20,
                    },
                    {
                        name: '3XL',
                        quantity: 40,
                    }
                ]
            }
        ],
        quantitySold: 120
    }
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([])
    const [reviewsOrigin, setReviewsOrigin] = useState([])
    const [rate, setRate] = useState(0)
    const [listProductsByType, setListProducsByType] = useState([]);
    const getProductsByProductType = async () => {
        try {
            const res = await axios.post(`${baseUrl}/api/products/getProductsByType`, { productType: product.productType, productId: product._id });
            setListProducsByType(res.data.data || [])
        } catch (error) {
            console.log(error.message)
        }
    }
    const [isDiscontinued, setIsDiscontinued] = useState(false); // Thêm trạng thái để theo dõi trạng thái ngừng kinh doanh

const getProductById = async () => {
    try {
        const res = await axios.get(`${baseUrl}/api/products/getProductById/${id}`);
        const fetchedProduct = res.data.data || {};
        setProduct(fetchedProduct);
        setIsDiscontinued(fetchedProduct.status === "Ngừng kinh doanh"); // Kiểm tra trạng thái sản phẩm
    } catch (error) {
        console.log(error.message);
    }
};
    
    const getReviewsByProductId = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/reviews/getReviewsByProductId/${id}`);
            setReviews(res.data.data || [])
            setReviewsOrigin(res.data.data || [])
        } catch (error) {
            console.log(error.message)
        }
    }
    let cartProducts = useSelector(state => state.user?.cart?.cartProducts)
    let currentUser = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch();
    useEffect(() => {
        getProductById()
        getReviewsByProductId()
        currentUser && getCartProducts(currentUser, dispatch)
    }, [])
    useEffect(() => {
        const totalRate = reviewsOrigin.reduce((acc, cur) => {
            return acc + cur.star
        }, 0)
        const rate = (totalRate / reviewsOrigin.length)
        setRate(rate)
    }, [reviewsOrigin])
    useEffect(() => {
        descriptionElement.current.innerHTML = product.description || '';
        getProductsByProductType()
    }, [product])
    const handleChangeFilterReview = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'isHasImage') {
            if (value!=='all') {
                value = value==='true' ? true : false
            }
        }
        if (name === 'isResponsed') {
            if (value!=='all') {
                value = value==='true' ? true : false
            }
        }
        setFilterReview(prev => ({ ...prev, [name]: value }))
    }
    useEffect(() => {
        console.log(filterReview)
        let nextStateReviews = [...reviewsOrigin];
        console.log('origin',reviewsOrigin)
        if (filterReview.star !== 'all') nextStateReviews = nextStateReviews.filter(item => item.star === Number(filterReview.star))
        if (filterReview.isHasImage !== 'all') {
            if (filterReview.isHasImage) nextStateReviews = nextStateReviews.filter(item => item.imagesRv && item.imagesRv.length > 0)
            else nextStateReviews = nextStateReviews.filter(item =>  !item.imagesRv || item.imagesRv.length === 0)
        }
        if (filterReview.isResponsed !== 'all') nextStateReviews = nextStateReviews.filter(item => item.isResponsed === filterReview.isResponsed)
        setReviews([...nextStateReviews])
    }, [filterReview])
    const hanleClickPlusQuantity = () => {
        if (indexSizeActive === -1) {
            setEnableNotiSize(true)
            setEnableNotiSize2(true)
            return;
        }
        if (product.colors[indexColorActive].sizes[indexSizeActive].quantity === 0) return;
        setQuantityAddCart(prev => {
            const quantityAvaiable = product.colors[indexColorActive].sizes[indexSizeActive].quantity
            if (prev === quantityAvaiable) return prev;
            else return prev + 1
        })
    }
    const navigate = useNavigate()
    const notify = (type, message) => toast(message, { type: type });

    return (
        <div className={cx('wrapper')}>
        <ToastContainer />

        <div
            className={cx(popupProductCart ? 'bayra' : 'bayvao')}
            style={{
                position: 'fixed',
                zIndex: 1000,
                top: '16px',
                right: '16px',
                borderRadius: '16px',
                width: '350px',
                maxHeight: '350px',
                backgroundColor: 'white',
                padding: '15px',
                fontSize: '16px',
                color: 'black',
                fontWeight: '600',
            }}
        >
            <div>Đã thêm vào giỏ hàng</div>
            {selected && <ProductItem props={selected} />}
            <div>
                <div
                    className={cx('account-info__btn')}
                    onClick={() => navigate('/cart')}
                >
                    <span className={cx('account-info__btn-text')}>Xem giỏ hàng</span>
                </div>
            </div>
        </div>

        <div className={cx('header')}>
            <span className={cx('span1')}>Trang chủ</span>
            <span className={cx('span2')}> / {product.productType}</span>
        </div>

        <div className={cx('body')}>
            <div className={cx('product-image-wrapper')}>
                <ul className={cx('product-list-image')}>
                    {product.colors &&
                        product.colors[indexColorActive]?.images.map((item, index) => (
                            <li key={index}>
                                <div
                                    onClick={() => setIndexImageActive(index)}
                                    className={cx('div-item-img', {
                                        active: indexImageActive === index,
                                    })}
                                >
                                    <img src={item} alt="" />
                                </div>
                            </li>
                        ))}
                </ul>

                {product.colors &&
                    product.colors[indexColorActive]?.images.map((item, index) => (
                        <img
                            alt=""
                            className={cx('image-view', { active: indexImageActive === index })}
                            src={item}
                            key={index}
                        />
                    ))}
                <div onClick={handleClickPreviousImage} className={cx('btn-switch', 'left')}>
                    <FaAngleLeft />
                </div>
                <div onClick={handleClickNextImage} className={cx('btn-switch', 'right')}>
                    <FaAngleRight />
                </div>
            </div>

            <div className={cx('section-info')}>
                <h2 className={cx('product-name')}>{product.productName}</h2>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {!Number.isNaN(rate) && (
                        <div className={cx('reviews-rating')}>
                            {[...Array(Math.round(rate) || 0)].map((item, index) => (
                                <img
                                    key={index}
                                    src="https://www.coolmate.me/images/star.svg?2a5188496861d26e5547c524320ec875"
                                    className={cx('reviews-rating-star')}
                                    alt=""
                                />
                            ))}
                        </div>
                    )}
                    {!Number.isNaN(rate) && <span>|</span>}
                    <div style={{ fontSize: '12px', fontWeight: '500' }}>Đã bán: {product.quantitySold}</div>
                </div>

                <div className={cx('price')}>
                    {product.discountPerc ? (
                        <>
                            <span className={cx('price1')}>
                                {formatMoney(product.exportPrice * (1 - product.discountPerc / 100))}
                            </span>
                            <span className={cx('price2')}>{formatMoney(product.exportPrice)}</span>
                        </>
                    ) : (
                        <span className={cx('price1')}>{formatMoney(product.exportPrice)}</span>
                    )}

                    {product.discountPerc && <span className={cx('percent')}>-{product.discountPerc}%</span>}
                </div>

                {/* Trạng thái ngừng kinh doanh */}
                {isDiscontinued && (
                    <div className={cx('discontinued-overlay')}>Sản phẩm đã ngừng kinh doanh</div>
                )}
                

                <div style={{ marginTop: '8px' }}>
                    <div>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Màu sắc: </span>
                        <span style={{ fontWeight: '700', fontSize: '14px', marginLeft: '6px' }}>
                            {product.colors && product.colors[indexColorActive]?.colorName}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        {product.colors?.map((item, index) => (
                            <div
                                key={index}
                                className={cx('img-color-wrapper', { active: index === indexColorActive })}
                            >
                                <img
                                    onClick={() => {
                                        setIndexColorActive(index);
                                        setIndexSizeActive(0);
                                        setIndexImageActive(0);
                                    }}
                                    alt=""
                                    src={item.images[0]}
                                    className={cx('img-color')}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '8px' }} className={cx('section-size', { active: enableNotiSize })}>
                    <div>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Kích thước: </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        {product.colors &&
                            product.colors[indexColorActive]?.sizes.map((item, index) => (
                                <div
                                    onClick={() => {
                                        setIndexSizeActive(index);
                                        setEnableNotiSize(false);
                                        setEnableNotiSize2(false);
                                        setOutOfStock(false);
                                    }}
                                    className={cx('size-wrapper', { active: index === indexSizeActive })}
                                >
                                    {item.sizeName}
                                </div>
                            ))}
                    </div>
                </div>

                {enableNotiSize && enableNotiSize2 && (
                    <p style={{ marginTop: '12px', fontSize: '14px', color: 'red' }}>Vui lòng chọn kích thước</p>
                )}

                {indexSizeActive !== -1 && (
                    <div style={{ marginTop: '8px' }}>
                        <div>
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                Số lượng có sẵn: <strong>{product.colors && product.colors[indexColorActive]?.sizes[indexSizeActive]?.quantity || 0}</strong>
                            </span>
                        </div>
                    </div>
                )}

                {outOfStock && (
                    <p style={{ marginTop: '12px', fontSize: '14px', color: 'red' }}>Sản phẩm đã hết hàng</p>
                )}

                <div style={{ marginTop: '32px', padding: '16px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            borderRadius: '30px',
                            height: '40px',
                            width: '100px',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid #000',
                        }}
                    >
                        <span
                            onClick={() => {
                                if (quantityAddCart === 1) return;
                                setQuantityAddCart((prev) => prev - 1);
                            }}
                            style={{
                                userSelect: 'none',
                                display: 'inline-block',
                                padding: '0px 16px',
                                fontSize: '20px',
                                cursor: 'pointer',
                                fontWeight: '700',
                            }}
                        >
                            -
                        </span>
                        <span style={{ display: 'inline-block', fontWeight: '600' }}>{quantityAddCart}</span>
                        <span
                            onClick={hanleClickPlusQuantity}
                            style={{
                                userSelect: 'none',
                                display: 'inline-block',
                                padding: '0px 16px',
                                fontSize: '20px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            +
                        </span>
                    </div>
                    <div 
    onClick={isDiscontinued ? null : handleClickBtnAddCart} // Không gọi hàm nếu sản phẩm ngừng kinh doanh
    className={cx('btn-add-cart')}
    style={{ cursor: isDiscontinued ? 'not-allowed' : 'pointer' }} // Thêm style để thay đổi con trỏ khi vô hiệu hóa
>
    {isDiscontinued ? (
        <span style={{ color: 'red' }}>Sản phẩm ngừng kinh doanh</span> // Hiển thị thông báo khi ngừng kinh doanh
    ) : indexSizeActive === -1 ? (
        <span>Chọn kích thước</span>
    ) : (
        <>
            <BsCartCheck style={{ marginRight: '8px', fontSize: '20px' }} />
            <span>Thêm vào giỏ hàng</span>
        </>
    )}
</div>
                </div>

                    <div className={cx('separate')}>
                    </div>

                    <div className={cx('product-policy')}>
                        <div className={cx('product-policy-item')}>
                            <div className={cx('product-policy-icon')}>
                                <img src="https://www.coolmate.me/images/icons/icon3.svg" alt="Đổi trả với số điện thoại" />
                            </div>
                            <span className={cx('product-policy-title')}>

                                Đổi trả cực dễ
                                <br />
                                chỉ cần số điện thoại

                            </span>
                        </div>
                        <div className={cx('product-policy-item')}>
                            <div className={cx('product-policy-icon')}>
                                <img src="https://www.coolmate.me/images/icons/icon3.svg" alt="Đổi trả với số điện thoại" />
                            </div>
                            <span className={cx('product-policy-title')}>

                                Miễn phí vận chuyển
                                <br />
                                cho đơn hàng trên 200k

                            </span>
                        </div>
                        <div className={cx('product-policy-item')}>
                            <div className={cx('product-policy-icon')}>
                                <img src="https://www.coolmate.me/images/icons/icon3.svg" alt="Đổi trả với số điện thoại" />
                            </div>
                            <span className={cx('product-policy-title')}>

                                60 ngày đổi trả
                                <br />
                                vì bất kỳ lý do gì

                            </span>
                        </div>
                        <div className={cx('product-policy-item')}>
                            <div className={cx('product-policy-icon')}>
                                <img src="https://www.coolmate.me/images/icons/icon3.svg" alt="Đổi trả với số điện thoại" />
                            </div>
                            <span className={cx('product-policy-title')}>

                                Hotline 1900.27.27.37
                                <br />
                                hỗ trợ từ 8h30 - 22h
                                <br />
                                mỗi ngày
                            </span>
                        </div>
                        <div className={cx('product-policy-item')}>
                            <div className={cx('product-policy-icon')}>
                                <img src="https://www.coolmate.me/images/icons/icon3.svg" alt="Đổi trả với số điện thoại" />
                            </div>
                            <span className={cx('product-policy-title')}>

                                Đến tận nơi nhận hàng trả,
                                <br />
                                hoàn tiền trong 24h

                            </span>
                        </div>
                        <div className={cx('product-policy-item')}>
                            <div className={cx('product-policy-icon')}>
                                <img src="https://www.coolmate.me/images/icons/icon3.svg" alt="Đổi trả với số điện thoại" />
                            </div>
                            <span className={cx('product-policy-title')}>

                                Giao hàng nhanh
                                <br />
                                toàn quốc

                            </span>
                        </div>

                    </div>
                    <div className={cx('separate')}>
                    </div>
                    <div className={cx('product-description')}>
                        <div ref={descriptionElement} style={{ fontWeight: '600', fontSize: '14px', marginBottom: '16px' }}>Đặc điểm nổi bật</div>
                    </div>
                </div>
            </div>
            <div className={cx('carsousel-wrapper')}>
                <h1 >SẢN PHẨM CÙNG LOẠI BẠN CÓ THỂ THÍCH</h1>
                <Carousel itemClass="carousel" responsive={responsive} arrows={false} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup />}>

                    {
                        listProductsByType.map((item, index) => {
                            return <ItemCarousel key={index} item={item} />
                        })
                    }
                </Carousel>
            </div>

            <div className={cx('review')}>
                <div className={cx('reviews-leftside-rating')}>
                    <div className={cx('title')}>
                        ĐÁNH GIÁ SẢN PHẨM
                    </div>
                    <div className={cx('rate')}>{(rate && rate.toFixed(1)) || 0}</div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            [...Array(Math.round(rate) || 0)].map((item, index) => {
                                return <img key={index} src="https://www.coolmate.me/images/star-yellow.svg?8f4d13b24f276e8a788250b192548210" />
                            })
                        }
                    </div>
                    <div className={cx('quantity-reviews')}>
                        {reviews.length} đánh giá
                    </div>
                </div>
                <div className={cx('reviews-rightside')}>
                    <div className={cx('reviews__filter')}>
                        <div className={cx('reviews__select')}>
                            <select name="star" onChange={handleChangeFilterReview} style={{ backgroundImage: 'url(' + { FaAngleDown } + ')' }}>
                                <option value="all">Đánh giá</option>
                                <option value="1">1 sao</option>
                                <option value="2">2 sao</option>
                                <option value="3">3 sao</option>
                                <option value="4">4 sao</option>
                                <option value="5">5 sao</option>
                            </select>
                            <FaAngleDown className={cx('icon')} />
                        </div>
                        <div className={cx('reviews__select')}>
                            <select name="isHasImage" onChange={handleChangeFilterReview} className={cx('reviews-filter-image')}>
                                <option value="all">Ảnh</option>
                                <option value={'true'}>Có ảnh</option>
                                <option value={'false'}>Không ảnh</option>
                            </select>
                            <FaAngleDown className={cx('icon')} />
                        </div>
                        <div className={cx('reviews__select')}>
                            <select name="isResponsed" onChange={handleChangeFilterReview}>
                                <option value="all">Phản hồi</option>
                                <option value={'true'}>Đã phản hồi</option>
                                <option value={'false'}>Chưa phản hồi</option>
                            </select>
                            <FaAngleDown className={cx('icon')} />
                        </div>
                    </div>

                    <div className={cx('reviews-listing')}>
                        <div className={cx('product-reviews-listings')}>

                            {
                                reviews.map((item, index) => {
                                    return <ItemReview key={index} item={item} />
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default ProductDetail;