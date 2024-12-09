// Home.jsx
import axios from 'axios';
import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/img';
import {
  filterListProductsState,
  setListProducts,
  setListProductsState
} from "~/redux/slices/productSlice";
import baseUrl from '~/utils/baseUrl';
import ItemCollection from "../Collection/ItemCollection";
import styles from "./Home.module.scss";
import { FaCircleArrowRight } from "react-icons/fa6";
import ProductItem from './ProductItem';
import { createCartItem, getCartProducts, increaseQuantityCartItem } from '~/redux/api/userRequest';
import { ToastContainer, toast } from 'react-toastify';

import { createCartItemNonUser, increaseQuantityCartItemNonUser } from '~/redux/api/nonUserRequest';

const cx = classNames.bind(styles);

function Home() {
  const [withWindow,setWithWindow] = useState(window.innerWidth)
  const linkImagesSlider = [
    "https://www.watchstore.vn/images/products/collection/slideshow/2024/05/31/compress/nam2-1_1717152208.webp",
    "https://www.watchstore.vn/images/products/collection/slideshow/2024/05/31/compress/banner-dong-ho-nam-1_1717152166.webp",
  ];

  const listProducts =  useSelector(state => state.product.listProducts)
  let cartProducts = useSelector(state => state.user?.cart?.cartProducts)
  let cartProductsNonUser = useSelector(state => state.nonUser?.cart?.cartProductsNonUser)
  let currentUser = useSelector((state) => state.auth.login.currentUser)

  const [selected, setSelected] = useState(null)
  const navigate=useNavigate();

  const navPages = [
    {
      url: "https://image.donghohaitrieu.com/wp-content/uploads/2023/10/bst-dong-ho-moi.jpg",
      route: "./collection/1",
    },
    {
      url: "https://image.donghohaitrieu.com/wp-content/uploads/2023/10/bst-dong-ho-moi.jpg",
      route: "/collection/Watches",
    },
    {
      url: "https://image.donghohaitrieu.com/wp-content/uploads/2023/10/bst-dong-ho-moi.jpg",
      route: "/collection/Đồng hồ analog",
    },
    {
      url: "https://image.donghohaitrieu.com/wp-content/uploads/2023/10/bst-dong-ho-moi.jpg",
      route: "/collection/Đồng hồ kỹ thuật số",
    },
  ];

  const contents = [
    {
      titleSlider: "SẢN PHẨM NỔI BẬT",
      urlBanner: "https://image.donghohaitrieu.com/wp-content/uploads/2023/10/bst-dong-ho-moi.jpg",
    },
    {
      titleSlider: "SẢN PHẨM VIP",
      urlBanner: "https://image.donghohaitrieu.com/wp-content/uploads/2024/05/dong-ho-doi-cap.jpg",
    },
    {
      titleSlider: "SẢN PHẨM NĂNG ĐỘNG",
      urlBanner: "https://image.donghohaitrieu.com/wp-content/uploads/2024/05/dong-ho-doi-cap.jpg",
    },
    {
      titleSlider: "SẢN PHẨM THỂ THAO",
      urlBanner: "https://mcdn.coolmate.me/image/March2023/mceclip0_137.jpg",
    },
  ];

  const responsiveBanner = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
    },
  };

  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
        productType: '',
        productCategory: '',
        status: '',
        searchText: ''
    
    }) 
  const getAllProducts = async () => {
    try {
        const res = await axios.get(`${baseUrl}/api/products/getAllProducts`)
        if (res && res.data) {
            dispatch(setListProducts(res.data.data))
            dispatch(setListProductsState(res.data.data))
            dispatch(filterListProductsState({filter}));
        } 
    } catch (error) {
        console.log(error.message)
    }
}
useEffect(() => {
  function handleResize() {
    setWithWindow(window.innerWidth)
  }

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
useEffect(() => {
  getAllProducts();
  currentUser && getCartProducts(currentUser, dispatch)
  console.log(listProducts)
},[])

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
const handleItemToCart = (product, b, c) => {
    const cartItem = {
        product: product._id,
        productName: product.productName,
        productPrice: product.exportPrice * (1 - product.discountPerc/100),
        size: b.sizeName,
        color: c.colorName,
        quantity: 1
    }
    if(currentUser){
        const existItem = cartProducts.find((cartIT) => cartIT.product?._id === cartItem.product && cartIT.size === cartItem.size && cartIT.color === cartItem.color)
        existItem ? increaseQuantityCartItem(currentUser, {...existItem, quantity: 1}, dispatch) : createCartItem(currentUser, cartItem, dispatch)
    }
    else{
        const existItem = cartProductsNonUser?.find((cartIT) => cartIT.product?._id === cartItem.product && cartIT.size === cartItem.size && cartIT.color === cartItem.color)
        existItem ? increaseQuantityCartItemNonUser({...existItem, quantity: 1}, dispatch) : createCartItemNonUser({...cartItem, product: product}, dispatch)
    }
    
    setSelected({...cartItem, product: product})
    setPopupProductCart(true)
    setCloseTimer()
}
const [popupProductCart, setPopupProductCart] = useState(false)
const notify = (type, message) => toast(message, { type: type });

  return (
    <div>
        <ToastContainer />
        <div className={cx(popupProductCart ? 'bayra' : 'bayvao')} style={{position: 'fixed', zIndex: 1000, top: '16px', right: '16px', borderRadius: '16px', width: '350px', maxHeight: '350px', backgroundColor: 'white', padding: '15px', fontSize: '16px', color: 'black', fontWeight: '600' }}>
            <div>Đã thêm vào giỏ hàng</div>
            {selected && <ProductItem props={selected}/>}
            <div>
                <div className={cx('account-info__btn')} onClick={() => navigate("/cart")}>
                    <span className={cx('account-info__btn-text')}>Xem giỏ hàng</span>
                </div>
            </div>
        </div>  

      <div>
        <Carousel
          itemClass={cx("carousel-item")}
          swipeable={true}
          draggable={false}
          responsive={responsiveBanner}
          autoPlay
          arrows={withWindow >=1024 ? true : false }
          ssr={true} 
          infinite={true}
          autoPlaySpeed={3000}
          transitionDuration={500}
        >
          {linkImagesSlider.map((item, index) => {
            return <img key={index} src={item} alt="img" />;
          })}
        </Carousel>
      </div>
      {/* List product */}
      {contents.map((item) => {
        return (
          <>
            <div className={cx("container-slider")}>
              <span className={cx("title-slider")}>{item.titleSlider}</span>
              <Carousel
                itemClass={cx("carousel-item")}
                swipeable={true}
                draggable={false}
                arrows={withWindow >=1024 ? true : false }
                responsive={responsive}
                ssr={true}
              >
                {listProducts.map((item, index) => {
                  return (
                    <div key={index} className={cx("width-item")}>
                      <ItemCollection handleToCart={handleItemToCart} product={item}/>
                    </div>
                  );
                })}
              </Carousel>
            </div>

            <div className={cx("container-banner")}>
              <img src={item.urlBanner} alt="img" />
            </div>
          </>
        );
      })}

      <div className={cx("container-pages")}>
        {navPages.map((item) => {
          return (
            <div className={cx("container-item")}>
              <img className={cx("itemIMG")} src={item.url} alt="all" />
              <div className={cx("btn-item")} onClick={() => navigate(item.route)}>
                <FaCircleArrowRight />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;