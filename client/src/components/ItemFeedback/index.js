import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ItemFeedback.module.scss";
import FeedbackDetail from "~/pages/admin/Feedbacks/FeedbackDetail";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import convertDate from "~/utils/convertDate";
const cx = classNames.bind(styles);

function ItemFeedback({ item , getAllFeedbacks}) {
  const [openDetail, setOpenDetail] = useState(false);
  const handleClickFeedbackItem = () => {
    setOpenDetail(prev => !prev);
  }
  
  return (
    <>
      <tr className={cx('row-item')}>
        <td style={{ display: 'flex' }}>
          <img className={cx("item-avt")} src={item.user.profilePhoto} alt="img" />
          <div className={cx("item-info")}>
            <span className={cx("item-title")}>{item.title}</span>
            <span className={cx("item-email")}>{item.user.email}</span>
            <span className={cx("item-date")}>{convertDate(item.feedbackDate)}</span>
          </div>
        </td>
        <td className={cx(item.isResponsed ? "item-status" : "item-status-red")}>{item.isResponsed ? "Đã phản hồi" : "Chưa phản hồi"}</td>
        <td style={{ width: '15%' }}>
          {
            openDetail ?
              <button onClick={handleClickFeedbackItem} className={cx("item-button")} type="button" >
                Đóng
              </button>
              :
              <button onClick={handleClickFeedbackItem} className={cx("item-button")} type="button" >
                Xem chi tiết
              </button>
          }

        </td>
      </tr>

      {
        openDetail &&
        <tr className={cx('feedback-detail')}>
          <td colSpan={3} style={{ padding: '0' }}>
            <FeedbackDetail itemFeedbackActive={item} getAllFeedbacks={getAllFeedbacks}/>
          </td>
        </tr>
      }
    </>
  );
}

export default ItemFeedback;