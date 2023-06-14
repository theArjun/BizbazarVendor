import React, { useState } from "react";
import { Breadcrumb, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./CouponVoucherReport.module.css";
import { useEffect } from "react";
import CouponVoucherReportSearch from "../../../pagecomponents/Reports/CouponVoucherReport/Search/Search";
import CouponVoucherReportTable from "../../../pagecomponents/Reports/CouponVoucherReport/Table/Table";
import { useGetCouponVoucherReport } from "../../../apis/ReportsApi";
import { useMemo } from "react";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  order_id: "",
  date: "",
  status_id: "",
  page: 1,
};
const CouponVoucherReport = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    isLoading: couponLoading,
    data: couponData,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useGetCouponVoucherReport(params);
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
  //  for getting coupon reports
  let getCouponReportData = useMemo(() => {
    let temp = [];
    couponData?.pages?.map((el) => {
      el?.data?.report?.map((item) => {
        temp.push(item);
      });
    });
    return temp || [];
  }, [couponData]);
  // getting status
  const getStatus = () => {
    if (couponData?.pages) {
      let status = [...couponData?.pages?.at(-1).data?.order_status];
      return status?.map((el, i) => ({
        label: el?.description,
        value: el?.status_id,
        color: el?.params?.color,
      }));
    }
    return [];
  };
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  // Handle infinite scroll
  useDebounce(
    () => {
      if (!bottom) {
        return;
      }
      fetchNextPage();
    },
    300,
    [bottom]
  );
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Reports</Breadcrumb.Item>
        <Breadcrumb.Item>Coupon Voucher Reports</Breadcrumb.Item>
      </Breadcrumb>
      <CouponVoucherReportSearch
        params={params}
        setParams={setParams}
        status={getStatus()}
      />
      <CouponVoucherReportTable
        couponData={getCouponReportData}
        status={getStatus()}
        loading={couponLoading || isFetchingNextPage}
      />
    </div>
  );
};

export default CouponVoucherReport;
