import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import Select from "react-select";
import styles from "./Feedbacks.module.scss";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import ItemFeedback from "~/components/ItemFeedback";
import { BiSearch } from "react-icons/bi";

const cx = classNames.bind(styles);

function Feedbacks() {
  const cbb = [
    { value: "All", label: "Tất cả" },
    { value: "Responsed", label: "Đã phản hồi" },
    { value: "UnResponsed", label: "Chưa phản hồi" },
  ];
  const [listItemFeedback, setListItemFeedback] = useState([]);
  
  const [textSearch, setTextSearch] = useState("");
  const [listFeedbackTmp, setListFeedbackTmp] = useState([]);

  const handleChangeTextSearch = (e) => {
    setTextSearch(e.target.value);
    const arrSearch = e.target.value.trim() ==='' ? listFeedbackTmp : listFeedbackTmp.filter((item) => {
      return item.title.includes(e.target.value) || item.user.email.includes(e.target.value);
    })
    setListItemFeedback([...arrSearch])
  }

  const handleChangeCbb = (value) => {
    console.log(value.label);
    if (value.label === "Đã phản hồi")
    {
      const arrSearch = listFeedbackTmp.filter((item) => {
        return item.isResponsed === true;
      })
      setListItemFeedback([...arrSearch])
    }
    else if (value.label === "Chưa phản hồi")
    {
      const arrSearch = listFeedbackTmp.filter((item) => {
        return item.isResponsed === false;
      })
      setListItemFeedback([...arrSearch])
    }
    else
    {
      const arrSearch = listFeedbackTmp;
      setListItemFeedback([...arrSearch])
    }
  }

  const getAllFeedbacks = async () => {
    try {
      const config = {};
      const { data } = await axios.get(`${baseUrl}/api/feedbacks/all_feedback`, config);
      console.log(data);
      setListItemFeedback([...data.result]);
      setListFeedbackTmp([...data.result]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);
  
  useEffect(() => {
    console.log(listItemFeedback)
  }, [listItemFeedback]);

  return (
    <div className={cx("wrapper")} style={{ fontSize: "14px" }}>
      <div className={cx("container")}>
        <div>
          <h1>QUẢN LÝ GÓP Ý KHÁCH HÀNG</h1>
          <div style={{ color: "#05CD99" }}>Lalitpur Branch</div>
        </div>
        <div className={cx("content")}>
          <div className={cx("header-content")}>
            <div style={{ display: "flex" }}>
              <form className={cx("search-field")}>
                <BiSearch fontSize={20} style={{position: "absolute", top: "0", left: 0, marginTop: "20px", marginLeft: "18px",}}/>
                <input type="text" name="searchField" id="searchField" className={cx("search-input")} 
                       placeholder="Tìm kiếm" value={textSearch} onChange={handleChangeTextSearch}/>
              </form>
              <Select options={cbb} defaultValue={cbb[0]} className={cx("combobox")} onChange={handleChangeCbb}/>
            </div>
          </div>
          <div style={{padding: "10px 32px 40px", width: "100%", minHeight: "550px",}}>
            <table style={{ width: "100%", borderRadius: "10px", borderColor: "transparent", border: "none", position: "relative",}}>
              <thead className={cx("thead")} style={{ width: "100%", borderRadius: "10px", borderColor: "transparent",border: "none",}}>
                <tr style={{width: "100%", backgroundColor: "#e6f1fe", color: "black", borderRadius: "10px",}}>
                  <th className={cx("col-tbl")} style={{ paddingLeft: "20px" }}>
                    Phản hồi
                  </th>
                  <th className={cx("col-tbl")}>Tình trạng</th>
                  <th className={cx("col-tbl")} style={{ paddingLeft: "20px" }}>
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody className={cx("tbody")}>
                {listItemFeedback.map((item, index) => {
                  return (
                    <React.Fragment>
                      <ItemFeedback
                        key={index}
                        item={item}
                        getAllFeedbacks ={getAllFeedbacks} 
                      />
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer className={cx("sticky-footer")} style={{ zIndex: 10 }}>
        <div className={cx("container")}>
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2023</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Feedbacks;
