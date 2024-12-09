import classNames from "classnames/bind";
import styles from './AdvanceDropdown.module.scss'
import { AiOutlinePlus } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const cx = classNames.bind(styles)

function AdvanceDropdown({ items, style, onClick, indexA, indexB, addNewItem, editItem, removeItem, keyProperty, keyId }) {
    const [isAdd, setAdd] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [textEdit,setTextEdit] = useState('');
    const [idEdit, setIdEdit] = useState('');

    const handleClickItem = (item) => {
        onClick(item, indexA, indexB)
    }
    const handleClickRemoveItem = async (e, id, item) => {
        e.stopPropagation()
        removeItem(id, item)

    }
    const handleClickAddNewItem = (e) => {
        e.stopPropagation()
        setAdd(true)
    }
    const handleClickSaveNewItem = (e) => {
        e.stopPropagation()
        if (inputElement.current.value.trim() !== '') {
            const value = inputElement.current.value.trim()
            addNewItem(value);
        }

        setAdd(false)
    }
    const handleClickCancleAddNewItem = (e) => {
        e.stopPropagation()
        setAdd(false)
    }
    const handleClickConfirmEditItem = (e) => {
        e.stopPropagation()
        if (inputElementEdit.current.value.trim() !== '') {
            const value = inputElementEdit.current.value.trim()
            editItem(idEdit,value, textEdit);
        }

        setEdit(false)
    }
    const handleClickCancleEditItem = (e) => {
        e.stopPropagation()
        setEdit(false)
    }
    const handleClickEditItem = (e, item, id) => {
        e.stopPropagation()
        setEdit(true)
        setTextEdit(item)
        setIdEdit(id)
        setAdd(false)
    }
    useEffect(() => {
        if (isAdd) {
            inputElement.current.focus();
        }
    }, [isAdd])
    useEffect(() => {
        if (isEdit) {
            inputElementEdit.current.focus();
            inputElementEdit.current.value = textEdit
        }
    }, [isEdit])
    const inputElement = useRef(null)
    const inputElementEdit = useRef(null)
    return (

        <div className={cx('wrapper')} style={style}>
            {
                isAdd &&
                <div style={{ padding: '0 20px' }}>
                    <input ref={inputElement} type="text" onClick={(e) => e.stopPropagation()} />
                </div>
            }
            {
                isEdit &&
                <div style={{ padding: '0 20px' }}>
                    <input ref={inputElementEdit} type="text" onClick={(e) => e.stopPropagation()} />
                </div>
            }
            <ul className={cx('listItem')}>
                {items && items.map((item, index) =>
                    <li key={index} onClick={() => handleClickItem(item[keyProperty])}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>{item[keyProperty]}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div onClick={(e) => handleClickEditItem(e,item[keyProperty],item[keyId])} style={{ padding: '0 2px' }}>
                                    <CiEdit />
                                </div>
                                <div onClick={(e) => handleClickRemoveItem(e, item[keyId], item[keyProperty])} style={{ padding: '0 2px' }}>
                                    <strong >X</strong>
                                </div>

                            </div>
                        </div>
                    </li>
                )}
            </ul>
            {
                !isAdd && !isEdit &&
                <div onClick={(e) => handleClickAddNewItem(e)} style={{ padding: '5px', background: '#fff', textAlign: 'center' }}>
                    <span className={cx('btn', 'btn-succeed')} style={{ color: '#fff' }}><AiOutlinePlus className={cx('icon')} /> Thêm mới</span>
                </div>
            }
            {
                isAdd &&
                <div style={{ padding: '5px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <span onClick={(e) => handleClickSaveNewItem(e)} className={cx('btn', 'btn-succeed')} style={{ color: '#fff' }}> Xác nhận</span>
                    <span onClick={(e) => handleClickCancleAddNewItem(e)} className={cx('btn', 'btn-failed')} style={{ color: '#fff' }}> Hủy</span>
                </div>
            }
            {
                isEdit &&
                <div style={{ padding: '5px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <span onClick={(e) => handleClickConfirmEditItem(e)} className={cx('btn', 'btn-succeed')} style={{ color: '#fff' }}> Xác nhận</span>
                    <span onClick={(e) => handleClickCancleEditItem(e)} className={cx('btn', 'btn-failed')} style={{ color: '#fff' }}> Hủy</span>
                </div>
            }
        </div>
    );
}

export default AdvanceDropdown;