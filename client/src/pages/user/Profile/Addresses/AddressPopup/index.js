import { useEffect, useState } from 'react';
import styles from './AddressPopup.module.scss'
import classNames from 'classnames/bind';
import { AiFillExclamationCircle, AiOutlineClose } from 'react-icons/ai';
import { ComboBox, TextInput, RadioButton } from '~/components/Input';
import { createAddresses, updateAddresses } from '~/redux/api/userRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { BsCheck } from 'react-icons/bs';
const cx = classNames.bind(styles);

function AddressPopup({props, onClose, isAdd, reload, onCloseAndReload, list}) {
    const [selected, setSelected] = useState({})
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const [errorProvince, setERProvince] = useState(false);
    const [errorDictrict, setERDictrict] = useState(false);
    const [errorWard, setERWard] = useState(false);
    useEffect(() => {
        if(props && !isAdd){
            setSelected({...props})
            setValue("name", props.name)
            setValue("phoneNumber", props.phoneNumber)
            setValue("detail", props.detail)
        }
    }, [isAdd, props])

    useEffect(() => {
       if(isAdd){
            setValue("name", "")
            setValue("phoneNumber", "")
            setValue("detail","")
            setSelected({
                "province": "",
                "district": "",
                "ward": "",
                "default": false
            })
       }
       else{
            if(props){
                setSelected({...props})
                setValue("name", props.name)
                setValue("phoneNumber", props.phoneNumber)
                setValue("detail", props.detail)
                setValue("default", props.default)
            }
       }
    }, [reload])

    const handleChange = (e, name) => {
        setSelected({...selected, [name]: e.target.value})
    }

    const dispatch = useDispatch()
    let currentUser = useSelector((state) => state.auth.login.currentUser)

    // const handleSubmit = () => {
    //     isAdd ?
    //         createAddresses(currentUser, selected, dispatch, (res) => {
    //             onCloseAndReload(res)
    //         })
    //     : 
    //         updateAddresses(currentUser, selected, dispatch, (res) => {
    //             onCloseAndReload(res)
    //         })
    // }
    const provinceApi = "https://provinces.open-api.vn/api/";
    const districtApi = (code) => `https://provinces.open-api.vn/api/p/${code}?depth=2`
    const wardApi = (code) => `https://provinces.open-api.vn/api/d/${code}?depth=2`
    const [provinces, setProvince] = useState([])
    const [districts, setDistrict] = useState([])
    const [wards, setWard] = useState([])

    useEffect(() => {
        fetch(provinceApi)
            .then((res) => res.json())
            .then((json) => {
                setProvince(json)
                if(!isAdd){
                    const code = Array.from(json).find(item => item.name === props.province)?.code
                    code &&
                        fetch(districtApi(code))
                        .then((res) => res.json())
                        .then((json) => {
                            const code = Array.from(json.districts).find(item => item.name === props.district)?.code
                            setDistrict(json.districts)
                            code &&
                                fetch(wardApi(code))
                                .then((res) => res.json())
                                .then((json) => {
                                    setWard(json.wards)
                                });
                        });
                }
                else{
                    setDistrict([])
                    setWard([])
                }
            });
    }, [reload])

    const validatePhoneNumber = (phone) => {
        return String(phone)
          .toLowerCase()
          .match(
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
          );
      };

    const onSubmitForm = (data) => {
        if(selected.province === ""){
            setERProvince(selected.province === "");
            return;
        }
        if(selected.district === ""){
            setERDictrict(selected.district === "");
            return;
        }
        if(selected.ward === ""){
            setERWard(selected.ward === "");
            return;
        }
        
        const ar = {
            ...selected,
            ...data,
            province: selected.province,
            district: selected.district,
            ward: selected.ward,
            default: selected.default,
        }



        isAdd ?
            createAddresses(currentUser, ar, dispatch, (res) => {
                onCloseAndReload(res)
            })
        : 
            updateAddresses(currentUser, ar, dispatch, (res) => {
                onCloseAndReload(res)
            })
    }

    const handleCBBER = (e) => {
        setERProvince(selected.province === "");
        setERWard(selected.ward === "");
        setERDictrict(selected.district === "");
    }

    const filterProvince = (e) => {
        fetch(districtApi(e.code))
        .then((res) => res.json())
        .then((json) => {
            setDistrict(json.districts)
            if(selected.district) selected.district = ''
            if(selected.ward) selected.ward = ''
            selected.province = e.name
            setERProvince(false)
            setSelected({...selected})
        });
    }

    const filterDistrict = (e) => {
        fetch(wardApi(e.code))
            .then((res) => res.json())
            .then((json) => {
                setWard(json.wards)
                if(selected.ward) selected.ward = ''
                selected.district = e.name
                setERDictrict(false)
                setSelected({...selected})
            });
    }
    const handleCheckBox = ()  => {
        if(!isAdd && props?.default){
            notify("warning", "Địa chỉ hiện tại đã là địa chỉ mặc định")
            return
        }
        selected.default ? 
            setSelected({...selected, default: false })
        :
            setSelected({...selected, default: true})
    }
    const notify = (type, message) => toast(message, { type: type });
    return ( 
        <>
            <div className={cx('container')}>
                <h1 className={cx('account-popup__title')}>{isAdd ? "Thêm địa chỉ" : "Cập nhật địa chỉ"}</h1>
                <div className={cx('btnClose')} onClick={onClose}>
                    <AiOutlineClose/>
                </div>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className={cx('outer')}>
                    <div className={cx('row-item')} >
                        <div className={cx('row-item-input')}>
                                <TextInput name="name" register={register("name", {
                                                required: "Vui lòng nhập họ tên!",
                                            })} error={errors.name ? errors.name.message : ""} placeHolder={'Họ và tên'} type={"type_2"} />
                            </div>
                            <div className={cx('row-item-input')}>
                                <TextInput name="phoneNumber" register={register("phoneNumber", {
                                                required: "Vui lòng nhập số điện thoại!",
                                            })} error={errors.phoneNumber ? errors.phoneNumber.message : ""} placeHolder={'Số điện thoại'} type={"type_2"} />
                            </div>
                        </div>
                        <div className={cx('row-item')}>
                        <div className={cx('row-item-input')}>
                                <TextInput name="detail" register={register("detail", {
                                                required: "Vui lòng nhập chi tiết địa chỉ!",
                                            })} error={errors.detail ? errors.detail.message : ""} placeHolder={'Địa chỉ'} type={"type_2"} />
                            </div>
                            <div className={cx('row-item-input')} style={{ position: 'relative', zIndex: 1000}}>
                                <ComboBox listItems={provinces} placeHolder={'Chọn Tỉnh/Thành phố'} err={errorProvince} selectedItem={selected.province} type={'list'} filterValueSelected={filterProvince}/>
                                {errorProvince && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng chọn tỉnh</span>}
                            </div>
                        </div>
                        <div className={cx('row-item')}>
                        <div className={cx('row-item-input')}>
                                <ComboBox listItems={districts} placeHolder={'Chọn Quận/Huyện'} err={errorDictrict} selectedItem={selected.district} type={'list'} filterValueSelected={filterDistrict}/>
                                {errorDictrict && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng chọn quận/huyện</span>}

                            </div>
                            <div className={cx('row-item-input')}>
                                <ComboBox listItems={wards} placeHolder={'Chọn Phường/Xã'} err={errorWard} selectedItem={selected.ward} type={'list'} filterValueSelected={(e)=> {setSelected({...selected, 'ward': e.name}); setERWard(false)}}/>
                                {errorWard && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng chọn phường, xã</span>}
                            </div>
                        </div>
                        <div>
                        <li  onClick={handleCheckBox} className={cx('outer-child-radio')}>
                            <div className={cx('sub-outer-radio')}>
                                <div>
                                    <div className={cx('dot-outer-radio')}>
                                        <div className={cx('dot-not-tick-radio')} color="#FFF"></div>
                                        <div style={{visibility: selected?.default ? "visible": "hidden"}} className={cx('dot-tick-radio')} color="#FFF"><BsCheck color="#FFF"/></div>
                                    </div>
                                </div>
                                <span className={cx('item-name-radio')}>Đặt làm địa chỉ mặc định</span>
                            </div>
                        </li>
                        </div>
                        <div style={{display: 'flex', width: '100%', flexDirection:'column', alignItems: 'end'}}>
                            <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                                <div className={cx('account-info__btn_cancel')} style={{width: '50%'}} onClick={onClose}>
                                    <span className={cx('account-info__btn-text_cancel')}>Hủy</span>
                                </div>
                                <button type='submit' className={cx('account-info__btn')} style={{width: '50%'}} onClick={() => {handleSubmit(); handleCBBER()}}>
                                    <span className={cx('account-info__btn-text')}>{isAdd ? 'Thêm' : 'Cập nhật'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddressPopup;