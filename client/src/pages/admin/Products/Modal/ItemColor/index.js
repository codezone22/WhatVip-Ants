import classNames from "classnames/bind";
import styles from './ItemColor.module.scss'
import { useRef, useState } from "react";
import { useEffect } from "react";
import images from "~/assets/img";
import { ChromePicker } from "react-color";
import { AiFillCaretDown, AiFillCaretUp, AiFillCaretRight, AiOutlineClose } from "react-icons/ai";
import { RiSubtractLine } from "react-icons/ri";
import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
    handleRemoveColor,
    handleChangeColorCode, handleChangeColorName, handleColorAddImage, handleColorChangeImage,
    handleColorRemoveImage, handleColorAddSize, handleColorChangeSizeName, handleColorRemoveSize
} from "~/redux/slices/productSlice";
const cx = classNames.bind(styles)

function ItemColor({ index }) {
    let color = useSelector(state => state.product.currentUpdateProduct.colors[index])
    let colorsLength = useSelector(state => state.product.currentUpdateProduct.colors.length)
    const dispatch = useDispatch()
    const [showMore, setShowMore] = useState(index === 0);
    const [showColorPicker, setShowColorPicker] = useState(false)
    const elemenChromePicker = useRef(null)

    const handleChangeInputImage = (e, indexColor, indexImage) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                let res = reader.result;
                dispatch(handleColorChangeImage({
                    indexColor,
                    indexImage,
                    base64: res
                }))
            }
        }
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (elemenChromePicker.current && !elemenChromePicker.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [elemenChromePicker]);

    return (
        <div className={cx('wrapper')}>
            <div style={{ marginTop: '8px', transition: 'height 0.3s linear' }}>
 
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {
                        !showMore ?
                            <span onClick={() => setShowMore(prev => !prev)} style={{ cursor: 'pointer', fontSize: '20px', marginBottom: '4px', marginRight: '8px', alignSelf: 'flex-start' }}><AiFillCaretRight /></span>
                            :
                            <span onClick={() => setShowMore(prev => !prev)} style={{ cursor: 'pointer', fontSize: '20px', marginBottom: '4px', marginRight: '8px', alignSelf: 'flex-start' }}><AiFillCaretDown /></span>
                    }
                    <div className={cx('form-group2')}>
                        <label>Màu</label>
                        <input onChange={(e) => dispatch(handleChangeColorName({ index, colorName: e.target.value }))} placeholder="Đen,..." type="text" style={{ width: '80px', textAlign: 'center', background: 'transparent' }} value={color.colorName} />

                    </div>
                    <div style={{ marginLeft: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <label style={{ fontWeight: '700' }}>Chọn màu:</label>
                        <div onClick={() => setShowColorPicker(true)} style={{ width: '20px', height: '20px', borderRadius: '50%', background: color.colorCode || '#000', position: 'relative', cursor: 'pointer' }}>
                            {
                                showColorPicker &&
                                <div ref={elemenChromePicker} style={{ position: 'absolute', zIndex: '1000', left: '120%' }}>
                                    <ChromePicker onChange={newColor => dispatch(handleChangeColorCode({ index, colorCode: newColor.hex }))} color={color.colorCode || '#000'} disableAlpha />
                                </div>
                            }
                        </div>

                    </div>
                    {
                        colorsLength > 1 &&
                        <div style={{ marginLeft: '24px' }}>
                            <span onClick={() => dispatch(handleRemoveColor({index}))} style={{ cursor: 'pointer', padding: '4px 4px', borderRadius: '50%', display: 'inline-flex', backgroundColor: 'red', fontSize: '16px' }}><RiSubtractLine style={{ color: '#fff' }} /></span>
                        </div>
                    }


                </div>

                {
                    showMore &&
                    <>
                        {/* Image */}
                        <div style={{ padding: '28px' }}>
                            {
                                color.images.map((item, index2) => {
                                    return (
                                        <div key={index2} className={cx('img-wrapper')} style={{ marginRight: '32px' }}>
                                            <img src={item || images.productImageDefault} style={{ cursor: 'pointer', objectFit: 'cover', width: '100px', height: '88px' }}>
                                            </img>
                                            {
                                                !item && <p>+ Thêm</p>
                                            }


                                            <input type="file" onChange={(e) => handleChangeInputImage(e, index, index2)} accept="image/jpg, image/jpeg, image/png" />

                                            <span onClick={() => dispatch(handleColorRemoveImage({ indexColor: index, indexImage: index2 }))} className={cx('icon-remove-img')} >
                                                <AiOutlineClose style={{ fontSize: '14px', color: 'red' }} /></span>

                                        </div>
                                    )
                                })
                            }

                        </div>
                        {
                            color.images.length < 5 &&
                            <div style={{ marginLeft: '28px', marginBottom: '20px' }} onClick={() => dispatch(handleColorAddImage({ index }))} className={cx('btn', 'btn-succeed')}>Add Image</div>
                        }

                        {/* Sỉze */}
                        <div style={{ padding: '28px', paddingTop: '0px' }}>
                            <label style={{ fontWeight: '700' }}>Bảng size ({color.sizes.length}): <span onClick={() => dispatch(handleColorAddSize({ index }))} className={cx('icon-plus')}><BsPlusCircleFill /></span></label>
                            {
                                color.sizes.length === 0 &&
                                <div>
                                    <div style={{ padding: '36px 24px 24px 24px', display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <img width={250} height={125} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8vxcXbyvy5JHHV_7wMO_HQv-j6aZxX0I5MA&usqp=CAU" />
                                        <div style={{ marginTop: '16px', fontSize: '16px', fontWeight: '600', letterSpacing: '1.6px', color: '#ccc' }}>EMPTY</div>
                                    </div>
                                </div>
                            }
                            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {
                                    color.sizes.map((item, index2) => {
                                        return (

                                            <div key={index2} className={cx('wrap-size')}>
                                                <div className={cx('size')}>
                                                    <div className={cx('form-group2')} style={{ marginRight: '48px' }}>
                                                        <label>Size:</label>
                                                        <input onChange={(e) => dispatch(handleColorChangeSizeName({ indexColor: index, indexSize: index2, sizeName: e.target.value }))} value={item.sizeName} type="text" style={{ width: '80px', textAlign: 'center', background: 'transparent' }} placeholder="S,M,..." />
                                                    </div>
                                                    <div className={cx('form-group2')}>
                                                        <label>Số lượng:</label>
                                                        <input value={item.quantity} type="text" style={{ width: '80px', textAlign: 'center', background: 'transparent' }} disabled />
                                                    </div>


                                                </div>
                                                {
                                                    color.sizes.length > 1 &&
                                                    <div>
                                                        <span onClick={() => dispatch(handleColorRemoveSize({ indexColor: index, indexSize: index2 }))} style={{ cursor: 'pointer', padding: '4px 4px', borderRadius: '50%', display: 'inline-flex', backgroundColor: 'red', fontSize: '16px' }}><RiSubtractLine style={{ color: '#fff' }} /></span>
                                                    </div>
                                                }


                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>

                    </>
                }

            </div>
        </div>
    );
}

export default ItemColor;