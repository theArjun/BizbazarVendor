import React, { useState,} from "react";
import { Breadcrumb } from "antd";
import styles from "./OrderDetailsReport.module.css";
import { useEffect } from "react";
import OrderDetailsReportSearch from "../../../pagecomponents/Reports/OrderDetailsReport/Search/Search";
import AccountOrderDetailsTable from "../../../pagecomponents/Reports/OrderDetailsReport/Table/Table";
import { useGetOrderDetails } from "../../../apis/ReportsApi";
const INITIAL_PARAMS = {
  order_id: "",
  vendor_name: "",
  shipping_customer_name: "",
 date:'isSearch=Y'
};  
const OrderDetailsReport = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [orderData, setOrderData] = useState([]);
  const { data, isLoading } = useGetOrderDetails(params);
  useEffect(() => {
    getOrderData();
  }, [data]);
  // get order data through api
  const getOrderStatus = () => {
    if (data?.data?.order_statuses) {
      let status = Object.values(data?.data?.order_statuses)?.map((el, i) => ({
        label: el?.description,
        value: el?.status,
        color: el?.params?.color,
      }));
      return status;
    }
    return [];
  };
  // function to get order statuses
  const getOrderData = () => {
    if (data?.data?.report) {
      setOrderData(data?.data?.report);
    }
  };
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Orders</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>View Orders</Breadcrumb.Item>
      </Breadcrumb>
      <OrderDetailsReportSearch
        params={params}
        setParams={setParams}
      />
      <AccountOrderDetailsTable
        status={getOrderStatus()}
        orderData={orderData}
        loading={isLoading}
      />
    </div>
  );
};

export default OrderDetailsReport;
