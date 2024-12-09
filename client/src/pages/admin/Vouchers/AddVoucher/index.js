import styles from './AddVoucher.module.scss';
import { HiOutlineInformationCircle } from 'react-icons/hi'
import classNames from 'classnames/bind';
import Select from 'react-select';
import { CustomeButton } from '~/components';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { dfImgVoucher } from '~/assets/images';
import { useState } from 'react';
import axios from 'axios';
import baseUrl from '~/utils/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);
function AddVoucher({ closeFunc, setVoucherList }) {
    const [isPc, setIsPc] = useState(false)
    const notify = (type, message) => toast(message, { type: type });
    const [applyFor, setApplyFor] = useState('all')
    const [file, setFile] = useState(null)
    const [img, setImage] = useState(null)
    const [err, setErr] = useState(null)
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: 'onChange' });
    const onSubmit = async (dt) => {
        console.log(dt)
        const formData = new FormData();
        formData.append('image', file);
        formData.append('voucherPrice', dt.priceDiscount);
        formData.append('isPercent', isPc);
        formData.append('voucherCode', dt.voucherCode);
        formData.append('expiredDate', dt.endDate);
        formData.append('startDate', dt.startDate);
        formData.append('minPrice', dt.minPrice);
        formData.append('quanlity', dt.quanlity);
        formData.append('description', dt.description);
        formData.append('applyFor', applyFor);
        setErr(null)
        const sd = new Date(dt.startDate)
        const ed = new Date(dt.endDate)
        if (sd > ed) {
            setErr('Ngày hết hạn phải lơn hơn ngày bắt đầu')
            return
        }
        if (!file) {
            setErr('Bạn chưa chọn file ảnh voucher!')
            return
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }

        try {
            const { data } = await axios.post(`${baseUrl}/api/vouchers/addVoucher`, formData, config);
            setVoucherList(prev => [prev, { ...data.result }])

            closeFunc(false)
            notify("success", 'Thêm voucher mới thành công!')

        } catch (error) {
            setErr(error.response.data.error.message)
        }

    }
    const onChangeCheckBox = () => {
        setIsPc(prev => !prev)
    }
    const onImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Cập nhật state với đường link mới của ảnh
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const cbb = [
        { value: 'all', label: 'Tất cả' },
        { value: 'new', label: 'Khách hàng mới' },
        { value: 'close', label: 'Khách hàng thân thiết' }
    ]
    const handleChangeCombobox = (selectedOption) => {
       setApplyFor(selectedOption.value)
    }
    return (
        <div className={cx('wrapper')} style={{ animation: 'dropTop .3s linear' }}>
            <ToastContainer />

            <div style={{ fontWeight: 500, fontSize: '18px', marginBottom: '20px', backgroundColor: 'black', color: 'white', padding: '8px', width: '20%', borderRadius: '4px' }}>Thêm Voucher mới</div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'end', width: '50%' }}>
                    <div style={{ paddingLeft: '4rem', marginBottom: '8px' }}>
                        <img src={img ?? dfImgVoucher} alt='avtVoucher' style={{ width: '250px', height: '140px' }} />
                    </div>
                    <input type='file' id='fileImg' hidden title='Choose Image' accept='image/*' onChange={onImageChange} />
                    <label htmlFor='fileImg' style={{ border: '1px dashed #ccc', marginBottom: '8px', borderRadius: '10px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'end', padding: '4px', marginLeft: '12px', cursor: 'pointer', justifySelf: 'end' }}>Choose Image</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'end', width: '50%' , padding:'0px 45px 0px 45px', marginBottom:'10px'}}>
                    <div className={cx('input-field-left')} >
                        <label  className={cx('label-input')}>Áp dụng cho <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                        <Select options={cbb}
                                defaultValue={cbb[0]}
                                onChange={handleChangeCombobox}
                                className={cx('cbb')}  />
                    </div>
                </div>
            </div>
            {err && <div className={cx('error')} style={{ marginLeft: '40px' }}>{err}</div>}
            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '2rem 4rem 2.5rem 4rem', width: '100%' }}>
                <div className={cx('row-input')} >
                    <div style={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                        <div className={cx('input-field-left')} >
                            <label htmlFor='voucherCode' className={cx('label-input')}>Mã giảm giá <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                            <input name='voucherCode' aria-invalid={errors.voucherCode ? "true" : "false"} style={errors.voucherCode ? { borderBottom: '1px solid red' } : {}} {...register('voucherCode', { required: 'Mã giảm giá chưa được nhập!' })} id='voucherCode' type='text' placeholder='WOMENDAY21T' className={cx('input')} />
                        </div>
                        {errors.voucherCode && <div className={cx('error')}>{errors.voucherCode.message}</div>}
                    </div>
                    <div style={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                        <div className={cx('input-field-right')} >
                            <label htmlFor='quanlity' className={cx('label-input')}>Số lượng <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                            <input name='quanlity' aria-invalid={errors.quanlity ? "true" : "false"} style={errors.quanlity ? { borderBottom: '1px solid red' } : {}} {...register('quanlity', { required: 'Số lượng chưa được nhập!', valueAsNumber: { value: true, message: 'Số lượng phải là một số' }, min: { value: 0, message: 'Số lượng không được âm' } })} id='quanlity' type='number' placeholder='1000' className={cx('input')} />
                        </div>

                        {errors.quanlity && <div className={cx('error')}>{errors.quanlity.message}</div>}
                    </div>
                </div>
                <div className={cx('row-input')} >
                    <div style={{ width: '55%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '-10px' }}>
                        <label htmlFor='isPercent' className={cx('label-input')}>Giảm theo % <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                        <input name='isPercent' style={{ marginLeft: '-28px' }} value={isPc} onChange={onChangeCheckBox} id='isPercent' type='checkbox' />
                    </div>
                </div>
                <div className={cx('row-input')} >
                    <div style={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
                        <div className={cx('input-field-left')} >
                            <label htmlFor='priceDiscount' className={cx('label-input')}>Giá được giảm <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                            <input name='priceDiscount' aria-invalid={errors.priceDiscount ? "true" : "false"} style={errors.priceDiscount ? { borderBottom: '1px solid red' } : {}} {...register('priceDiscount', { required: 'Giá giảm chưa được nhập!', valueAsNumber: { value: true, message: 'Giá giảm phải là một số' }, min: { value: 0, message: 'Giá giảm không được âm' } })} id='priceDiscount' type='number'
                                placeholder={isPc ? '10 (%)' : '50.000 (VND)'} className={cx('input')} />
                        </div>
                        {errors.priceDiscount && <div className={cx('error')}>{errors.priceDiscount.message}</div>}

                    </div>
                    <div style={{ width: '45%', display: 'flex', flexDirection: 'column' }}>

                        <div className={cx('input-field-right')} >
                            <label htmlFor='minPrice' className={cx('label-input')}>Giá trị tối thiểu <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                            <input name='minPrice' aria-invalid={errors.minPrice ? "true" : "false"} style={errors.minPrice ? { borderBottom: '1px solid red' } : {}} {...register('minPrice', { required: 'Giá trị tối thiểu chưa được nhập!', valueAsNumber: { value: true, message: 'Giá trị tối thiểu phải là một số' }, min: { value: 0, message: 'Giá trị tối thiểu không được âm' } })} id='minPrice' type='number' placeholder='350.000 (VND)' className={cx('input')} />
                        </div>
                        {errors.minPrice && <div className={cx('error')}>{errors.minPrice.message}</div>}

                    </div>
                </div>
                <div className={cx('row-input')} >
                    <div style={{ width: '45%', display: 'flex', flexDirection: 'column' }}>

                        <div className={cx('input-field-left')} >
                            <label htmlFor='startDate' className={cx('label-input')}>Ngày bắt đầu <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                            <input name='startDate' aria-invalid={errors.startDate ? "true" : "false"} style={errors.startDate ? { borderBottom: '1px solid red' } : {}} {...register('startDate', { required: 'Ngày bắt đầu chưa được nhập!' })} type='date' className={cx('input')} />
                        </div>
                        {errors.startDate && <div className={cx('error')}>{errors.startDate.message}</div>}
                    </div>
                    <div style={{ width: '45%', display: 'flex', flexDirection: 'column' }}>

                        <div className={cx('input-field-right')} >
                            <label htmlFor='endDate' className={cx('label-input')}>Ngày kết thúc <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                            <input name='endDate' aria-invalid={errors.endDate ? "true" : "false"} style={errors.endDate ? { borderBottom: '1px solid red' } : {}} {...register('endDate', { required: 'Ngày kết thúc chưa được nhập!' })} id='endDate' type='date' className={cx('input')} />
                        </div>
                        {errors.endDate && <div className={cx('error')}>{errors.endDate.message}</div>}
                    </div>
                </div>
                <div  >
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }} >
                        <label htmlFor='description' className={cx('label-input')}>Mô tả <HiOutlineInformationCircle fontSize={'18px'} /> </label>
                        <textarea rows={4} name='description' {...register('description')} id='description' type='text' placeholder='Sale ngày phụ nữ việt nam. Áp dụng để giảm tiền trực tiếp cho đơn hàng!' style={{ marginTop: '12px', border: '1px solid #ccc', padding: '8px' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <CustomeButton type={'Submit'} className={cx('cus-button')} title={'Xác nhận'} icon={<MdAdd fontSize={20} />} isLeft={true} bgHover={'#2f5acf'} textColorHover={'white'} containStyles={{ width: '120px', backgroundColor: 'black', color: 'white', borderRadius: '8px', padding: '10px 10px', marginTop: '16px' }} />
                </div>

            </form>
        </div>
    );
}

export default AddVoucher;