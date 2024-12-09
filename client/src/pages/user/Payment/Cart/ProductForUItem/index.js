import { useEffect, useState } from 'react';
import styles from './ProductForUItem.module.scss'
import classNames from 'classnames/bind';
import { ComboBox } from '~/components/Input';
import { GoTrash } from "react-icons/go";
import { IoMdThermometer } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { importItemToOrder } from '~/redux/actions';
import Orders from '~/pages/admin/Orders';
const cx = classNames.bind(styles);
function ProductForUItem({props, handleItemToOrder}) {
    const dispatch = useDispatch();
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
        if(props.colors){
            const colors = [];
            props.colors.forEach((element, index) => {
                if(Object.keys(element.sizes).length !== 0)
                    colors.push({id: index, name: element.colorName})
            });
            return colors
        }
        else
            return [{id: -1, name: ''}]
    }

    function createListSizeCBB(currentColor){
        if(props.colors){
            const color = props.colors.find((i) => i.colorName === currentColor)
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
        if(props.colors){
            const listSize = createListSizeCBB(e.name)
            setSizes(listSize)
            let have = true
            if(!listSize.map((item) => item.name).includes(defaultSelection.size)){
                have = false
            }
            have ? 
                setDefaultSelection({...defaultSelection, colorName: e.name, image: props.colors.find(item => item.colorName === e.name)?.images[0]})
            :
                setDefaultSelection({size: listSize[0].name, colorName: e.name, image: props.colors.find(item => item.colorName === e.name)?.images[0]})
        }
    }

    function onSizeChange(e){
        setDefaultSelection({...defaultSelection, size: e.name})
    }

    function getDefaultSelection(){
        if(props?.colors){
            for(let i = 0; i < props.colors.length; i++){
                if(props.colors[i].sizes && props.colors[i].images){
                    setDefaultSelection({
                        image: props.colors[i].images[0],
                        colorName: props.colors[i].colorName,
                        size: props.colors[i].sizes[0].sizeName
                    })
                    setSizes(createListSizeCBB(props.colors[i].colorName))
                    return;
                }
            }
        }
    }
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('image')}>
                    <img className={cx('image')} src={defaultSelection.image} alt=''/>
                </div>
                <div className={cx('rightContent')}>
                    <div>
                        <div className={cx('outerContent')}>
                            <span className={cx('productName')}>{props.productName}</span>
                        </div>
                        <div className={cx('selector')}>
                            <div style={{width: '120px'}}>
                                <ComboBox listItems={colors} placeHolder={''} selectedItem={defaultSelection.colorName} type={'list-gray'} filterValueSelected={(e) => onColorchange(e)}/>
                            </div>
                            <div style={{width: '70px'}}>
                                <ComboBox listItems={sizes} placeHolder={''} selectedItem={defaultSelection.size} type={'list-gray'} filterValueSelected={onSizeChange}/>
                            </div>
                        </div>
                        <div style={{fontSize: '14px', fontStyle: 'italic'}}>Top 10 sản phẩm bán chạy</div>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'flex-end', marginBottom: '15px'}}>
                            <div style={{fontWeight: '600'}}>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(props.exportPrice * (1 - props.discountPerc  / 100))}</div>
                            <del style={{fontWeight: '400', fontSize: '14px', color: '#ccc'}}>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(props.exportPrice)}</del>
                        </div>
                        <div className={cx('account-info__btn')} onClick={() => handleItemToOrder(props, defaultSelection)}>
                            <span className={cx('account-info__btn-text')}>Lấy ngay</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductForUItem;