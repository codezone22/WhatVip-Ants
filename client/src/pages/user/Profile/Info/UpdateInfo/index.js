
import classNames from 'classnames/bind';
import styles from './UpdateInfo.module.scss';
import { ComboBox, TextInput, RadioButton } from '~/components/Input';
import { FaUser } from 'react-icons/fa';
import { BsFillCalendarFill } from 'react-icons/bs';
import { IoIosBody } from 'react-icons/io';
import { GiWeight } from 'react-icons/gi'
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { loginSuccess } from '~/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import baseUrl from '~/utils/baseUrl';

const cx = classNames.bind(styles);
function UpdateInfo({ item, notify, setPopUp }) {
    const dispatch = useDispatch()

    const gender = [{ id: 0, name: 'Nam' }, { id: 1, name: 'Nữ' }, { id: 2, name: 'Khác' }]
    const [currentDate, setCurrentDate] = useState(prev => {
        if (item.dob) {
            const date = new Date(item.dob);

            // Lấy thông tin ngày, tháng, năm
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const year = date.getFullYear();

            return {
                day: day,
                month: month,
                year: year
            }

        }
        return {
            day: '',
            month: '',
            year: ''
        }
    })
    const [days, setDays] = useState(getDateByMonthYear(currentDate.month, currentDate.year))
    const [months, setMonths] = useState(getMonths())
    const [years, setYears] = useState(getYearsToCurrentFrom(currentDate.year))
    const [error, setError] = useState(null)
    const [genderUser, setGenderUser] = useState(item?.gender === 0 ? { id: 0, name: 'Nam' } : item?.gender === 1 ? { id: 1, name: 'Nữ' } : item?.gender === 2 ? { id: 2, name: 'Khác' } : { id: -1, name: '' })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' });
    const onSubmit = async (dt) => {
        setError(null)
        if (!dt.heightUser || !dt.weightUser) {
            setError('Cân nặng hoặc chiều cao phải là một số!')
            return;
        }
        const cc = {
            fullName: dt.fullName,
            email: dt.email,
            weightUser: dt.weightUser,
            heightUser: dt.heightUser,
            gender: genderUser.id,
            dob: currentDate.year + '-' + (currentDate.day.toString().length === 1 ? '0' + currentDate.day : currentDate.day + '') + '-' + (currentDate.month.toString().length === 1 ? '0' + currentDate.month : currentDate.month + '') + 'T00:00:00.000+00:00'
        }
        try {
            const { data } = await axios.post(`${baseUrl}/api/users/update-User/${item._id}`, cc, {
                headers: { token: "Bearer " + item.accessToken, "Content-Type": 'application/json' }
            })
            console.log(data)
            dispatch(loginSuccess({
                ...item,
                fullName: data.result.fullName, 
                email: data.result.email,
                weightUser: data.result.weightUser,
                heightUser: data.result.heightUser,
                gender: data.result.gender,
                dob: data.result.dob
            }))
            setPopUp(prev => { return false })
            notify("success", "Cập nhật thông tin người dùng thành công")

        } catch (error) {
            notify("error", error.message)
        }
    }
    function checkLeefYear(y) {
        var year = Number(y)
        if (year % 400 === 0)
            return true;
        if (year % 4 === 0 && year % 100 !== 0)
            return true;
        return false;
    }

    function getDateByMonthYear(m, y) {
        var month = Number(m), year = Number(y)

        let dates = []
        let count = 0

        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12)
            count = 31
        else if (month === 4 || month === 6 || month === 9 || month === 11)
            count = 30
        else if (month === 2)
            if (checkLeefYear(year)) count = 29
            else count = 28

        for (let i = 0; i < count; i++)
            dates.push({ id: i, name: i + 1 })
        return dates
    }

    function getYearsToCurrentFrom(startYear) {
        let currentYear = new Date().getFullYear()
        let years = []
        let i = 0
        while (currentYear >= startYear) {
            years.push({ id: i, name: currentYear })
            currentYear--;
            i++;
        }
        return years
    }

    function getMonths() {
        let months = []
        for (let i = 0; i < 12; i++) {
            months.push({ id: i, name: i + 1 })
        }
        return months;
    }

    function filterDate(e) {
        setCurrentDate({ ...currentDate, day: e.name })
    }

    function filterMonth(e) {
        setDays(getDateByMonthYear(e.name, currentDate.year))
        setCurrentDate({ ...currentDate, month: e.name })
    }

    function filterYear(e) {
        setDays(getDateByMonthYear(currentDate.month, e.name))
        setCurrentDate({ ...currentDate, year: e.name })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={cx('container')}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <span className={cx('account-page__title')}>Thông tin tài khoản</span>
                </div>
                <TextInput value={item?.fullName} name={'fullName'} register={register("fullName", {
                    required: "Họ và tên được yêu cầu!",
                })}
                    error={errors.fullName ? errors.fullName.message : ""} placeHolder="Họ và tên" type="type_1" icon={<FaUser />} />
                <div className={cx('date_info')}>
                    <div className={cx('date_item')}>
                        <ComboBox placeHolder="Ngày" type={'table'} icon={<BsFillCalendarFill />} listItems={days} filterValueSelected={filterDate} name={currentDate.day} />
                    </div>
                    <div className={cx('date_item')}>
                        <ComboBox placeHolder="Tháng" type={'table'} icon={<BsFillCalendarFill />} listItems={months} filterValueSelected={filterMonth} name={currentDate.month} />
                    </div>
                    <div className={cx('date_item')}>
                        <ComboBox placeHolder="Năm" type={'table'} icon={<BsFillCalendarFill />} listItems={years} filterValueSelected={filterYear} name={currentDate.year} />
                    </div>
                </div>
                <RadioButton listItems={gender} filterValueChecked={(e) => { setGenderUser(e) }} selectedItem={genderUser} />
                <TextInput placeHolder="Email" type="type_1" icon={<MdEmail />} value={item?.email} name={'email'} register={register("email")}
                />
                <div className={cx('outer-weight-height')}>
                    <div className={cx('body-item')}>
                        <TextInput placeHolder="Chiều cao (cm)" type="type_1" name={'heightUser'} register={register("heightUser", {
                            valueAsNumber: { value: true, message: 'Chiều cao phải là một số' }
                        })}
                            error={errors.heightUser ? errors.heightUser.message : ""} icon={<IoIosBody />} value={item?.heightUser ?? ''} />
                    </div>
                    <div className={cx('body-item')}>
                        <TextInput placeHolder="Cân nặng (kg)" type="type_1" name={'weightUser'} register={register("weightUser", {
                            valueAsNumber: { value: true, message: 'Cân nặng phải là một số' },
                        })}
                            error={errors.weightUser ? errors.weightUser.message : ""} icon={<GiWeight />} value={item?.weightUser ?? ''} />
                    </div>
                </div>
                {error && <span style={{ display: 'flex', marginLeft: '4px', flexDirection: 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '8px' }}><AiFillExclamationCircle />{error}</span>}

                <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
                    <button style={{ border: 'none' }} className={cx('account-info__btn')} type='submit' >
                        <span className={cx('account-info__btn-text')}>Cập nhật</span>
                    </button>
                </div>
            </form>
        </>
    )
}

export default UpdateInfo;