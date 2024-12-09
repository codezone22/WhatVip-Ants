import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { IoSearch, IoBagHandle, IoClose } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import DetailPopup from "./DetailPopup";
import SearchPopup from "./SearchPopup";
import SettingPopup from "./SettingPopup";
import Modal from "~/components/Modal";
import { Login, SignUp, ChangePass } from "~/pages/auth";
import { useDispatch, useSelector } from "react-redux";
import { BiAlignLeft } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import CartPopup from "./CartPopup";
import { getCartProducts } from "~/redux/api/userRequest";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function Header() {
  let [login, setLogin] = useState(false);
  let currentUser = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const overLay = useRef();
  const hideOverLay = () => {
    overLay.current.checked = false
  }
  let cartProducts = useSelector(state => state.user?.cart?.cartProducts)
  let cartProductsNonUser = useSelector(state => state.nonUser?.cart?.cartProductsNonUser)
  const [indexCategoryActive, setIndexCategoryActive] = useState(-1);
  const [showDetailPopUp, setShowDetailPopup] = useState(false);
  const [showSearchPopUp, setShowSearchPopup] = useState(false);
  const [showCartPopUp, setShowCartPopup] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [popup, setPopup] = useState("login");
  const [openSideBar, setOpenSidebar] = useState(true);

  const handleCategoryClick = (index) => {
    setShowDetailPopup(false);

    // Chuyển hướng đến trang collection
    navigate(`/collection/${categories[index].category}`);
  };
  const categories = [
    {
      category: "Watches",
      listTypes: [
        {
            name: "Đồng hồ analog",
            link: `/collection/1`,
        },
        {
            name: "Đồng hồ kỹ thuật số",
            link: `/collection/2`,
        },
        {
            name: "Đồng hồ thông minh",
            link: `/collection/3`,
        },
        {
            name: "Đồng hồ thể thao",
            link: `/collection/4`,
        },
    ],
    images: [
        {
            src: "https://image.donghohaitrieu.com/wp-content/uploads/2023/11/BST-dong-ho-nam-ban-chay.jpg",  // Replace with actual image URL for Analog Watch
            alt: "Đồng hồ analog",
        },
        {
            src: "https://image.donghohaitrieu.com/wp-content/uploads/2023/11/BST-dong-ho-nu-ban-chay.jpg",  // Replace with actual image URL for Digital Watch
            alt: "Đồng hồ kỹ thuật số",
        },
        {
            src: "https://image.donghohaitrieu.com/wp-content/uploads/2023/10/bst-dong-ho-moi.jpg",  // Replace with actual image URL for Smartwatch
            alt: "Đồng hồ thông minh",
        },
    ]    
    },
  ]

  const handleMouseOver = (index) => {
    setIndexCategoryActive(index);
    setShowDetailPopup(true);
  };
  const dispatch = useDispatch()

  const handleNav = (e) => {
    if (e === "login") setPopup("login");
    else if (e === "signup") setPopup("signup");
    else setPopup("forgot");
  };

  return (
    <div className={cx("wrapper")}>
      <Modal visible={login} setModal={setLogin}>
        {popup === "login" ? (
          <Login navSignup={handleNav} navForgot={handleNav} />
        ) : popup === "signup" ? (
          <SignUp navLogin={handleNav} />
        ) : (
          <ChangePass navLogin={handleNav} />
        )}
      </Modal>

      {openSideBar ? (
        <BiAlignLeft
          onClick={() => setOpenSidebar(!openSideBar)}
          className={cx("icon-menu")}
        />
      ) : (
        <>
          <div
            onClick={() => setOpenSidebar(!openSideBar)}
            className={cx("overlay-sidebar", { active: !openSideBar })}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={cx("sidebar-wrapper")}
            >
              <IoClose
                onClick={() => setOpenSidebar(!openSideBar)}
                className={cx("icon-close")}
              />
              <div className={cx("list-categorys")}>
                <div className={cx("item-list-category")}>Tất cả</div>
                {categories.map((item) => {
                  return (
                    <div className={cx("item-list-category")}>
                      {item.category}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      <a href="/user" className={cx("logo-wrapper")}>
        <div>SHOP</div>
        <div className={cx("child2")}>APP</div>
      </a>

      <div className={cx("container-middle")}>
        <div
          onMouseLeave={() => setShowDetailPopup(false)}
          className={cx("categories")}
        >
          {
            <>
              <div className={cx("item-category")}>Tất cả</div>

              {categories.map((item, index) => {
                return (
                  <div
                    onMouseOver={() => handleMouseOver(index)}
                    onClick={() => handleCategoryClick(index)}
                    className={cx("item-category")}
                  >
                    {item.category}
                  </div>
                );
              })}
            </>
          }
          {showDetailPopUp && (
            <DetailPopup
              category={categories[indexCategoryActive]}
              onMouseLeave={() => setShowDetailPopup(false)}
            />
          )}
        </div>

        <div
          onMouseLeave={() => setShowSearchPopup(false)}
          className={cx("search-wrapper")}
        >
          <div className={cx("search")}>
            <div style={{ padding: "0 12px", cursor: "pointer" }}>
              <IoSearch style={{ color: "#000", fontSize: "24px" }} />
            </div>
            <div className={cx("input-wrapper")}>
              <input
                onClick={() => setShowSearchPopup((prev) => !prev)}
                onChange={(e) => {
                  setValueSearch(e.target.value);
                  console.log(e);
                }}
                className={cx("input-search")}
                type="text"
                value={valueSearch}
                placeholder="Tìm kiếm"
              />
            </div>
            <div
              onClick={() => setValueSearch("")}
              style={{ padding: "0 12px", cursor: "pointer" }}
            >
              <IoMdClose style={{ color: "#000", fontSize: "24px" }} />
            </div>
            {showSearchPopUp && (
              <SearchPopup
                searchKey={valueSearch}
                onMouseLeave={() => setShowSearchPopup(false)}
              />
            )}
          </div>
        </div>
      </div>
      <div className={cx("user")}>
        <input
          ref={overLay}
          type="checkbox"
          hidden
          className={cx("main__header-navBar-hide-open")}
          id={cx("main__header-navBar-hide-open")}
        />
        <div className={cx("main__header-navBar")}>
          <SettingPopup closeBtn={hideOverLay} />
        </div>
        <label
          for={cx("main__header-navBar-hide-open")}
          className={cx("main__header-navbar-overlay")}
        ></label>
        <label for={cx(currentUser ? "main__header-navBar-hide-open" : "")}>
          <div
            onClick={() => {
              !currentUser && setLogin(true);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              <FaUserCircle style={{ color: "#fff", fontSize: "24px" }} />
            </div>
            {currentUser ? (
              <div style={{ marginLeft: "5px", marginTop: "5px" }}>{`Hi, ${
                currentUser.fullName.split(" ")[
                  currentUser.fullName.split(" ").length - 1
                ]
              }`}</div>
            ) : null}
          </div>
        </label>
        <div onClick={() => {navigate("/cart")}}>
          <div
            style={{ cursor: "pointer" }}
            onMouseMove={() => {
              setShowCartPopup(true);
            }}
          >
            <IoBagHandle style={{ color: "#fff", fontSize: "24px" }} />
            {showCartPopUp && (
              <CartPopup cartProducts={currentUser ? cartProducts : cartProductsNonUser} onMouseLeave={() => setShowCartPopup(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
