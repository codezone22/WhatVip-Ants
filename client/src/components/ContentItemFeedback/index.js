import React from "react";
import classNames from "classnames/bind";
import styles from "./ContentItemFeedback.module.scss";

const cx = classNames.bind(styles);

function ContentItemFeedback({contentFeedback}) {
  return (
    <div className={cx("container-rieview")}>
      <div style={{ marginTop: '10px', color: '#909090',marginBottom:'10px' }}>Góp ý: </div>
      <div className={cx("message-review")}>{contentFeedback.content}</div>
      <div className={cx("container-images")} style={{marginLeft:'-8px', marginTop:'6px'}}>
        {contentFeedback.imagesRv.map((item, index) => {
          return (
            <div className={cx("images-list")} key={index}>
              <img className={cx("image")} src={item} alt="img" />
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default ContentItemFeedback;