import React, { useState } from "react";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import classNames from "classnames/bind";
import styles from "./MessageBoxDelete.module.scss";
import HashLoader from "react-spinners/HashLoader";

const cx = classNames.bind(styles);

function MessageBoxDelete({
  title,
  content,
  setShowMessageBox,
  id,
  getReviewsById,
  btnYes,
  btnNo,
  list
}) {
  const [loading, setLoading] = useState(false);

  const handleYes = async () => {
    // Xử lý xóa
    setLoading(true);
    const url = `${baseUrl}/api/reviews/delete/${id}`;
    if (list.length === 1){
      try {
        await axios.delete(url);
        setLoading(false);
        setShowMessageBox(false);
        getReviewsById();
        window.location.href = 'http://localhost:3000/admin/reviews';
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
    else {
      try {
        let res = await axios.delete(url);
        if (res) {
          setLoading(false);
          setShowMessageBox(false);
          getReviewsById();
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
    
  };

  const handleClose = () => {
    setShowMessageBox(false);
  };

  return (
    <>
      {loading && (
        <div className={cx("container-loader")}>
          <HashLoader
            color="#000"
            loading={loading}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
            className={cx("loader-feedback")}
          />
        </div>
      )}
      <div className={cx("wrapper")} onClick={handleClose}>
        <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
          <div className={cx("header")}>
            <span className={cx("title-modal")}>{title}</span>
            <span className={cx("close")} onClick={handleClose}>
              &times;
            </span>
          </div>

          <div className={cx("separate")}></div>

          <div className={cx("body-modal")}>
            <span className={cx("content-modal")}>{content}</span>
          </div>

          <div className={cx("footer")}>
            <div className={cx("btn-no-ok")} onClick={handleClose}>
              {btnNo}
            </div>
            <div className={cx("btn-ok")} onClick={handleYes}>
              {btnYes}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageBoxDelete;
