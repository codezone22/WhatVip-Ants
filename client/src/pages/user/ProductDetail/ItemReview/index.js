import classNames from "classnames/bind";
import styles from "./ItemReview.module.scss";
import convertDate from "~/utils/convertDate";
const cx = classNames.bind(styles);
function ItemReview({ item }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("reviews-listing-item")}>
        <div className={cx("reviews-listing-content")}>
          <div className={cx("reviews-rating")}>
            {[...Array(item.star || 0)].map((star, index) => {
              return (
                <img
                  key={index}
                  className={cx("star")}
                  src="https://www.coolmate.me/images/star.svg?2a5188496861d26e5547c524320ec875"
                />
              );
            })}
          </div>
          <div className={cx("reviews-author")}>
            <div className={cx("reviews-author-name")}>
              {" "}
              {item.user?.fullName}{" "}
            </div>
            <div className={cx("reviews-author-description")}>
              {item.orderItem?.color && (
                <>
                  {item.orderItem?.color} / {item.orderItem?.size}
                </>
              )}
            </div>
          </div>
          <div className={cx("reviews-listing-description")}>
            <p> {item.content} </p>
            <div className={cx("reviews-listing-gallery")}>
              {item.imagesRv?.map((itemImg, index) => {
                return (
                  <a key={index} className={cx("reviews-listing-image")}>
                    <img src={itemImg} />
                  </a>
                );
              })}{" "}
            </div>
            {item.reviewDate && (
              <span className={cx("reviews-listing-date")}>
                {" "}
                {convertDate(item.reviewDate)}{" "}
              </span>
            )}
            {item.isResponsed && (
              <div className={cx("response-wrapper")}>
                <p className={cx("reviews-listing-feedback")}>
                  {item.response?.content}
                </p>
                <div className={cx("reviews-listing-gallery")}>
                  {item.response?.imagesRsp?.map((itemImg, index) => {
                    return (
                      <a key={index} className={cx("reviews-listing-image")}>
                        <img src={itemImg} />
                      </a>
                    );
                  })}
                </div>
                <span className={cx("reviews-listing-date")}>
                {" "}
                {convertDate(item.response?.date)}{" "}
              </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemReview;
