import styles from './RadioButton.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BsCheck } from 'react-icons/bs';
const cx = classNames.bind(styles);

function RadioButton({listItems, filterValueChecked, selectedItem}) {
    let [selected, setSelected] = useState({})
    useEffect(()=>{
        filterValueChecked(selected)
    
      },[selected])

    return (
        <>
            <div className={cx('container')}>
                <ul className={cx('outer')}>
                    {
                        listItems.map((item, index) => {
                            return (
                                <li key={index} value={index} onClick={() => {selected?.id === -1 ? setSelected(item): setSelected({id: -1, name: ''})}} className={cx('outer-child')}>
                                    <div className={cx('sub-outer')}>
                                        <div>
                                            <div className={cx('dot-outer')}>
                                                <div className={cx('dot-not-tick')} color="#FFF"></div>
                                                <div style={{visibility: `${selected?.id === item.id ? "visible": "hidden"}`}} className={cx('dot-tick')} color="#FFF"><BsCheck color="#FFF"/></div>
                                            </div>
                                        </div>
                                        <span className={cx('item-name')}>{item.name}</span>
                                    </div>
                                </li>
                            )                        
                        })
                    }
                </ul>
            </div>
        </>
    );
}

export default RadioButton;