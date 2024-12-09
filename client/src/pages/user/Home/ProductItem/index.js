import { useEffect, useState } from 'react';
import styles from './ProductItem.module.scss'
import classNames from 'classnames/bind';
import { ComboBox } from '~/components/Input';
import { GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantityCartItem, deleteCartItem, increaseQuantityCartItem } from '~/redux/api/userRequest';
const cx = classNames.bind(styles);
export default function ProductItem({props}) {
    const dispatch = useDispatch();
    let currentUser = useSelector((state) => state.auth.login.currentUser)

    let [colors, setColors] = useState([])
    let [sizes, setSizes] = useState([])
    let [defaultSelection, setDefaultSelection] = useState({
        image: "",
        colorName: "",
        size: ""
    })

    useEffect(() => {
        if(props){
            getDefaultSelection();
            setColors(createListColorCBB())
        }
    }, [])

    function createListColorCBB(){
        const list = props?.product
        if(list.colors){
            const colors = [];
            list.colors.forEach((element, index) => {
                if(Object.keys(element.sizes).length !== 0)
                    colors.push({id: index, name: element.colorName})
            });
            return colors
        }
        else
            return [{id: -1, name: ''}]
    }

    function createListSizeCBB(currentColor){
        const list = props?.product
        if(list?.colors){
            const color = list.colors.find((i) => i.colorName === currentColor)
            if(color){
                return color.sizes.map((s, index) => {
                    return {id: index, name: s.sizeName}
                })
            }
            else return []
        }
        else
            return []
    }

    function onColorchange(e){
        const list = props?.product
        if(list?.colors){
            const listSize = createListSizeCBB(e.name)
            setSizes(listSize)
            let have = true
            if(!listSize.map((item) => item.name).includes(defaultSelection.size)){
                have = false
            }
            have ? 
                setDefaultSelection({...defaultSelection, colorName: e.name, image: list?.colors.find(item => item.colorName === e.name)?.images[0]})
            :
                setDefaultSelection({size: listSize[0].name, colorName: e.name, image: list?.colors.find(item => item.colorName === e.name)?.images[0]})
        }
    }

    function onSizeChange(e){
        setDefaultSelection({...defaultSelection, size: e.name})
    }

    function getDefaultSelection(){
        const list = props?.product?.colors;
        if(list){
            for(let i = 0; i < list.length; i++){
                if(list[i].sizes && list[i].images && list[i].colorName === props.color){
                    setDefaultSelection({
                        image: props?.product?.colors[i]?.images[0],
                        colorName: props.color,
                        size: props.size
                    })
                    setSizes(createListSizeCBB(list[i].colorName))
                    return;    
                }
            }
        }
    }
    return ( 
        <>
            <hr style={{width: '100%', height: '1px', backgroundColor: '#f1f1f1'}}/>
            <div className={cx('container')}>
                <div>
                    <img className={cx('image')} src={defaultSelection.image} alt=''/>
                </div>
                <div className={cx('rightContent')}>
                    <div>
                        <div className={cx('outerContent')}>
                            <span className={cx('productName')}>{props.productName}</span>
                            <span className={cx('colorSize')}>{`${defaultSelection.colorName} / ${defaultSelection.size}`}</span>
                        </div>
                        <div className={cx('selector')}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                                <div style={{fontWeight: '600'}}>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(props.productPrice)}</div>
                                {/* <del style={{fontWeight: '400', fontSize: '14px', color: '#ccc'}}>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(props.exportPrice)}</del> */}
                            </div>  
                        </div>
                        <div>x{props.quantity}</div>
                    </div>
                </div>
            </div>
        </>
    );
}