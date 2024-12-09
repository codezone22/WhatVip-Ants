import React, { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./ItemReview.module.scss";
import ReactStars from "react-stars";
import { useState } from "react";
import CustomeButton from "../CustomeButton/CustomeButton";
import TextareaAutosize from "react-textarea-autosize";
import { BsFillImageFill, BsFillSendFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import convertDate from "~/utils/convertDate";
import HashLoader from "react-spinners/HashLoader";
import { MdDeleteForever } from "react-icons/md";
import MessageBoxDelete from "~/pages/admin/Reviews/MessageBoxDelete";

const cx = classNames.bind(styles);

function ItemReview({ item, getReviewsById, list }) {
  const [isSent, setIsSent] = useState(false);
  const [isOpenRes, setIsOpen] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }
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

  const handleSendReview = async () => {
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
        item.response = {
          content: text,
          imagesRsp: [...newListImage],
        };
        item = { ...item };
        await axios.patch(`${baseUrl}/api/reviews/responseReview`, item);
        getReviewsById();
        setIsSent(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className={cx("container-item")}>
        {showMessageBox && (
          <MessageBoxDelete
            title="Thông báo"
            content="Bạn có chắc chắn muốn xóa bình luận này. Dữ liệu sẽ không thể phục hồi sau khi xóa !"
            setShowMessageBox={setShowMessageBox}
            id={item._id}
            getReviewsById={getReviewsById}
            btnYes="Đồng ý"
            btnNo="Không đồng ý"
            list={list}
          />
        )}
        <MdDeleteForever className={cx("icon-delete")} onClick={() => setShowMessageBox(true)}/>
        <div className={cx("avt-img")}>
          <img src={item.user.profilePhoto} alt="avt" />
        </div>

        <div className={cx("container-rieview")}>
          <div>
            <div style={{ fontWeight: "600", marginBottom: "6px" }}>
              {item.user.fullName}
            </div>
            <div>
              <ReactStars
                count={5}
                size={12}
                value={item.star === false ? 0 : item.star}
                color1="#C4C4C4"
                color2="#ffb21d"
                edit={false}
              />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "6px",
                fontWeight: "300",
                fontSize: "13px",
                color: "#909090",
              }}
            >
              <div>{convertDate(item.reviewDate)}</div>
              <div style={{ marginLeft: "4px" }}>
                | Loại: ( {item.color} / {item.size} )
              </div>
            </div>
          </div>
          <div className={cx("container-images")}>
            <div style={{ marginTop: "8px", color: "#909090" }}>Đánh giá: </div>
            <span className={cx("message-review")}>{item.content}</span>
            <div className={cx("images-list")}>
              {item.imagesRv.map((i) => (
                <img src={i} alt="imgReview" />
              ))}
            </div>
          </div>

          {item.isResponsed === true && (
            <div className={cx("container-reply")}>
              <div className={cx("container-res")}>
                <div style={{ display: "flex" }}>
                  Phản hồi vào ngày
                  <div style={{ marginLeft: "4px" }}>
                    {convertDate(item.response?.date)}
                  </div>
                </div>
                <span className={cx("message-review")}>
                  {item.response?.content}
                </span>
                <div className={cx("images-list")}>
                  {item.response?.imagesRsp.map((i) => (
                    <img className={cx("image")} src={i} alt="imgRes" />
                  ))}
                </div>
              </div>
            </div>
          )}
          {!isOpenRes && item.isResponsed === false ? (
            <div className={cx("container-reply")}>
              <div className={cx("container-res")}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  <CustomeButton
                    onClick={handleOpen}
                    title={"Phản hồi"}
                    isLeft={true}
                    bgHover={"#2f5acf"}
                    textColorHover={"white"}
                    containStyles={{
                      width: "110px",
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "8px",
                      padding: "10px 0px 10px 25px",
                      border: 0,
                      display: "flex",
                      alignSelf: "flex-end",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : isOpenRes && item.isResponsed === false ? (
            <>
              {isSent ? (
                <div className={cx("container-reply")}>
                  <div className={cx("container-res")}>
                    <div style={{ display: "flex" }}>
                      Phản hồi vào ngày
                      <div style={{ marginLeft: "4px" }}>
                        {convertDate(item.response?.date)}
                      </div>
                    </div>
                    <span className={cx("message-review")}>{text}</span>
                    {images.map((image, index) => (
                      <div className={cx("images-list")} key={index}>
                        <img
                          className={cx("image")}
                          src={image.url}
                          alt={image.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
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

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      width: "100%",
                      marginTop: "18px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignSelf: "flex-end",
                        marginBottom: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <div onClick={handleSendReview}>
                        <BsFillSendFill
                          size={24}
                          style={{ marginRight: "10px" }}
                        />
                      </div>
                      <div onClick={selectFiles}>
                        <BsFillImageFill size={24} />
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
                    <div style={{ width: "85%" }}>
                      <div
                        style={{
                          width: "98%",
                          height: "auto",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          flexWrap: "wrap",
                          padding: "12px",
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
                    <MdClose
                      style={{
                        marginRight: "20px",
                        fontSize: "26px",
                        display: "flex",
                        alignSelf: "flex-end",
                        marginBottom: "10px",
                        cursor: "pointer",
                      }}
                      onClick={handleClose}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <></>
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

export default ItemReview;
