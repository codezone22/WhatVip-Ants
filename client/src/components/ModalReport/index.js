import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalReport.module.scss";
import { RiImageAddFill } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";

const cx = classNames.bind(styles);

function ModalReport({ setOpenModal }) {
  const [topic, setTopic] = useState("");
  const [textContent, setTextContent] = useState("");
  const [images, setImages] = useState([]);
  const [textValidate, setTextValidate] = useState("");
  const [showTextValidate, setShowTextValidate] = useState(false);
  const fileInputRef = useRef(null);
  let currentUser = useSelector((state) => state.auth.login.currentUser);
  const [loading, setLoading] = useState(false);
  function selectFiles() {
    fileInputRef.current.click();
  }
  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
  const handleOnChangeTopic = (e) => {
    setTopic(e.target.value);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleSendReport = async () => {
    if (
      topic.trim().length === 0 ||
      (textContent.trim().length === 0 && images.length === 0)
    ) {
      setTextValidate("Vui lòng nhập đầy đủ thông tin để đóng góp ý kiến !");
      setShowTextValidate(true);
    } else {
      setTextValidate("");
      setShowTextValidate(false);
      // Xử lý ở đây
      setLoading(true);
      try {
        const newListImage = images.map((itemp) => {
          return itemp.imageBase64;
        });
        const data = {
          title: topic.toUpperCase(),
          content: textContent,
          images: [...newListImage],
        };

        if (currentUser) {
          const url = `${baseUrl}/api/feedbacks/feedbackOfUser/${currentUser._id}`;
          const res = await axios.post(url, data);
          console.log(res);
          if (res) {
            toast.success("Đóng góp ý kiến thành công", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            });
          }
          setLoading(false);
          setOpenModal(false);
        } else {
          toast.info("Vui lòng đăng nhập để đóng góp ý kiến", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
  };
  return (
    <>
      <div className={cx("wrapper")} onClick={handleClose}>
        <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
          <div className={cx("header")}>
            <span className={cx("title-modal")}>Đóng góp ý kiến</span>
            <span className={cx("close")} onClick={handleClose}>
              &times;
            </span>
          </div>
          <div className={cx("separate")}></div>
          <div className={cx("body-modal")}>
            <div className={cx("container-topic")}>
              <span>
                Tiêu đề <span style={{ color: "red" }}>*</span>
              </span>
              <input
                className={cx("input-topic")}
                type="text"
                onChange={handleOnChangeTopic}
              />
            </div>
            <span
              style={{ fontStyle: "italic", fontSize: "16px", color: "#000" }}
            >
              Nội dung <span style={{ color: "red" }}>*</span>
            </span>
            <div className={cx("content-body")}>
              <div className={cx("content-report")}>
                {images.map((item, index) => {
                  return (
                    <div className={cx("list-images")} key={index}>
                      <img src={item.url} alt={item.name} />
                      <AiFillCloseCircle
                        className={cx("delete-img")}
                        onClick={() => deleteImage(index)}
                      />
                    </div>
                  );
                })}
                <TextareaAutosize
                  className={cx("input-text")}
                  placeholder="Nhập nội dung..."
                  onChange={(e) => setTextContent(e.target.value)}
                  value={textContent}
                />
              </div>

              <div className={cx("container-button-img")}>
                <div className={cx("button-img")} onClick={selectFiles}>
                  <RiImageAddFill className={cx("choose-images")} />
                </div>
                <input
                  type="file"
                  name="file"
                  multiple
                  hidden
                  ref={fileInputRef}
                  onChange={onFileSelect}
                />
                <span onClick={selectFiles}>Thêm ảnh</span>
              </div>
            </div>
            {showTextValidate && (
              <span className={cx("text-validate")}>{textValidate}</span>
            )}
          </div>
          <div className={cx("button-send")} onClick={handleSendReport}>
            GỬI Ý KIẾN
          </div>
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
  )
}

export default ModalReport;
