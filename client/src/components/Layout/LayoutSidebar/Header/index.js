import { Link } from 'react-router-dom';
import styles from './Header.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-logo')} style={{padding: '16px'}}>
                    <Link to="/admin" style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>
                        Shop<span style={{ backgroundColor: 'white', color: 'black', borderRadius: '3px', padding: '0' }}>App</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;