import React, { useState } from "react";
import { Breadcrumb, Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "./OrderDetailsReport.module.css";
import OrderDetailsReportSearch from "../../../features/Reports/OrderDetailsReport/Search/Search";
import AccountOrderDetailsTable from "../../../features/Reports/OrderDetailsReport/Table/Table";
import { useGetOrderDetails } from "../../../apis/ReportsApi";
import useDebounce from "../../../utils/Hooks/useDebounce";
import { useMemo } from "react";
const INITIAL_PARAMS = {
  order_id: "",
  vendor_name: "",
  shipping_customer_name: "",
  date: "isSearch=Y",
};
const OrderDetailsReport = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, isError, error } =
    useGetOrderDetails(params);
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  // get order data through api
  const getOrderStatus = () => {
    if (data?.pages) {
      let status = Object.values(
        data?.pages?.at(-1)?.data?.order_statuses || {}
      )?.map((el, i) => ({
        label: el?.description,
        value: el?.status,
        color: el?.params?.color,
      }));
      return status;
    }
    return [];
  };
  //  for getting order reports
  let getOrderReportData = useMemo(() => {
    let temp = [];
    data?.pages?.map((el) => {
      el?.data?.report?.map((item) => {
        temp.push(item);
      });
    });
    return temp || [];
  }, [data]);
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
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link className={styles.breadcrumb}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Reports</Breadcrumb.Item>
          <Breadcrumb.Item>Order Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <OrderDetailsReportSearch params={params} setParams={setParams} />
      <AccountOrderDetailsTable
        status={getOrderStatus()}
        orderData={getOrderReportData}
        loading={isLoading || isFetchingNextPage}
        handleScroll={handleScroll}
      />
    </div>
  );
};

export default OrderDetailsReport;
