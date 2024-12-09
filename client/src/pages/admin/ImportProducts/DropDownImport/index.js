import classNames from "classnames/bind";
import styles from './DropDownImport.module.scss'
import { useEffect } from "react";
import { useState } from "react";

const cx = classNames.bind(styles)

function DropDownImport({items, style, onClick}) {
    const handleClickItem = (item) => {
        onClick(item)
    }
    const [listQuantity,setListQuantity] = useState([])
    
    useEffect(() => {
        const list = [];
        items.forEach(element => {
            const quantityStorage = element.colors.reduce((accumulator, currentValue) => {
                const quantityColor = currentValue.sizes.reduce((acc,curr) => {
                    return acc + curr.quantity
                },0)
                return accumulator + quantityColor;
            },0)
            list.push(quantityStorage)
        });
        setListQuantity([...list])
    },[items])
    return (

        <ul className={cx('wrapper')} style={style}>
            
            {items &&  items.map((item,index) => 
                <li key={index} onClick={() => handleClickItem(item)}>
                    <div className={cx('productImage')}>
                        <img src={item.colors[0]?.images[0]}/>
                    </div>
                    <div className={cx('productInfo')}>
                        <h2>{item.productName}</h2>
                        <div>
                            <span>{item.productCode}</span>
                            <span style={{marginLeft: '30px'}}>Giá: {item.exportPrice}</span>
                        </div>
                        <span>Tồn: {listQuantity[index]}</span>
                    </div>
                </li>
            )}
        </ul>
    );
}

export default DropDownImport;