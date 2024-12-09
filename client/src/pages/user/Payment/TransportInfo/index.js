import { ComboBox, RadioButton, TextInput } from '~/components/Input';
import styles from './TransportInfo.module.scss'
import classNames from 'classnames/bind';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { AiFillExclamationCircle } from 'react-icons/ai';
const cx = classNames.bind(styles);
const TransportInfo =  forwardRef(({props, error, userMail, _ref}) => {
    let [selected, setSelected] = useState({})

    useImperativeHandle(_ref, () => ({
        getChildSelected: () => {
            return selected;
        }
    }));

    useEffect(() => {
        props ? setSelected({...props, email: userMail, note: ''}) : setSelected({
            name: "",
            province: "",
            district: "",
            phoneNumber: '',
            email: "",
            ward: "",
            detail: "",
            note: "",
            default: false,
        })
    }, [props])

    useEffect(() => {
        if(Object.keys(error).length !== 0) setFirstLoad(false)
        console.log(Object.keys(error).length)
    }, [error])

    let [firstLoad, setFirstLoad] = useState(true);
    
    const handleChange = (e, name) => {
        setSelected({...selected, [name]: e.target.value})
        setFirstLoad(false)
        console.log((!selected.detail && !firstLoad))
    }
    const provinceApi = "https://provinces.open-api.vn/api/";
    const districtApi = (code) => `https://provinces.open-api.vn/api/p/${code}?depth=2`
    const wardApi = (code) => `https://provinces.open-api.vn/api/d/${code}?depth=2`

    const [provinces, setProvince] = useState([])
    const [districts, setDistrict] = useState([])
    const [wards, setWard] = useState([])

    useEffect(() => {
       props ? fetch(provinceApi)
            .then((res) => res.json())
            .then((json) => {
                setProvince(json)
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
            }) 
        :
            fetch(provinceApi)
            .then((res) => res.json())
            .then((json) => {
                setProvince(json)
            })
    }, [props])

    const filterProvince = (e) => {
        fetch(districtApi(e.code))
        .then((res) => res.json())
        .then((json) => {
            setDistrict(json.districts)
            if(selected.district) selected.district = ''
            if(selected.ward) selected.ward = ''
            selected.province = e.name
            setWard([])
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
                setSelected({...selected})
            });
    }
    return ( 
        <>
            <div className={cx('outer')}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '15px'}}>
                        <div style={{width: '50%'}}>
                            <TextInput placeHolder={'Họ và tên'} type={"type_2"} value={selected.name} handleChange={(e) => handleChange(e, "name")}/>
                            {!firstLoad && error.name && !selected.name && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng nhập họ và tên</span>}
                        </div>
                        <div style={{width: '50%'}}>
                            <TextInput placeHolder={'Số điện thoại'} type={"type_2"} value={selected.phoneNumber} handleChange={(e) => handleChange(e, "phoneNumber")}/>
                            {!firstLoad && error.phoneNumber && !selected.phoneNumber && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle classphoneNumber="mr-1"/>Vui lòng nhập số điện thoại</span>}
                        </div>
                    </div>
                    <div>
                        <TextInput placeHolder={'Email'} type={"type_2"} value={selected.email} handleChange={(e) => handleChange(e, "email")}/>
                        {!firstLoad && error.email && !selected.email && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng nhập địa chỉ email</span>}
                    </div>
                    <div>
                            <TextInput placeHolder={'Địa chỉ'} type={"type_2"} value={selected.detail} handleChange={(e) => handleChange(e, "detail")}/>
                            {!firstLoad && error.detail && !selected.detail && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng nhập chi tiết địa chỉ</span>}
                    </div>
                    <div className={cx('outer-address')} >
                        <div className={cx('addressItem')}>
                            <ComboBox listItems={provinces} placeHolder={'Chọn Tỉnh/Thành phố'} selectedItem={selected.province} type={'list'} filterValueSelected={filterProvince}/>
                            {!firstLoad && error.province && !selected.province && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng chọn tỉnh</span>}
                        </div>
                        <div className={cx('addressItem')}>
                            <ComboBox listItems={districts} placeHolder={'Chọn Quận/Huyện'} selectedItem={selected.district} type={'list'} filterValueSelected={filterDistrict}/>    
                            {!firstLoad && error.district && !selected.district && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng chọn quận/huyện</span>}
                        </div>
                        <div className={cx('addressItem')}>
                            <ComboBox listItems={wards} placeHolder={'Chọn Phường/Xã'} selectedItem={selected.ward} type={'list'} filterValueSelected={(e)=> {setSelected({...selected, 'ward': e.name})}}/>          
                            {!firstLoad && error.ward && !selected.ward && <span style={{display: 'flex', 'flexDirection': 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '4px'}}><AiFillExclamationCircle className="mr-1"/>Vui lòng chọn phường/xã</span>}
                        </div>
                    </div>
                    <div>
                        <TextInput placeHolder={'Ghi chú thêm(Ví dụ: Giao hàng giờ hành chính)'} type={"type_2"} value={selected.note} handleChange={(e) => handleChange(e, "note")}/>
                    </div>
                </div>
        </>
    );
})

export default React.memo(TransportInfo);