import classNames from "classnames/bind";
import { AiOutlineSearch, AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import React, { useEffect, useState, createContext, useRef } from "react";


import styles from './History.module.scss'
import Bill from "./Bill";

const cx = classNames.bind(styles)

function History() {



    return (
        <div className={cx('wrapper')}>
            <div className={cx('tabpanel')}>
                <div className={cx('tabpanel-item', 'active')}>
                    Hóa đơn
                </div>
                <div className={cx('tabpanel-item')}>
                    Nhập hàng
                </div>
            </div>

            <div className={cx('content')}>
                <Bill />
            </div>

        </div>
    );
}

export default History;