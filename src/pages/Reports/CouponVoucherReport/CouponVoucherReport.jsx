import React, { useState, } from "react";
import { Breadcrumb } from "antd";
import styles from "./CouponVoucherReport.module.css";
import { useEffect } from "react";
import CouponVoucherReportSearch from "../../../pagecomponents/Reports/CouponVoucherReport/Search/Search";
import CouponVoucherReportTable from "../../../pagecomponents/Reports/CouponVoucherReport/Table/Table";
import { useGetCouponVoucherReport } from "../../../apis/ReportsApi";
const INITIAL_PARAMS = {
  order_id: "",
  date:'',
  status_id: "",
  page:1,
};
const CouponVoucherReport = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [data, setData]=useState([])
  const [bottom, setBottom] = useState(false);
  const {isLoading:couponLoading, data:couponData, 
    isFetching}=useGetCouponVoucherReport(params)
useEffect(()=>{
getCouponReports()
},[couponData])
  useEffect(() => {
    document
      .querySelector("#reportaccount > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#reportaccount > div > div.ant-table-body ")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, []);
// function for getting coupon reports
 const getCouponReports=()=>{
  if(couponData?.data?.report){
    setData(couponData?.data?.report)
  }
}
// getting status
const getStatus=()=>{
  if(couponData?.data?.order_status){
   let status=[...couponData?.data?.order_status]
   return status?.map((el,i)=>({label:el?.description,  value: el?.status_id, color:el?.params?.color}))
  }
  return []
}
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 90 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  useEffect(() => {
    if(couponData?.data?.report?.length<20){
      return;
    }
    if (!bottom) {
      return;
    }
    let t_param={...params}
    t_param.page+=1
    setParams(t_param)
    setData((current)=>[...current,...couponData?.data?.report])
  }, [bottom]);

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Reports</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Coupon voucher reports</Breadcrumb.Item>
      </Breadcrumb>
      <CouponVoucherReportSearch
        params={params}
        setParams={setParams}
        status={getStatus()}
      />
      <CouponVoucherReportTable
        couponData={data}
        status={getStatus()}
        loading={couponLoading || isFetching}
      />
    </div>
  );
};

export default CouponVoucherReport;
