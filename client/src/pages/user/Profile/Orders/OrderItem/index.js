import styles from './OrderItem.module.scss'
import classNames from 'classnames/bind';
import ProductItem from './ProductItem';
import { IoPersonOutline } from 'react-icons/io5';
import { BiCalendarCheck, BiMap, BiMapPin, BiMessageSquareDetail, BiPhoneCall, BiSitemap } from 'react-icons/bi';
import { useState } from 'react';
import { CiMoneyBill } from 'react-icons/ci';
import { FaProductHunt, FaShip } from 'react-icons/fa';
const cx = classNames.bind(styles);

function OrderItem({ props }) {
    let [detail, setDetail] = useState(false)
    let [detailMB, setDetailMB] = useState(false)

    function calculateTotal(items){
            return items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

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
    return (<>
        <div className={cx('container')}>
            <div className={cx('header')} >
                <div>
                    <span className={cx('title')}>Ngày đặt:</span> <br></br>{(new Date(props.orderDate)).getDate() + '/ ' + ((new Date(props.orderDate)).getMonth() + 1) + '/ ' + (new Date(props.orderDate)).getFullYear()}
                </div>
                <div>
                    <span className={cx('title')}>Tổng tiền:</span> <br></br>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(totalMoney(props))}
                </div>
                <div>
                    <span className={cx('title')}>Trạng thái:</span> <br></br><span style={
                        props?.status === "Đang xử lý" ? { color: '#ED232F' } :
                        { color: '#4bc7bf' }
                    }>{props.status}</span>
                </div>
                <div onClick={() => setDetail(!detail)} style={{ width: '106px' }}><span className={cx('title')} style={{ color: '#4bc7bf', cursor: 'pointer' }}>{detail ? 'Less detail' : 'More detail'}</span></div>
            </div>
            <div className={cx('header-responsive')}>
                <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                        #DH_{props._id?.slice(16)}
                    </div>
                    <div style={{ color: 'white' }}>{(new Date(props.orderDate)).getDate() + '/ ' + ((new Date(props.orderDate)).getMonth() + 1) + '/ ' + (new Date(props.orderDate)).getFullYear()}</div>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '4px 10px' }}>{props.status}</div>
            </div>

            <div className={cx('body')}>
                <div className={cx(detail ? 'address-active' : 'address')}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4bac4d' }}>
                        Đơn đặt hàng #{props?._id?.substring(12)} <span style={{ color: '#000' }} />/ <span style={
                            props?.status === "Đang xử lý" ? { color: '#ED232F', marginLeft: '5px' } :
                            { color: '#4bc7bf', marginLeft: '5px' }
                        }>{props.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '48px', marginTop: '8px' }}>
                        <div style={{ width: '30%' }}>
                            <div className={cx('form-group')}>
                                <label>Ngày đặt: </label>
                                <div className={cx('info-value')}>{(new Date(props.orderDate)).getDate() + '/ ' + ((new Date(props.orderDate)).getMonth() + 1) + '/ ' + (new Date(props.orderDate)).getFullYear()}</div>
                            </div>
                            <div className={cx('form-group')}>
                                <label>Số sản phẩm: </label>
                                <div className={cx('info-value')}>{props.orderItem.length}</div>
                            </div>

                        </div>
                        <div style={{ width: '30%' }}>
                            <div className={cx('form-group')}>
                                <label>Tiền hàng: </label>
                                <div className={cx('info-value')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal(props.orderItem))}</div>
                            </div>
                            <div className={cx('form-group')}>
                                <label>Giá giảm:
                                </label>
                                <div className={cx('info-value')}>{props?.voucher? props?.voucher?.isPercent ? props?.voucher?.voucherPrice + "%" : (new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format( props?.voucher?.voucherPrice)) : 0}</div>
                            </div>

                        </div>

                    </div>
                    <div style={{ width: '60%' }}>
                        <div className={cx('form-group', 'single')} style={{ width: 'calc(100% + 48px)' }}>
                            <label>Tổng tiền: </label>
                            <div className={cx('info-value')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney(props))}</div>
                        </div>
                    </div>
                </div>
                <div>
                    {!detailMB && <div style={{ marginTop: '10px' }} onClick={() => setDetailMB(true)} className={cx('see-detail-responsive')}>Xem chi tiết</div>}
                    {detailMB && <div style={{ height: '100%', width: '300px' }}>
                        <label style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', marginTop: '10px' }}>Thông tin đơn hàng</label>
                        <div style={{ height: '86%', paddingRight: '12px', borderLeft: '2px solid rgb(75, 172, 77)' }}>
                            <div style={{ marginLeft: '16px', fontSize: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><BiCalendarCheck style={{ marginRight: '6px' }} /></span>
                                        Ngày đặt:</span>
                                    <span >{(new Date(props.orderDate)).getDate() + '/ ' + ((new Date(props.orderDate)).getMonth() + 1) + '/ ' + (new Date(props.orderDate)).getFullYear()}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><IoPersonOutline style={{ marginRight: '6px' }} /></span>
                                        Người nhận:</span>
                                    <span >{props.address.name}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><BiPhoneCall style={{ marginRight: '6px' }} /></span>
                                        SĐT:</span>
                                    <span >{props.address.phoneNumber}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><BiMap style={{ marginRight: '6px' }} /></span>
                                        Tỉnh / TP:</span>
                                    <span >{props.address.province}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><BiMapPin style={{ marginRight: '6px' }} /></span>
                                        Quận / Huyện:</span>
                                    <span >{props.address.district}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><BiSitemap style={{ marginRight: '6px' }} /></span>
                                        Xã / Thị trấn:</span>
                                    <span >{props.address.ward}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><BiMessageSquareDetail style={{ marginRight: '6px' }} /></span>
                                        Chi tiết:</span>
                                    <span >{props.address.detail}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><FaProductHunt style={{ marginRight: '6px' }} /></span>
                                        Tiền hàng:</span>
                                    <span >{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal(props.orderItem))}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><FaShip style={{ marginRight: '6px' }} /></span>
                                        Phí ship:</span>
                                    <span >0</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                        <span><CiMoneyBill style={{ marginRight: '6px' }} /></span>
                                        Tổng tiền:</span>
                                    <span >{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal(props.orderItem))}</span>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {
                        detailMB && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                            <label style={{ fontSize: '16px', fontWeight: '600', marginTop:'10px' }}>Danh sách sản phẩm</label>
                            <div style={{ marginTop: '10px' }} onClick={() => setDetailMB(false)}>Ẩn thông tin</div>
                        </div>
                    }

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'top', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                        <label className={cx(detail ? 'label-active' : 'label')} style={{ fontSize: '16px', fontWeight: '600' }}>Danh sách sản phẩm</label>
                        <div className={cx('containerProduct')}>
                            {
                                props.orderItem.map((item, index) => {
                                    return <div style={props.orderItem.length - 1 !== index ? { margin: '0px 10px', padding: '10px 0px', borderBottom: '0.5px solid #99e0dc' } : { margin: '0px 10px', padding: '10px 0px' }}>
                                        <ProductItem key={index} props={item} />
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div className={cx(detail ? 'price-active' : 'priceDetail')} >
                        <div style={{ height: '100%', width: '300px' }}>
                            <label style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Thông tin giao hàng</label>
                            <div style={{ height: '86%', paddingRight: '12px', borderLeft: '2px solid rgb(75, 172, 77)' }}>
                                <div style={{ marginLeft: '16px', fontSize: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                            <span><IoPersonOutline style={{ marginRight: '6px' }} /></span>
                                            Người nhận:</span>
                                        <span >{props.address.name}</span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                            <span><BiPhoneCall style={{ marginRight: '6px' }} /></span>
                                            SĐT:</span>
                                        <span >{props.address.phoneNumber}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                            <span><BiMap style={{ marginRight: '6px' }} /></span>
                                            Tỉnh / TP:</span>
                                        <span >{props.address.province}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                            <span><BiMapPin style={{ marginRight: '6px' }} /></span>
                                            Quận / Huyện:</span>
                                        <span >{props.address.district}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                            <span><BiSitemap style={{ marginRight: '6px' }} /></span>
                                            Xã / Thị trấn:</span>
                                        <span >{props.address.ward}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                            <span><BiMessageSquareDetail style={{ marginRight: '6px' }} /></span>
                                            Chi tiết:</span>
                                        <span >{props.address.detail}</span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default OrderItem;