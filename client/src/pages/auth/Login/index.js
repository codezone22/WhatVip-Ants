import { CustomeButton } from '~/components';
import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '~/redux/api/authRequest';



const cx = classNames.bind(styles)



function Login({navSignup, navForgot}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const phoneNumber = useSelector((state) => state.auth.register.phoneNumber);
    const isLoading = useSelector((state) => state.auth.login.isLoading);
    const [values, setValues] = useState({
        identifier: '',
        role: "Buyer",
        password: ''
    });

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value }); };

        const handleSubmit = () => {
            try{
                if(values.identifier.trim() === ''){
                    notify("warning", "Vui lòng nhập Email hoặc Số Điện Thoại!")
                    return;
                }
                if(values.password.trim() === ''){
                    notify("warning", "Vui lòng nhập mật khẩu!")
                    return;
                }
                loginUser(values, dispatch, navigate, (res) => {
                    if(res?.response?.status === 404){
                        notify("error", res.response.data)
                    }
                    else{
                        notify("success", "Chào mừng bạn quay trở lại!")
                        navigate("/user-profile/info");
                    }
                })
            }
            catch (err){
                notify("error", err);
            }
        };

    const notify = (type, message) => toast(message, {type: type});

    return (
        <div className={cx('wrapper')} style={{animation:'dropTop .3s linear'}}>
            <ToastContainer/>
            <div className={cx('col')}>
                <img src='https://mcdn.coolmate.me/image/September2023/mceclip0_49.jpg' alt='img'/>
            </div>
            <div className={cx('col')}> 
                <div style={{padding:'2rem 1.5rem 2.5rem 2.5rem'}}>
                    <h1 style={{fontWeight:900, fontSize:'30px', marginBottom:'20px'}}>Đăng nhập</h1>
                    <p style={{fontSize:'14px', paddingRight:'30px', marginBottom:'20px'}}>Đăng nhập để không bỏ lỡ quyền lợi tích luỹ và hoàn tiền cho bất kỳ đơn hàng nào.</p>
                    <h3 style={{fontWeight:'700', fontSize:'17px', marginBottom:'40px'}}>Đăng nhập hoặc đăng ký (miễn phí)</h3>
                    <form style={{width:'100%', marginTop:'16px'}}>
                        <input onChange={handleChange("identifier")} value={values.identifier} placeholder='Email/SĐT của bạn' type='text' name='identifier' autoFocus='autoFocus' style={{border:'1px solid #ccc',height:'48px', borderRadius:'100vmax', width:'100%',boxSizing:'border-box', padding:'5px 20px',transition: 'all .2s', marginBottom:'16px'}}/>
                        <input onChange={handleChange("password")} placeholder='Mật khẩu'  type='password' name='password' autoFocus='autoFocus' style={{border:'1px solid #ccc',height:'48px', borderRadius:'100vmax', width:'100%',boxSizing:'border-box', padding:'5px 20px',transition: 'all .2s', marginBottom:'16px'}}/>
                        {
                            isLoading ? 
                                <CustomeButton title={' Đang kiểm tra ... '} containStyles={{backgroundColor:'black', color:'white', width:'100%', height:'48px', borderRadius:'100vmax', alignItems:'center', display:'flex', justifyContent:'center'}} bgHover={'#ccc'}/>
                            :
                                <CustomeButton title={' Đăng nhập '} onClick={handleSubmit} containStyles={{backgroundColor:'black', color:'white', width:'100%', height:'48px', borderRadius:'100vmax', alignItems:'center', display:'flex', justifyContent:'center'}} bgHover={'#ccc'}/>
                        }
                    </form>
                    <div style={{display:'flex', justifyContent:'space-between',marginTop:'4px' }}>
                        <CustomeButton onClick={() => navSignup("signup")} title={'Đăng ký tài khoản mới'} containStyles={{backgroundColor:'white', color:'#2f5acf', width:'fit-content', fontSize:'14px'}}/>
                        <CustomeButton onClick={() => navForgot("forgot")} title={'Quên mật khẩu'} containStyles={{backgroundColor:'white', color:'#2f5acf', width:'fit-content', fontSize:'14px'}}/>
                    </div>
        
                    <div style={{fontSize:'13px', borderLeft:'2px solid #ccc', paddingLeft:'20px', marginTop:'12px', lineHeight:'16px' }}>Nếu đã từng mua hàng trên Website trước đây, bạn có thể dùng tính năng <CustomeButton title={'"Lấy mật khẩu"'} containStyles={{backgroundColor:'white', color:'#2f5acf', width:'fit-content', fontSize:'13px', textDecoration:'underline', height:'12px', padding:0}}/> để có thể truy cập vào Coolmate.</div>
                </div>
            </div>
        </div>
    );
}

export default Login;