import React from "react";
import classNames from "classnames/bind";
import styles from "./ItemDashboard.module.scss";
import {
  AiOutlineRise,
  AiOutlineFall,
  AiOutlineDollarCircle,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const cx = classNames.bind(styles);

function ItemDashboard({ title, percent, value, isIncrease = true }) {
  return (
    <div className={cx("container-item")}>
      <div style={{ display: "flex", justifyContent: "space-between", width:'250px' }}>
        <span
          style={{
            marginRight: "10px",
            fontSize: "14px",
            color: "#81838B",
            fontWeight: "400",
          }}
        >
          {title}
        </span>
        
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#495057",
            fontSize: "22px",
            fontWeight: "bold",
            marginRight: '10px'
          }}
        >
          {value}
        </span>
        {title === "DOANH THU (VND)" && (
          <div
            style={{
              padding: "10px 14px",
              backgroundColor: "#daf4f0",
              borderRadius: "6px",
            }}
          >
            <AiOutlineDollarCircle
              style={{
                color: "#0ab39c",
                fontSize: "20px",
                fontWeight: "500",
              }}
            />
          </div>
        )}
        {title === "NHẬP HÀNG (VND)" && (
          <div
            style={{
              padding: "10px 14px",
              backgroundColor: "#dff0fa",
              borderRadius: "6px",
            }}
          >
            <AiOutlineShoppingCart
              style={{
                color: "#299cdb",
                fontSize: "20px",
                fontWeight: "500",
              }}
            />
          </div>
        )}
        {title === "SỐ ĐƠN HÀNG" && (
          <div
            style={{
              padding: "10px 14px",
              backgroundColor: "#D4FFCD",
              borderRadius: "6px",
            }}
          >
            <AiOutlineShopping
              style={{
                color: "#49E332",
                fontSize: "20px",
                fontWeight: "500",
              }}
            />
          </div>
        )}
        {title === "SỐ KHÁCH HÀNG" && (
          <div
            style={{
              padding: "10px 14px",
              backgroundColor: "#fef4e4",
              borderRadius: "6px",
            }}
          >
            <BiUserCircle
              style={{
                color: "#f9be4b",
                fontSize: "20px",
                fontWeight: "500",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDashboard;
