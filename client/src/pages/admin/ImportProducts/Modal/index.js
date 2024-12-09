

import classNames from "classnames/bind";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { IoSquareOutline, IoCheckboxSharp, IoInformationCircleOutline } from "react-icons/io5";
import { AiFillCaretDown, AiFillCaretUp, AiFillCaretRight } from "react-icons/ai";
import { GrFormClose, GrFormSubtract } from "react-icons/gr";
import { BsSave } from "react-icons/bs";
import { MdPublish } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { RiSubtractLine } from "react-icons/ri";

import { BsPlusCircleFill } from "react-icons/bs";





import styles from './Modal.module.scss'
import DropDown from "../../Products/DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
    handleAddColor, handleRemoveColor, handleAddSize,
    handleRemoveSize, handleChangeSizeQuantity, handleChangeColorName,
    handleClickShowMore, handleChangeSizeName, handleSetQuantity
} from "~/redux/slices/importProductsSlice";

const cx = classNames.bind(styles)

function Modal({ setModal, indexItemImport }) {
    const importItem = useSelector(state => state.importProduct.listImportProducts[indexItemImport]);
    const dispatch = useDispatch()
    const [formErrors, setFormErrors] = useState({})

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        for (let i = 0; i < importItem.colors.length; i++) {
            let isError = false;


            for (let i = 0; i < importItem.colors.length; i++) {
                if (importItem.colors[i].colorName.trim() === '') {
                    errors.colorName = 'Vui lòng chọn màu'
                    isError = true;
                    break;
                }
                if (isError) break;
                for (let x = 0; x < importItem.colors[i].sizes.length; x++) {
                    if (importItem.colors[i].sizes[x].sizeName.trim() === '') {
                        errors.sizeName = `Vui lòng chọn size trong của màu ${importItem.colors[i].colorName}`
                        isError = true;
                        break;
                    }
                    if (importItem.colors[i].sizes[x].quantity.trim() === '') {
                        errors.quantity = `Vui lòng nhập số lượng của size ${importItem.colors[i].sizes[x].sizeName} trong màu ${importItem.colors[i].colorName}`
                        isError = true;
                        break;
                    }
                    if (!(/^\d+$/.test(importItem.colors[i].sizes[x].quantity.trim()))) {
                        errors.quantity = `Size ${importItem.colors[i].sizes[x].sizeName} màu ${importItem.colors[i].colorName}: Số lượng phải là một số > 0`
                        isError = true;
                        break;
                    }
                    else {
                        if (Number(importItem.colors[i].sizes[x].quantity.trim()) === 0) {
                            errors.quantity = `Size ${importItem.colors[i].sizes[x].sizeName} màu ${importItem.colors[i].colorName}: Số lượng phải là một số > 0`
                            isError = true;
                            break;
                        }
                    }
                }
                if (isError) break;
            }
        }


        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            isValid = false
        }
        else setFormErrors({})
        return isValid;

    }
    const handleClickSave = () => {
        let valid = validateForm();
        if (valid) {
            dispatch(handleSetQuantity({ index: indexItemImport }));
            setModal(false)
        }
    }

    return (

        <div className={cx('overlay')}>
            <div className={cx('container')}>

                {/* Header */}
                <div className={cx('header')}>
                    Nhập hàng
                </div>

                {/* Tabpanel */}
                <div className={cx('tabpanel')}>
                    <div className={cx('tabpanel-item-active')}>
                        Thông tin
                    </div>
                </div>
                <div className={cx('body')}>
                    {formErrors.sizeName && <p style={{ color: 'red' }}>{formErrors.sizeName}</p>}
                    {formErrors.colorName && <p style={{ color: 'red' }}>{formErrors.colorName}</p>}
                    {formErrors.quantity && <p style={{ color: 'red' }}>{formErrors.quantity}</p>}
                    <div>
                        <label style={{ fontWeight: '700' }}>Bảng màu ({importItem.colors.length}): <span onClick={() => dispatch(handleAddColor({ index: indexItemImport }))} className={cx('icon-plus')}><BsPlusCircleFill /></span>

                        </label>

                        {/* Color */}
                        <div>
                            {
                                importItem.colors.map((itemA, indexA) => {
                                    return (
                                        <div key={indexA} style={{ marginTop: '8px', height: itemA.showMore === false ? '40px' : 'auto', overflow: 'hidden', transition: 'height 0.3s linear' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    itemA.showMore === false ?
                                                        <span onClick={() => dispatch(handleClickShowMore({ index: indexItemImport, indexColor: indexA }))} style={{ cursor: 'pointer', fontSize: '20px', marginBottom: '4px', marginRight: '8px' }}><AiFillCaretRight /></span>
                                                        :
                                                        <span onClick={() => dispatch(handleClickShowMore({ index: indexItemImport, indexColor: indexA }))} style={{ cursor: 'pointer', fontSize: '20px', marginBottom: '4px', marginRight: '8px' }}><AiFillCaretDown /></span>
                                                }
                                                <div className={cx('form-group')}>
                                                    <label>Màu</label>

                                                    <div className={cx('custom-selector')}>
                                                        <select className={cx('select-size')} onChange={(e) => dispatch(handleChangeColorName({ index: indexItemImport, indexColor: indexA, colorName: e.target.value }))} value={itemA.colorName}>
                                                            <option value={''} selected>Chọn màu</option>
                                                            {

                                                                importItem.dropdownListColors.map((item, index) => (
                                                                    <option key={index} value={item}>{item}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                {
                                                    importItem.colors.length > 1 &&
                                                    <div style={{ marginLeft: '24px', marginTop: '10px' }}>
                                                        <span onClick={() => dispatch(handleRemoveColor({ index: indexItemImport, indexColor: indexA }))} style={{ cursor: 'pointer', padding: '4px 4px', borderRadius: '50%', display: 'inline-flex', backgroundColor: 'red', fontSize: '16px' }}><RiSubtractLine style={{ color: '#fff' }} /></span>
                                                    </div>
                                                }
                                            </div>


                                            {/* Sỉze */}
                                            <div style={{ padding: '28px', paddingTop: '0px' }}>
                                                <label style={{ fontWeight: '700', marginTop: '16px' }}>Bảng size ({itemA.sizes.length}):
                                                    <span onClick={() => dispatch(handleAddSize({ index: indexItemImport, indexColor: indexA }))} className={cx('icon-plus')}>
                                                        <BsPlusCircleFill />
                                                    </span>
                                                </label>
                                                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                    {
                                                        itemA.sizes.map((itemB, indexB) => {
                                                            return (

                                                                <div key={indexB} className={cx('wrap-size')}>
                                                                    <div className={cx('size')}>
                                                                        <div className={cx('form-group')} style={{ marginRight: '24px' }}>
                                                                            <label>Size:</label>
                                                                            <div className={cx('custom-selector')}>
                                                                                <select className={cx('select-size')} 
                                                                                onChange={(e) => dispatch(handleChangeSizeName({ index: indexItemImport, indexColor: indexA, indexSize: indexB, sizeName: e.target.value }))} 
                                                                                value={itemB.sizeName}>
                                                                                    <option value={''} selected>Chọn size</option>
                                                                                    {
                                                                                        itemA.colorName &&
                                                                                        itemA.dropdownListSizes.map((item, index) => (
                                                                                            <option key={index} value={item}>{item}</option>
                                                                                        ))
                                                                                    }
                                                                                </select>
                                                                            </div>

                                                                        </div>
                                                                        <div className={cx('form-group')} >
                                                                            <label>Số lượng:</label>
                                                                            <input value={itemB.quantity}
                                                                                onChange={(e) => dispatch(handleChangeSizeQuantity({ index: indexItemImport, indexColor: indexA, indexSize: indexB, quantity: e.target.value }))}
                                                                                placeholder="20" type="text" style={{ width: '80px', textAlign: 'center', background: 'transparent' }} disabled={itemB.sizeName ? false : true} />
                                                                        </div>


                                                                    </div>

                                                                    {
                                                                        itemA.sizes.length > 1 &&
                                                                        <div>
                                                                            <span onClick={() => dispatch(handleRemoveSize({ index: indexItemImport, indexColor: indexA, indexSize: indexB }))}
                                                                                style={{ cursor: 'pointer', padding: '4px 4px', borderRadius: '50%', display: 'inline-flex', backgroundColor: 'red', fontSize: '16px' }}>
                                                                                <RiSubtractLine style={{ color: '#fff' }} />
                                                                            </span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>






                <div className={cx('footer')}>
                    <span onClick={handleClickSave} className={cx('btn', 'btn-succeed')}><BsSave style={{ marginRight: '6px', fontSize: '16px' }} />   Lưu</span>


                </div>
            </div>

        </div>

    );
}

export default Modal;