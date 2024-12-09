import styles from './CustomCombobox.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import {RxChevronDown } from 'react-icons/rx';
const cx = classNames.bind(styles);

function ComboBox({placeHolder, icon, listItems, filterValueSelected, type, selectedItem, name, err}) {
    let [selected, setSelected] = useState({id: -1, name: ""})
    let [dropdown, setDropDown] = useState('hide')
    let [hover, setHover] = useState('')
    let input = useRef()
    useEffect(()=>{
        if(selected.id !== -1) filterValueSelected(selected)
    },[selected])

    
    function toggleDropDown(){
        if(dropdown){
            setDropDown('')
            setHover('form_hover')
        }
        else{
            setDropDown('hide')
            setHover('')
        }
    }

    return (
        <div>
            {
                type === "table" ? (
                    <div className={cx(`${type}_container`)}>
                        <div className={cx(`${type}_form-field`, `${type}_${hover}`)} ref={input} tabIndex={0} onClick={toggleDropDown} onBlur={() => {setDropDown('hide'); setHover('')}}>
                            {icon && <div className={cx(`${type}_form-icon`)}>{icon}</div>}
                            {
                                name ? <div className={cx(`${type}_form-input`)}>{name}</div> : <>
                                    <div className={cx(`${type}_form-input`)} value={selected.name}>{selected.name}</div>
                                    <label for="name" className={cx(`${type}_form-label`)}>{placeHolder}</label>
                                </>
                            }
                            <div className={cx(`${type}_form-icon-drop-down`)}><RxChevronDown strokeWidth={1}/></div>
                            <div className={cx(`${type}_drop-down-list`, `${type}_${dropdown}`)}>
                                {
                                    listItems ? listItems.map((item, index) => {
                                        return (
                                            <>
                                                <div className={cx(`${type}_item-outer`)} key={index} onClick={(e) => {setSelected(item); name = null}} style={{backgroundColor: `${selected.id === item.id ? '#2f5acf': ''}`}}>
                                                    <span className={cx(`${type}_item-content`)} style={{ color: `${selected.id === item.id ? 'white': ''}`}}>{item.name}</span>
                                                </div>
                                            </> 
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                    </div>
                ) :
                (type === 'list' ? (
                    <div className={cx(`${type}_container`)}>
                        <div className={cx(`${type}_form-field`, `${type}_${hover}`)} ref={input} tabIndex={0} onClick={toggleDropDown} onBlur={() => {setDropDown('hide'); setHover('')}}>
                            <div className={cx(`${type}_form-input`)} style={err ? {borderColor: '#a9252b'} : {}} value={selectedItem ? selectedItem : (selectedItem === "" ? "" : selected.name)}><span>{selectedItem ? selectedItem : (selectedItem === "" ? "" : selected.name)}</span></div>
                            <label for="name" className={cx(`${type}_form-label`)}>{placeHolder}</label>
                            <div className={cx(`${type}_form-icon-drop-down`)}><RxChevronDown strokeWidth={1}/></div>
                            <div className={cx(`${type}_drop-down-list`, `${type}_${dropdown}`)}>
                                {
                                    listItems ? listItems.map((item, index) => {
                                        return (
                                            <>
                                                <div className={cx(`${type}_item-outer`)} key={index} onClick={(e) => {setSelected(item);}} style={{backgroundColor: `${selected.name === item.name ? '#999': ''}`}}>
                                                    <span className={cx(`${type}_item-content`)} style={{ color: `${selected.name === item.name ? 'white': ''}`}}>{item.name}</span>
                                                </div>
                                            </> 
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                    </div>
                ) : 
                (type === 'list-gray' ? (
                    <div className={cx(`${type}_container`)}>
                        <div className={cx(`${type}_form-field`, `${type}_${hover}`)} ref={input} tabIndex={0} onClick={toggleDropDown} onBlur={() => {setDropDown('hide'); setHover('')}}>
                            <div className={cx(`${type}_form-input`)} value={selectedItem ? selectedItem : (selectedItem === "" ? "" : selected.name)}><span>{selectedItem ? selectedItem : (selectedItem === "" ? "" : selected.name)}</span></div>
                            <label for="name" className={cx(`${type}_form-label`)}>{placeHolder}</label>
                            <div className={cx(`${type}_form-icon-drop-down`)}><RxChevronDown strokeWidth={1}/></div>
                            <div className={cx(`${type}_drop-down-list`, `${type}_${dropdown}`)}>
                                {
                                    listItems ? listItems.map((item, index) => {
                                        return (
                                            <>
                                                <div className={cx(`${type}_item-outer`)} key={index} onClick={(e) => {setSelected(item);}} style={{backgroundColor: `${selected.id === item.id ? '#999': ''}`}}>
                                                    <span className={cx(`${type}_item-content`)} style={{ color: `${selected.id === item.id ? 'white': ''}`}}>{item.name}</span>
                                                </div>
                                            </> 
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                    </div>
                ) : 
                null))
            }
        </div>
    );
}

export default ComboBox;