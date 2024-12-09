import classNames from "classnames/bind";
import { useState } from "react";
import ReactStars from "react-stars";
import styles from "./ItemProduct.module.scss";

const cx = classNames.bind(styles);

function ItemProduct() {

    const list = {
        colors: [
            {
                img: "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/November2023/3dsinglet.1.jpg",
                img_color: "#fff",
            },
            {
                img: "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/November2023/3dsinglet.3_28.jpg",
                img_color: "#14413a",
            },
            {
                img: "https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/November2023/3dsinglet.2.jpg",
                img_color: "#000",
            },
        ],
    }

    const [imageColor, setImageColor] = useState(list.colors[0].img);
    const [indexItem, setIndexItem] = useState(0);
    const handleClick = (itemImage, index) => {
        setImageColor(itemImage);
        setIndexItem(index)
    }
  return (
    <div className={cx("container-item")}>
        <img
          style={{ width: "100%", height: "350px", borderTopLeftRadius: "4px", borderTopRightRadius: '4px' }}
          src={imageColor}
          alt="abc"
        />
        <div style={{ display: "flex", alignItems: "center", marginLeft: '15px'}}>
          {list.colors.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "46px",
                  height: "28px",
                  borderRadius: "10px",
                  margin: "10px 5px",
                  textAlign: 'center',
                  display: "flex", alignItems: "center", justifyContent: 'center',
                  border: index === indexItem ? '3px solid #c7c7c7' : "1px solid #ccc",
                  backgroundColor: item.img_color
                }}
                onClick={() => handleClick(item.img, index)}             
              >
              </div>
            );
          })}
        </div>

        <span className={cx('three-dot')}>
          Áo chạy bộ CoolmateXtra Siêu thoáng
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "17px",
            margin: "8px 20px 0px",
          }}
        >
          <span style={{ color: "#000", fontWeight: "bold" }}>250.000 đ</span>
          <span
            style={{
              marginLeft: "10px",
              color: "#ccc",
              textDecorationLine: "line-through",
            }}
          >
            350.000 đ
          </span>
          <span style={{ marginLeft: "10px", color: "red", fontWeight: "500" }}>
            10 %
          </span>
        </div>

        <div style={{display: 'flex', alignItems: 'center', marginLeft: '15px'}}>
          <span style={{margin: '4px 5px 0', fontSize: '16px', padding: '6px 0', color: '#ccc', fontStyle: 'italic'}}>(4.5)</span>
          <ReactStars
            count={5}
            size={24}
            color1={"#ccc"}
            color2={"#ffd700"}
            edit={false}
            value={4.5}
          />
        </div>
      </div>
  );
}

export default ItemProduct;
