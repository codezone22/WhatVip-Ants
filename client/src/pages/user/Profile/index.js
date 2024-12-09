import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Sidebar from './Sidebar';
const cx = classNames.bind(styles);

function Profile() {
    return ( 
        <>
            <div className={cx('container')}>
                <div className={cx('main__page')}> 
                    
                    <Sidebar/>
                </div>
            </div>
        </>
    );
}

export default Profile;