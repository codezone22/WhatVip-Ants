import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import ReactStars from "react-stars";
import Chart from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { item_product } from "~/assets/images";
import ItemDashboard from "./ItemDashboard";
import RevenueChart from "./RevenueChart/RevenueChart";
import Select from 'react-select';
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import convertDate from "~/utils/convertDate";

const cx = classNames.bind(styles);

function Dashboard() {
  const cbb = [
    { value: -1, label: 'Tất cả' },
    { value: 1, label: 'Tháng 1' },
    { value: 2, label: 'Tháng 2' },
    { value: 3, label: 'Tháng 3' },
    { value: 4, label: 'Tháng 4' },
    { value: 5, label: 'Tháng 5' },
    { value: 6, label: 'Tháng 6' },
    { value: 7, label: 'Tháng 7' },
    { value: 8, label: 'Tháng 8' },
    { value: 9, label: 'Tháng 9' },
    { value: 10, label: 'Tháng 10' },
    { value: 11, label: 'Tháng 11' },
    { value: 12, label: 'Tháng 12' }


  ]
  const handleChangeComboboxMonth = (selectedOption) => {
    setSelectedMonth(selectedOption?.value)
  }
  const handleChangeComboboxYear = (selectedOption) => {
    setSelectedYear(selectedOption?.value)
  }

  const dataProductType = {
    labels: [],
    datasets: [
      {
        label: "% of revenue",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [yearsCbb, setYearsCbb] = useState([{ value: -1, label: 'No infor' }])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)

  const [dataStatistical, setDataStatistical] = useState({})
  const [buyerResNum, setBuyerResNum] = useState(0)
  const [orderNum, setOrderNum] = useState(0)
  const [importPrice, setImportPrice] = useState(0)
  const [revenueMonth, setRevenueMonth] = useState(0)
  const [topCus, setTopCus] = useState([])
  const [topProduct, setTopProduct] = useState([])
  const [dataViewRevenueMonth, setDataViewRevenueMonth] = useState([])
  const [dataViewTopCategory, setDataViewTopCategory] = useState({ ...dataProductType })

  const formatMoney = (monney) => {
    const formatter = new Intl.NumberFormat("de-VN", {
      style: "currency",
      currency: "VND",
    });

    return formatter.format(monney);
  };

  useEffect(() => {
    const getDataStatistical = async () => {
      try {
        const config = {}
        const { data } = await axios.get(`${baseUrl}/api/users/get-data-statisical`, config)
        console.log(data)
        setDataStatistical({ ...data?.result })
        // set year 
        var ycbb = []
        data?.result?.years?.forEach(item => {
          ycbb.push({ value: item, label: item })
        })
        setYearsCbb([...ycbb])

        // set buyer nums
        var buyerNum = 0;
        var buyerWithRevenue = []
        data?.result?.buyers?.forEach(item => {
          var dateRes = new Date(item?.createdAt);
          if (totalAmountCus(item?.orders, selectedMonth, selectedYear) !== 0) {
            buyerWithRevenue.push({ ...item, totalExpense: totalAmountCus(item?.orders, selectedMonth, selectedYear) })
          }
          if (dateRes.getMonth() + 1 === selectedMonth && dateRes.getFullYear() === selectedYear) buyerNum++;
        })
        buyerWithRevenue.sort((a, b) => b.totalExpense - a.totalExpense)
        setTopCus([...buyerWithRevenue].slice(0, 5));
        setBuyerResNum(buyerNum)


        // set order nums 
        var orderNum = 0;
        var revenue = 0;
        var topP = [];
        var revenueCategory = [];
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        var daysOfM = [];
        for (let day = 1; day <= daysInMonth; day++) {
          daysOfM.push({ name: day, revenue: 0, expense: 0 });
        }
        data?.result?.orders?.forEach(order => {
          if (order?.status === 'Giao thành công') {
            var dateRes = new Date(order?.orderDate);
            if (dateRes.getMonth() + 1 === selectedMonth && dateRes.getFullYear() === selectedYear) {
              // calculate order num
              orderNum++;
              // total revenue
              revenue += totalMoney(order);
              daysOfM[dateRes.getDate() - 1].revenue += totalMoney(order);
              // calculate top products
              order?.orderItem?.forEach(orIt => {
                // top product
                var currentP = topP.findIndex(i => i.productId === orIt.productId._id);
                if (currentP === -1) {
                  topP.push(
                    {
                      productId: orIt.productId._id,
                      avt: orIt.image,
                      productName: orIt?.productId?.productName,
                      productCode: orIt?.productId?.productCode,
                      exportPrice: orIt?.price,
                      quantitySold: 1,
                      revenue: orIt?.price * orIt?.quantity
                    })
                } else {
                  topP[currentP].revenue += orIt?.price * orIt?.quantity;
                  topP[currentP].quantitySold = topP[currentP].quantitySold + 1;
                }

                // % category
                var currentCate = revenueCategory.findIndex(i => i.productType === orIt.productId.productType);
                if (currentCate === -1) {
                  revenueCategory.push(
                    {
                      productType: orIt.productId.productType,
                      revenue: orIt?.price * orIt?.quantity
                    })
                } else {
                  revenueCategory[currentCate].revenue += orIt?.price * orIt?.quantity;
                }


              })
            }
          }
        })

        // Sử dụng reduce để tính tổng expense
        const tongExpense = revenueCategory.reduce((tong, doiTuong) => tong + doiTuong.revenue, 0);
        console.log(revenueCategory, tongExpense)

        setDataViewTopCategory(prev => {
          var obj = { ...prev }
          var arR = []
          var arL = []
          revenueCategory.forEach(ct => {
            arL.push(ct.productType)
            arR.push(parseFloat((ct.revenue / tongExpense * 100).toFixed(0)))
          })
          obj.datasets = [{
            label: "% of revenue",
            data: [...arR],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          }]
          obj.labels = [...arL]
          console.log(obj)
          return obj
        })

        topP.sort((a, b) => b.revenue - a.revenue)
        setTopProduct([...topP].slice(0, 5))
        setOrderNum(orderNum)
        setRevenueMonth(revenue)
        // set import price
        var totalImport = 0;
        data?.result?.allImports?.forEach(item => {
          var dateRes = new Date(item?.date);
          if (dateRes.getMonth() + 1 === selectedMonth && dateRes.getFullYear() === selectedYear) {
            totalImport += item?.finalMoney;
            daysOfM[dateRes.getDate() - 1].expense += item?.finalMoney;

          }
        })
        setDataViewRevenueMonth([...daysOfM])

        setImportPrice(totalImport)

      } catch (error) {
        console.log(error)
      }
    }
    getDataStatistical()
  }, [])
  useEffect(() => {
    // set buyer nums
    var buyerNum = 0;
    var buyerWithRevenue = []
    dataStatistical?.buyers?.forEach(item => {
      var dateRes = new Date(item?.createdAt);
      if (totalAmountCus(item?.orders, selectedMonth, selectedYear) !== 0) {
        buyerWithRevenue.push({ ...item, totalExpense: totalAmountCus(item?.orders, selectedMonth, selectedYear) })
      }
      if (selectedMonth === -1) {
        if (dateRes.getFullYear() === selectedYear) buyerNum++;
      } else {
        if (dateRes.getMonth() + 1 === selectedMonth && dateRes.getFullYear() === selectedYear) buyerNum++;
      }
    })
    buyerWithRevenue.sort((a, b) => b.totalExpense - a.totalExpense)
    setTopCus([...buyerWithRevenue].slice(0, 5));
    setBuyerResNum(buyerNum)


    // set order nums 
    var orderNum = 0;
    var revenue = 0;
    var topP = [];
    var revenueCategory = [];
    if (selectedMonth !== -1) {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      var daysOfM = [];
      for (let day = 1; day <= daysInMonth; day++) {
        daysOfM.push({ name: day, revenue: 0, expense: 0 });
      }
      dataStatistical?.orders?.forEach(order => {
        if (order?.status === 'Giao thành công') {
          var dateRes = new Date(order?.orderDate);
          if (dateRes.getMonth() + 1 === selectedMonth && dateRes.getFullYear() === selectedYear) {
            // calculate order num
            orderNum++;
            // total revenue
            revenue += totalMoney(order);
            daysOfM[dateRes.getDate() - 1].revenue += totalMoney(order);
            // calculate top products
            order?.orderItem?.forEach(orIt => {
              // top product
              var currentP = topP.findIndex(i => i.productId === orIt.productId._id);
              if (currentP === -1) {
                topP.push(
                  {
                    productId: orIt.productId._id,
                    avt: orIt.image,
                    productName: orIt?.productId?.productName,
                    productCode: orIt?.productId?.productCode,
                    exportPrice: orIt?.price,
                    quantitySold: 1,
                    revenue: orIt?.price * orIt?.quantity
                  })
              } else {
                topP[currentP].revenue += orIt?.price * orIt?.quantity;
                topP[currentP].quantitySold = topP[currentP].quantitySold + 1;
              }

              // % category
              var currentCate = revenueCategory.findIndex(i => i.productType === orIt.productId.productType);
              if (currentCate === -1) {
                revenueCategory.push(
                  {
                    productType: orIt.productId.productType,
                    revenue: orIt?.price * orIt?.quantity
                  })
              } else {
                revenueCategory[currentCate].revenue += orIt?.price * orIt?.quantity;
              }


            })
          }
        }
      })

      // Sử dụng reduce để tính tổng expense
      const tongExpense = revenueCategory.reduce((tong, doiTuong) => tong + doiTuong.revenue, 0);
      console.log(revenueCategory, tongExpense)

      setDataViewTopCategory(prev => {
        var obj = { ...prev }
        var arR = []
        var arL = []
        revenueCategory.forEach(ct => {
          arL.push(ct.productType)
          arR.push(parseFloat((ct.revenue / tongExpense * 100).toFixed(0)))
        })
        obj.datasets = [{
          label: "% of revenue",
          data: [...arR],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        }]
        obj.labels = [...arL]
        console.log(obj)
        return obj
      })

      topP.sort((a, b) => b.revenue - a.revenue)
      setTopProduct([...topP].slice(0, 5))
      setOrderNum(orderNum)
      setRevenueMonth(revenue)

    } else {

      var daysOfM = [];
      for (let day = 1; day <= 12; day++) {
        daysOfM.push({ name: 'Tháng ' + day, revenue: 0, expense: 0 });
      }
      dataStatistical?.orders?.forEach(order => {
        if (order?.status === 'Giao thành công') {
          var dateRes = new Date(order?.orderDate);
          if (dateRes.getFullYear() === selectedYear) {
            // calculate order num
            orderNum++;
            // total revenue
            revenue += totalMoney(order);
            daysOfM[dateRes.getMonth()].revenue += totalMoney(order);
            // calculate top products
            order?.orderItem?.forEach(orIt => {
              // top product
              var currentP = topP.findIndex(i => i.productId === orIt.productId._id);
              if (currentP === -1) {
                topP.push(
                  {
                    productId: orIt.productId._id,
                    avt: orIt.image,
                    productName: orIt?.productId?.productName,
                    productCode: orIt?.productId?.productCode,
                    exportPrice: orIt?.price,
                    quantitySold: 1,
                    revenue: orIt?.price * orIt?.quantity
                  })
              } else {
                topP[currentP].revenue += orIt?.price * orIt?.quantity;
                topP[currentP].quantitySold = topP[currentP].quantitySold + 1;
              }

              // % category
              var currentCate = revenueCategory.findIndex(i => i.productType === orIt.productId.productType);
              if (currentCate === -1) {
                revenueCategory.push(
                  {
                    productType: orIt.productId.productType,
                    revenue: orIt?.price * orIt?.quantity
                  })
              } else {
                revenueCategory[currentCate].revenue += orIt?.price * orIt?.quantity;
              }


            })
          }
        }
      })

      // Sử dụng reduce để tính tổng expense
      const tongExpense = revenueCategory.reduce((tong, doiTuong) => tong + doiTuong.revenue, 0);

      setDataViewTopCategory(prev => {
        var obj = { ...prev }
        var arR = []
        var arL = []
        revenueCategory.forEach(ct => {
          arL.push(ct.productType)
          arR.push(parseFloat((ct.revenue / tongExpense * 100).toFixed(0)))
        })
        obj.datasets = [{
          label: "% of revenue",
          data: [...arR],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        }]
        obj.labels = [...arL]
        console.log(obj)
        return obj
      })

      topP.sort((a, b) => b.revenue - a.revenue)
      setTopProduct([...topP].slice(0, 5))
      setOrderNum(orderNum)
      setRevenueMonth(revenue)
    }
    // set import price
    var totalImport = 0;
    dataStatistical?.allImports?.forEach(item => {
      var dateRes = new Date(item?.date);
      if (selectedMonth !== -1) {
        if (dateRes.getMonth() + 1 === selectedMonth && dateRes.getFullYear() === selectedYear) {
          totalImport += item?.finalMoney;
          daysOfM[dateRes.getDate() - 1].expense += item?.finalMoney;
        }
      }
      else {
        if (dateRes.getFullYear() === selectedYear) {
          totalImport += item?.finalMoney;
          daysOfM[dateRes.getMonth()].expense += item?.finalMoney;
        }
      }
    })
    setDataViewRevenueMonth([...daysOfM])

    setImportPrice(totalImport)
  }, [selectedMonth, selectedYear])
  const totalMoney = (i) => {
    var total = 0;
    i?.orderItem.forEach((it) => {
      total += it.price * it.quantity
    })
    if (i?.voucher) {
      if (i?.voucher?.isPercent) {
        return total * (1 - i?.voucher?.voucherPrice / 100)
      }
      else {
        return total - i?.voucher?.voucherPrice
      }
    } else { return total }
  }
  const totalAmountCus = (or, m, y) => {
    var total = 0;
    or?.forEach(element => {
      var dateRes = new Date(element?.orderDate);
      if (m === -1) {
        if (element?.status === 'Giao thành công' && dateRes.getFullYear() === y) {
          var tt = 0;
          element?.orderItem.forEach((it) => {
            tt += it.price * it.quantity
          })
          if (element?.voucher) {
            if (element?.voucher?.isPercent) {
              total += tt * (1 - element?.voucher?.voucherPrice / 100)
            }
            else {
              total += tt - element?.voucher?.voucherPrice
            }
          } else {
            total += tt
          }
        }
      } else {
        if (element?.status === 'Giao thành công' && dateRes.getMonth() + 1 === m && dateRes.getFullYear() === y) {
          var tt = 0;
          element?.orderItem.forEach((it) => {
            tt += it.price * it.quantity
          })
          if (element?.voucher) {
            if (element?.voucher?.isPercent) {
              total += tt * (1 - element?.voucher?.voucherPrice / 100)
            }
            else {
              total += tt - element?.voucher?.voucherPrice
            }
          } else {
            total += tt
          }
        }
      }
    });
    return total;
  }
  return (
    <div className={cx('wrapper')} >
      <div className={cx('container')}>
        <div>
          <h1>THỐNG KÊ BÁO CÁO</h1>
          <div style={{ color: '#05CD99' }}>Lalitpur Branch</div>
        </div>
        <div className={cx('content')}>
          <div >
            {/* Lọc theo thời gian */}
            <div className={cx("container-1")}>
              <div className={cx("container-filter")}>
                <span style={{ marginTop: '20px', marginLeft: '30px' }}>Chọn năm: </span>
                <Select options={yearsCbb}
                  defaultValue={{ value: selectedYear, label: selectedYear }}

                  onChange={handleChangeComboboxYear}
                  className={cx('combobox')} />
                <span style={{ marginTop: '20px', marginLeft: '50px' }}>Chọn tháng: </span>
                <Select options={cbb}
                  defaultValue={cbb[selectedMonth]}
                  onChange={handleChangeComboboxMonth}
                  className={cx('combobox')} />
              </div>
            </div>
            {/* Tổng Doanh Thu, Tổng nhập hàng, Số đơn hàng, Số Khách hàng  */}
            <div className={cx('container-total')}>
              <span className={cx('title-total')}>Số liệu thống kê theo tháng năm được chọn:</span>
              <div className={cx('container-item-board')}>
                <ItemDashboard
                  title="DOANH THU (VND)"
                  value={formatMoney(revenueMonth)}
                />
                <ItemDashboard
                  title="NHẬP HÀNG (VND)"
                  value={formatMoney(importPrice)}
                />
                <ItemDashboard
                  title="SỐ ĐƠN HÀNG"
                  value={orderNum}
                />
                <ItemDashboard
                  title="SỐ KHÁCH HÀNG"
                  value={buyerResNum}
                />
              </div>
            </div>

            <div className={cx('container-list-chart')}>
              <div style={{ width: "75%", padding: "20px" }}>
                <div className={cx('container-big-chart')}>
                  <div style={{ marginLeft: '-60px' }}> VNĐ</div>
                  <div style={{ fontSize: "18px", fontWeight: "500" }}>
                    Tổng thu: {formatMoney(revenueMonth)}
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "500" }}>
                    Tổng chi: {formatMoney(importPrice)}
                  </div>
                </div>

                <RevenueChart data={dataViewRevenueMonth} />
              </div>

              <div style={{ width: "25%", padding: "20px", display:'flex' , flexDirection:'column' }}>
                <div style={{ fontSize: "18px", fontWeight: "500"}}>
                  Thống kê theo loại sản phẩm
                </div>
                <Doughnut data={dataViewTopCategory} style={{marginTop:'40px'}} />
              </div>
            </div>

            <div className={cx('container-two-table')}>
              <div className={cx('bg-table-small')}>
                <div className={cx('title-table')}>
                  Top 5 sản phẩm bán chạy
                </div>
                <table className={cx('tableView')} style={{ width: '100%', borderRadius: '10px', borderColor: 'transparent', border: 'none', position: 'relative' }}>
                  <thead className={cx('thead')} style={{ width: '100%', borderRadius: '10px', borderColor: 'transparent', border: 'none', }} >
                    <tr style={{ width: '100%', backgroundColor: '#e6f1fe', color: 'black', borderRadius: '10px' }}>
                      <th className={cx('col-tbl')} style={{ paddingLeft: '20px' }}></th>
                      <th className={cx('col-tbl')}>Mã sản phẩm</th>
                      <th className={cx('col-tbl')}>Tên sản phẩm</th>
                      <th className={cx('col-tbl')}>Giá bán</th>
                      <th className={cx('col-tbl')}>Đã bán</th>
                      <th className={cx('col-tbl')}>Doanh số</th>
                    </tr>
                  </thead>
                  <tbody className={cx('tbody')}>
                    {
                      topProduct?.map((item, index) => {
                        return (
                          <>
                            <tr key={index}  >
                              <td style={{ width: '7%', borderBottom: '0.5px solid #ccc' }}>
                                <img src={item?.avt} style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                              </td>
                              <td style={{ width: '15%', borderBottom: '0.5px solid #ccc' }}>{item.productCode}</td>
                              <td style={{ width: '30%', borderBottom: '0.5px solid #ccc' }}>{item.productName}</td>
                              <td style={{ width: '15%', borderBottom: '0.5px solid #ccc' }}>{formatMoney(item.exportPrice)}</td>
                              <td style={{ width: '10%', borderBottom: '0.5px solid #ccc' }}>{item?.revenue / item.exportPrice}</td>
                              <td style={{ width: '15%', borderBottom: '0.5px solid #ccc' }}>{formatMoney(item?.revenue)}</td>
                            </tr>
                          </>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>

              <div className={cx('bg-table-small')}>
                <div className={cx('title-table')}>
                  Top khách hàng chi tiêu tháng
                </div>
                <table className={cx('tableView')} style={{ width: '100%', borderRadius: '10px', borderColor: 'transparent', border: 'none', position: 'relative' }}>
                  <thead className={cx('thead')} style={{ width: '100%', borderRadius: '10px', borderColor: 'transparent', border: 'none', }} >
                    <tr style={{ width: '100%', backgroundColor: '#e6f1fe', color: 'black', borderRadius: '10px' }}>
                      <th className={cx('col-tbl')} style={{ paddingLeft: '20px' }}>CusID</th>
                      <th className={cx('col-tbl')}>Tên khách hàng</th>
                      <th className={cx('col-tbl')}>Số điện thoại</th>
                      <th className={cx('col-tbl')}>Ngày đăng ký</th>
                      <th className={cx('col-tbl')}>Tổng chi tiêu</th>
                    </tr>
                  </thead>
                  <tbody className={cx('tbody')}>
                    {
                      topCus?.map((item, index) => {
                        return (
                          <>
                            <tr key={index} className={cx('row-item')} >
                              <td style={{ paddingLeft: '22px', width: '10%', color: 'blue' }}>{'KH_' + item?._id.substring(16)}</td>
                              <td style={{ width: '20%' }}>{item.fullName}</td>
                              <td style={{ width: '17%' }}>{item.phoneNumber}</td>
                              <td style={{ width: '14%' }}>{convertDate(item.createdAt)}</td>
                              <td style={{ width: '14%' }}>{formatMoney(item?.totalExpense)}</td>
                            </tr>
                          </>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            {/* List table đơn hàng gần đây  */}
            <div style={{ margin: "20px 30px" }}>
              <div className={cx('border-table')}>
                <div className={cx('title-table')}>
                  Những đơn hàng gần đây
                </div>
                <div className={cx('tableView')}>
                  <table className={cx('table')}>
                    <thead className={cx('thead')}>
                      <tr>
                        <th className={cx('code')}>Mã đơn hàng</th>
                        <th className={cx('date')}>Thời gian tạo</th>
                        <th className={cx('customerName')}>Tên khách hàng</th>
                        <th className={cx('customerPhone')}>Số điện thoại</th>
                        <th className={cx('province')}>Khu vực giao</th>
                        <th className={cx('totalPrice')}>Trị giá</th>
                        <th className={cx('status')}>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...(dataStatistical?.orders ?? [])]?.reverse()?.slice(0, 10)?.map((item, index) => {
                        return (
                          <>
                            <tr key={index} className={cx('product-item')} >
                              <td className={cx('code')}>{'#' + item?._id.substring(12)}</td>
                              <td className={cx('date')}>{convertDate(item?.orderDate)}</td>
                              <td className={cx('customerName')}>{item?.address.name}</td>
                              <td className={cx('customerPhone')}>{item?.address.phoneNumber}</td>
                              <td className={cx('province')}>{item?.address.province}</td>
                              <td className={cx('totalPrice')}>{formatMoney(totalMoney(item))}</td>
                              <td className={cx('status')}>{item?.status}</td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* @2023 copyright */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ textAlign: 'center', margin: '20px 0 30px' }}>2023 @copyright</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
