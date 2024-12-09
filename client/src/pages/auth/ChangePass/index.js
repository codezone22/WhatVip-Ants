import { CustomeButton } from '~/components';
import styles from './ChangePass.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
function ChangePass({navLogin}) {
    return (
        <div className={cx('wrapper')} style={{animation:'dropTop .3s linear'}}>
            <div className={cx('col')}>
                <img src='https://mcdn.coolmate.me/image/September2023/mceclip0_49.jpg' alt='img'/>
            </div>
            <div className={cx('col')}> 
                <div style={{padding:'2rem 1.5rem 2.5rem 2.5rem'}}>
                    <h1 style={{fontWeight:900, fontSize:'30px', marginBottom:'20px'}}>Cấp lại mật khẩu</h1>
                    <p style={{fontSize:'14px', paddingRight:'30px', marginBottom:'20px'}}>Vui lòng nhập Email đã đăng ký tài khoản.</p>
                   
                    <form style={{width:'100%', marginTop:'16px', display:'flex', flexDirection:'column'}}>
                        <input placeholder='Email của bạn' type='email' name='username' autoFocus='autoFocus' style={{border:'1px solid #ccc',height:'48px', borderRadius:'100vmax', width:'100%',boxSizing:'border-box', padding:'5px 20px',transition: 'all .2s', marginBottom:'16px'}}/>
                        <CustomeButton title={'Kiểm tra'} type={'submit'} containStyles={{backgroundColor:'black',alignItems:'center', display:'flex', justifyContent:'center', color:'white', width:'100%', height:'48px', borderRadius:'100vmax'}} bgHover={'#ccc'}/>
                    </form>
                    <div style={{display:'flex', justifyContent:'space-between',marginTop:'4px' }}>
                        <CustomeButton onClick={() => navLogin("login")} title={'Đăng nhập'} containStyles={{backgroundColor:'white', color:'#2f5acf', width:'fit-content', fontSize:'14px'}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePass;