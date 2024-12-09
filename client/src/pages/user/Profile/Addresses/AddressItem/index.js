import { Link } from 'react-router-dom';
import styles from './AddressItem.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
const cx = classNames.bind(styles);

function AddressItem({props, onClickUpdate, onClickDelete} ) {
    const [selected, setSelected] = useState({})
    useEffect(() => {
        setSelected(props ? props : {
            name: '',
            province: "",
            district: "",
            phoneNumber: '',
            ward: "",
            detail: "",
            default: false,
        })
    }, [props])
    return (
        <>
            <div className={cx('outerAddress')}>
                <div className={cx('headAddress')}>
                    <div className={cx('addressName')}>
                        <span>{selected.name}</span>
                        {
                            selected.default ? <div className={cx('defaultBtn')}>
                                <AiFillStar/>
                                <span>Mặc định</span>
                            </div> : null
                        }
                    </div>
                    <div className={cx('controlBtn')}>
                        <span className={cx('updateBtn')} onClick={onClickUpdate}>Cập nhật</span>
                        <hr className={cx('lineBreak')}/>
                        <span className={cx('deleteBtn')} onClick={onClickDelete}>Xóa</span>
                    </div>
                </div>
                <div className={cx('outerContainer')}>
                    <div>
                        {selected.phoneNumber}
                    </div>
                    <div>
                        {selected.detail}
                    </div>
                    <div>
                        {`${selected.ward}, ${selected.district}, ${selected.province}`}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddressItem;