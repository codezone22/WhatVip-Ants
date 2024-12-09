import { TextInput } from "~/components/Input";
import classNames from 'classnames/bind';
import styles from './ChangePass.module.scss';
import { IoMdLock } from 'react-icons/io'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import { loginSuccess } from "~/redux/slices/authSlice";
const cx = classNames.bind(styles);


function ChangePass({ item, notify, setPopUp }) {
    const dispatch = useDispatch();
    const [error, setError] = useState(null)

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: 'onChange' });
    const onSubmit = async (dt) => {
        setError(null)
        
        const cc = {
            password: dt.password,
            newPassword:dt.newPassword
        }
        try {
            const { data } = await axios.post(`${baseUrl}/api/users/update-User/${item._id}`, cc, {
                headers: { token: "Bearer " + item.accessToken, "Content-Type":'application/json' }
            })
            console.log(data)
            dispatch(loginSuccess({ ...item, password:data.result.password }))
            setPopUp(prev=>{return false})
            notify("success", "Cập nhật thông tin người dùng thành công")

        } catch (error) {
            
            setError(error.response.data.error.message)
            // notify("error", error.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={cx('container')}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <h1 className={cx('account-page__title')}>Thay đổi mật khẩu</h1>
                </div>
                <div style={{ gap: '14px', display: 'flex', flexDirection: 'column' }}>
                    <TextInput placeHolder="Mật khẩu cũ" type="type_2" icon={<IoMdLock />} secure name={'password'} register={register("password", {
                        required: "Mật khẩu cũ được yêu cầu!",
                    })}
                        error={errors.password ? errors.password.message : error ? error : ""} />

                    <TextInput placeHolder="Mật khẩu mới" type="type_2" icon={<IoMdLock />} secure name={'newPassword'} register={register("newPassword", {
                        required: "Mật khẩu mới được yêu cầu!",
                    })}
                        error={errors.newPassword ? errors.newPassword.message : ""} />
                    <TextInput placeHolder="Nhập lại mật khẩu mới" type="type_2" icon={<IoMdLock />} secure register={register("cPassword", {
                        validate: (value) => {
                            const { newPassword } = getValues();

                            if (newPassword !== value) {
                                return "Nhập khẩu nhập lại không trùng khớp!";
                            }
                        },
                    })}
                        error={
                            errors.cPassword
                                ? errors.cPassword?.message
                                : ""
                        } name='cPassword' />
                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
                    <button style={{border:'none'}} type="submit" className={cx('account-info__btn')}>
                        <span className={cx('account-info__btn-text')}>Cập nhật</span>
                    </button>
                </div>
            </form>
        </>
    );
}

export default ChangePass;