import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductReviewItem.module.scss";
import ReactStars from "react-stars";

const cx = classNames.bind(styles);

function ProductReview({ item }) {
  const formatMoney = (monney) => {
    const formatter = new Intl.NumberFormat("de-VN", {
      style: "currency",
      currency: "VND",
    });

    return formatter.format(monney);
  };
  return (
    <a href={`/admin/reviews/${item.product._id}/detail`} className={cx("item-list")}>
      <div className={cx("item-product")}>
        <img
          className={cx("item-img")}
          src={item.product.colors[0].images[0]}
          alt="product"
        />
        <div className={cx("item-name")}>{item.product.productName}</div>
        <div className={cx("item-price")}>{formatMoney(item.product.exportPrice)}</div>
        <div >
          <div style={{padding:'0 10px'}}>
            <ReactStars
              count={5}
              size={10}
              value={item.averageStar === false ? 0 : item.averageStar}
              edit={false}
              color1="#C4C4C4"
              color2="#ffb21d"
            />
          </div>
          <div style={{padding:'0 10px'}}>Number of reviews: {item.reviews.length}</div>
        </div>

      </div>
      <div className={cx("item-hover")}>
        <button className={cx("item-button", "display_button")} type="button">
          Click để xem chi tiết đánh giá
        </button>
      </div>
    </a>
  );
}

export default ProductReview;