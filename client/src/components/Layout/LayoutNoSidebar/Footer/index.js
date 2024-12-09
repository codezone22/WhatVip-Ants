import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { PiPhoneCall } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import ModalReport from "~/components/ModalReport/index.js";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import CustomeButton from "~/components/CustomeButton/CustomeButton";
import { useState } from "react";
const cx = classNames.bind(styles);
function Footer() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <footer className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("footer-inner")}>
          <div className={cx("footer-inner_sidebar")}>
            <div className={cx("layout2")}>
              <div>
                <h4 className={cx("title")}>SHOPAPP lắng nghe bạn!</h4>
                <p style={{ marginBottom: "30px" }}>
                  Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến
                  đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ
                  và sản phẩm tốt hơn nữa.
                </p>
                <div>
                  <CustomeButton
                    onClick={handleOpenModal}
                    title={"Đóng góp ý kiến"}
                    bgHover={"white"}
                    textColorHover={"black"}
                    containStyles={{
                      width: "150px",
                      backgroundColor: "#2f5acf",
                      color: "white",
                      borderRadius: "20px",
                      padding: "10px 0px 10px 24px",
                      border: "0",
                      marginBottom: "30px",
                    }}
                  />
                </div>
              </div>
              <div className={cx("separate")}></div>
              <div className={cx("item-middle")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ marginRight: "12px" }}>
                    <PiPhoneCall size={35} />
                  </div>
                  <div>
                    <div>Hotline</div>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>
                      1900.272737 - 028.7777.2737
                    </div>
                    <div>(8:30 - 22:00)</div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ marginRight: "12px" }}>
                    <MdEmail size={35} />
                  </div>
                  <div>
                    <div>Email</div>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>
                      watcherforMe@gmail.com
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("separate")}></div>
            </div>

            <div className={cx("footer-social")}>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaFacebook />{" "}
              </a>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaInstagram />{" "}
              </a>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaYoutube />{" "}
              </a>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaTiktok />{" "}
              </a>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaLinkedin />{" "}
              </a>
            </div>
          </div>
          <div className={cx("footer-inner-menu")}>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>SHOPAPPCLUB</h4>
              <ul>
                <li>
                  <a href="#">Đăng kí thành viên</a>
                </li>
                <li>
                  <a href="#">Ưu đãi & Đặc quyền</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>CHÍNH SÁCH</h4>
              <ul>
                <li>
                  <a href="#">Chính sách đổi trả 60 ngày</a>
                </li>
                <li>
                  <a href="#">Chính sách khuyến mãi</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="#">Chính sách giao hàng</a>
                </li>
              </ul>
              <h4 className={cx("menu_title")} style={{ marginTop: "20px" }}>
                WATCHER.APP
              </h4>
              <ul>
                <li>
                  <a href="#">Lịch sử thay đổi website</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>CHĂM SÓC KHÁCH HÀNG</h4>
              <ul>
                <li>
                  <a href="#">Trải nghiệm mua sắm 100% hài lòng</a>
                </li>
                <li>
                  <a href="#">Hỏi đáp - FAQs</a>
                </li>
              </ul>
              <h4 className={cx("menu_title")} style={{ marginTop: "20px" }}>
                KIẾN THỨC MẶC ĐẸP
              </h4>
              <ul>
                <li>
                  <a href="#">Hướng dẫn chọn size</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Group mặc đẹp sống chất</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>TÀI LIỆU - TUYỂN DỤNG</h4>
              <ul>
                <li>
                  <a href="#">Tuyển dụng</a>
                </li>
                <li>
                  <a href="#">Đăng ký bản quyền</a>
                </li>
              </ul>
              <h4 className={cx("menu_title")} style={{ marginTop: "20px" }}>
                VỀ SHOPAPP
              </h4>
              <ul>
                <li>
                  <a href="#">ShopApp 101</a>
                </li>
                <li>
                  <a href="#">DVKH Xuất sắc</a>
                </li>
                <li>
                  <a href="#">Câu chuyện về ShopApp</a>
                </li>
                <li>
                  <a href="#">Nhà máy</a>
                </li>
                <li>
                  <a href="#">Care & Share</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>ĐỊA CHỈ LIÊN HỆ</h4>
              <ul>
                <li>
                  Văn phòng Hà Nội: Tầng 3-4, Tòa nhà BMM, KM2, Đường Phùng
                  Hưng, Phường Phúc La, Quận Hà Đông, TP Hà Nội
                </li>
                <li>
                  Văn phòng Tp HCM: Lầu 1, Số 163 Trần Trọng Cung, Phường Tân
                  Thuận Đông, Quận 7, Tp. Hồ Chí Minh
                </li>
              </ul>
            </div>
          </div>

          <div className={cx("footer-final")}>
            <div className={cx("footer-final1")}>
              <div style={{ fontWeight: "bold" }}>
                @ CÔNG TY TNHH FASTECH ASIA
              </div>
              <div style={{ fontSize: "11px" }}>
                Mã số doanh nghiệp: 0108617038. Giấy chứng nhận đăng ký doanh
                nghiệp do Sở Kế hoạch và Đầu tư TP Hà Nội cấp lần đầu ngày
                20/02/2019.
              </div>
            </div>
            <div className={cx("footer-final2")}>
              <img src="https://www.coolmate.me/images/footer/logoSaleNoti.png" />
              <img src="https://www.coolmate.me/images/footer/Coolmate-info.png" />
              <img src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2022/dmca_protected_15_120.png" />
              <img src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2022/handle_cert.png" />
            </div>
          </div>
        </div>
      </div>
      {openModal && <ModalReport setOpenModal={setOpenModal} />}
    </footer>
  );
}

export default Footer;
