import React, { useEffect } from "react";
import { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FeedbackDetail.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";
import { BsFillSendFill, BsFillImageFill } from "react-icons/bs";
import ContentItemFeedback from "~/components/ContentItemFeedback";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import HashLoader from "react-spinners/HashLoader";
const cx = classNames.bind(styles);

function FeedbackDetail({ itemFeedbackActive, getAllFeedbacks }) {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [text, setText] = useState("");
  const [textValidate, setTextValidate] = useState("");
  const [showTextValidate, setShowTextValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
              imageBase64: reader.result,
            },
          ]);
        };
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  const sendFeedback = async () => {
    if (text.trim().length === 0 && images.length === 0) {
      setTextValidate("Vui lòng nhập đầy đủ thông tin để đóng góp ý kiến !");
      setShowTextValidate(true);
    } else {
      setTextValidate("");
      setShowTextValidate(false);

      setLoading(true);
      try {
        const newListImage = images.map((itemp) => {
          return itemp.imageBase64;
        });
        const data = {
          email: itemFeedbackActive.user.email,
          title: itemFeedbackActive.title,
          content: text,
          images: [...newListImage],
        };
        const res = await axios.patch(
          `${baseUrl}/api/feedbacks/responseFeedback/${itemFeedbackActive._id}`,
          data
        );
        getAllFeedbacks();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ContentItemFeedback contentFeedback={itemFeedbackActive} />

          {itemFeedbackActive.isResponsed ? (
            <div className={cx("container-reply")}>
              <div className={cx("container-res")}>
                <div style={{ display: "flex", marginLeft: "8px" }}>
                  Phản hồi
                </div>
                <span
                  className={cx("message-review")}
                  style={{ marginLeft: "8px" }}
                >
                  {itemFeedbackActive.response.content}
                </span>
                {itemFeedbackActive.response.imagesRsp.map((item, index) => {
                  return (
                    <div className={cx("images-list")} key={index}>
                      <img className={cx("image")} src={item} alt="img" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "10px 0px 5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-end",
                  margin: "12px",
                  cursor: "pointer",
                }}
              >
                <div onClick={sendFeedback}>
                  <BsFillSendFill size={24} style={{ marginRight: "10px" }} />
                </div>
                <div onClick={selectFiles}>
                  <BsFillImageFill size={24} style={{ marginRight: "10px" }} />
                </div>
                <input
                  type="file"
                  name="file"
                  multiple
                  hidden
                  ref={fileInputRef}
                  onChange={onFileSelect}
                />
              </div>

              <div style={{ width: "100%" }}>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    padding: "5px 12px 10px",
                    border: "0.5px solid #8c8c8c",
                    borderRadius: "4px 4px 0 4px",
                  }}
                >
                  {images.map((image, index) => (
                    <div className={cx("images-list")} key={index}>
                      <img
                        className={cx("image")}
                        src={image.url}
                        alt={image.name}
                      />
                      <AiFillCloseCircle
                        className={cx("delete-img")}
                        onClick={() => deleteImage(index)}
                      />
                    </div>
                  ))}
                  <TextareaAutosize
                    className={cx("input-text")}
                    placeholder="Nhập nội dung"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                </div>
              </div>
            </div>
          )}
          {showTextValidate && (
            <span
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "12px",
                color: "red",
              }}
            >
              {textValidate}
            </span>
          )}
        </div>
      </div>
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
    </>
  );
}

export default FeedbackDetail;
