import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './BillDetailCus.module.scss'
import convertDate from "~/utils/convertDate";

const cx = classNames.bind(styles)

function BillDetailCus({ item, cusId ,totalAmount}) {
    const [address, setAddress] = useState('')

    useEffect(() => {
        const init = () => {
            item.address.forEach(i => {
                if (i.default) setAddress(i.ward + ', ' + i.district + ". " + i.province)
            })
        }
        init()
    }, [item.address])
    const convertDate = (d) => {
        const date = new Date(d);

        // Lấy thông tin ngày, tháng, năm
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const h = date.getUTCHours();
        const m = date.getMinutes();

        // Tạo chuỗi ngày tháng định dạng 'DD-MM-YYYY'
        const formattedDate = `${day}/${month}/${year} ${h}:${m}`;
        return formattedDate;
    }
    console.log(item)
    const totalMoney = (i) => {
        var total = 0;
        i?.orderItem.forEach((it) => {
            total += it.price * it.quantity 
        })
        if(i?.voucher){
            if (i?.voucher?.isPercent) {
                return total * (1 - i?.voucher?.voucherPrice/100)
            }
            else {
                return total - i?.voucher?.voucherPrice
            }
        }else{ return total}
    }
    return (
        <div className={cx('wrapper')}>
            {/* Header */}
            <div className={cx('header')}>
                <div className={cx('tabpanel')}>Thông tin</div>
            </div>
            {/* Body */}
            <div className={cx('product-container')}>
                <div className={cx('order-container')}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4bac4d' }}>
                        Thông tin khách hàng
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <div className={cx('wrap-form-groups')}>
                            <div className={cx('form-group', 'no-border')} style={{ width: '20%' }}>
                                <label>Mã khách hàng: </label>
                                <div className={cx('info-value')}>{cusId}</div>
                            </div>
                            <div className={cx('form-group', 'no-border')} style={{ width: '50%' }}>
                                <label>Họ và tên: </label>
                                <div className={cx('info-value')}>{item.fullName}</div>
                            </div>
                            <div className={cx('form-group', 'no-border')} style={{ width: '30%' }}>
                                <label>Số điện thoại: </label>
                                <div className={cx('info-value')}>{item.phoneNumber}</div>
                                {/* 15/08/2019 11:05 */}
                            </div>

                        </div>
                        <div className={cx('wrap-form-groups')}>
                            <div className={cx('form-group')} style={{ width: '20%' }}>
                                <label>Ngày đăng ký: </label>
                                <div className={cx('info-value')}>{convertDate(item.createdAt)}</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '50%' }}>
                                <label>Địa chỉ: </label>
                                <div className={cx('info-value')}>{address}</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                                <label>Email: </label>
                                <div className={cx('info-value')}>{item.email}</div>
                            </div>

                        </div>
                        <div className={cx('wrap-form-groups')}>
                            <div className={cx('form-group')} style={{ width: '20%' }}>
                                <label>Số đơn hàng</label>
                                <div className={cx('info-value')}>{item.orders.length}</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '50%' }}>
                                <label>Tổng giao dịch: </label>
                                <div className={cx('info-value')}>{totalAmount} VNĐ</div>
                            </div>
                            <div className={cx('form-group')} style={{ width: '30%' }}>
                                <label> </label>
                                <div className={cx('info-value')}></div>
                            </div>

                        </div>
                    </div>

                    <div className={cx('tableView')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    <th className={cx('code')}>Mã hóa đơn</th>
                                    <th className={cx('date')}>Thời gian</th>
                                    <th className={cx('payMethod')}>Phương thức thanh toán</th>
                                    <th className={cx('customerName')}>Tên người nhận</th>
                                    <th className={cx('customerPhone')}>Số điện thoại</th>
                                    <th className={cx('status')}>Tình trạng</th>
                                    <th className={cx('totalPrice')}>Tổng tiền</th>

                                </tr>
                            </thead>
                            <tbody>

                                {item?.orders.map((i, index) => {
                                    return (
                                        <tr key={index} className={cx('product-item')}>
                                            <td className={cx('code')}>HD{i._id.slice(16)}</td>
                                            <td className={cx('date')}>{convertDate(i?.orderDate)}</td>
                                            <td className={cx('payMethod')}>Thanh toán trực tiếp</td>
                                            <td className={cx('customerName')}>{i?.address?.name}</td>
                                            <td className={cx('customerPhone')}>{i?.address?.phoneNumber}</td>
                                            <td className={cx('status')}>{i?.status}</td>
                                            <td className={cx('totalPrice')}>{totalMoney(i)} đ</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                    </div>


                </div>
                {/* Chức năng
                <div className={cx('product-fucntion')}>
                    <span className={cx('btn', 'btn-succeed')} style={{ backgroundColor: '#e24949' }}>  Đóng</span>
                </div> */}
            </div>
        </div>
    );
}

export default BillDetailCus;