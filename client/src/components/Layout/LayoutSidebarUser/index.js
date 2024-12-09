
import Sidebar from "./Sidebar";
import styles from './LayoutSidebarUser.module.scss'
import classNames from 'classnames/bind';
import Header from "../LayoutNoSidebar/Header";
import Footer from "../LayoutNoSidebar/Footer";
const cx = classNames.bind(styles);

function LayoutSidebarUser({children}) {
    return ( 
        <div>
            <Header/>
            <div  className={cx('container')} >
                <div  className={cx('sidebar')}>
                    <Sidebar  />
                </div>
                <div className={cx('content')} >{children}</div>
            </div>
            <Footer/>
        </div>
        );
}

export default LayoutSidebarUser;