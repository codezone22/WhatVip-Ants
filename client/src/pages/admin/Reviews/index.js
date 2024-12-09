import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Reviews.module.scss";
import ProductReviewItem from "~/components/ProductReviewItem";
import { BiSearch } from "react-icons/bi";
import Select from "react-select";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";

const cx = classNames.bind(styles);

function Reviews() {
  const cbb = [
    { value: 'All', label: 'Tất cả' },
    { value: 'From 1 star', label: 'Từ 1 sao trở lên' },
    { value: 'From 2 star', label: 'Từ 2 sao trở lên' },
    { value: 'From 3 star', label: 'Từ 3 sao trở lên' },
    { value: 'From 4 star', label: 'Từ 4 sao trở lên' },
    { value: '5 star', label: '5 sao' },
  ]
  const [listAllItemReview, setListAllItemReview] = useState([]);
  const [listItemReviewTmp, setListItemReviewTmp] = useState([]);
  const [textSearch, setTextSearch] = useState("");

  const handleChangeTextSearch = (e) => {
    setTextSearch(e.target.value);
    const arrSearch = e.target.value.trim() ==='' ? listItemReviewTmp : listItemReviewTmp.filter((item) => {
      return item.product.productName.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setListAllItemReview([...arrSearch])
  }

  const handleChangeCbb = (value) => {
    if (value.label === "Từ 1 sao trở lên")
    {
      const arrSearch = listItemReviewTmp.filter((item) => {
        return item.averageStar >= 1;
      })
      setListAllItemReview([...arrSearch])
    }
    else if (value.label === "Từ 2 sao trở lên")
    {
      const arrSearch = listItemReviewTmp.filter((item) => {
        return item.averageStar >= 2;
      })
      setListAllItemReview([...arrSearch])
    }
    else if (value.label === "Từ 3 sao trở lên")
    {
      const arrSearch = listItemReviewTmp.filter((item) => {
        return item.averageStar >= 3;
      })
      setListAllItemReview([...arrSearch])
    }
    else if (value.label === "Từ 4 sao trở lên")
    {
      const arrSearch = listItemReviewTmp.filter((item) => {
        return item.averageStar >= 4;
      })
      setListAllItemReview([...arrSearch])
    }
    else if (value.label === "5 sao")
    {
      const arrSearch = listItemReviewTmp.filter((item) => {
        return item.averageStar === 5;
      })
      setListAllItemReview([...arrSearch])
    }
    else
    {
      const arrSearch = listItemReviewTmp;
      setListAllItemReview([...arrSearch])
    }
  }

  const getAllReviews = async () => {
    try {
      const config = {};
      const { data } = await axios.get(`${baseUrl}/api/reviews/all_review`, config);
      setListAllItemReview([...data.result]);
      setListItemReviewTmp([...data.result]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div className={cx('wrapper')} style={{ fontSize: '14px' }}>
      <div className={cx('container')}>
        <div>
          <h1>QUẢN LÝ ĐÁNH GIÁ CỦA SẢN PHẨM</h1>
          <div style={{ color: '#05CD99' }}>Lalitpur Branch</div>
        </div>

        <div className={cx('content')}>
          <div className={cx('header-content')}>
            <div style={{ display: 'flex' }}>
              <form className={cx('search-field')}>
                <BiSearch fontSize={20} style={{ position: 'absolute', top: '0', left: 0, marginTop: '20px', marginLeft: '18px' }} />
                <input 
                  type='text' 
                  name='searchField' 
                  id='searchField' 
                  className={cx('search-input')} 
                  placeholder='Tìm kiếm'
                  value={textSearch}
                  onChange={handleChangeTextSearch} />
              </form>
              <Select options={cbb}
                defaultValue={cbb[0]}
                className={cx('combobox')} 
                onChange={handleChangeCbb}/>
            </div>
          </div>
          <div className={cx("container-list", "row")}>
            {listAllItemReview.map((item, index) => {
              return (
                <ProductReviewItem
                  key={index}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Reviews;