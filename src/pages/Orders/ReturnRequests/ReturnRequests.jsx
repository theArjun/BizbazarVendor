import React from "react";
import { Breadcrumb } from "antd";
import styles from "./ReturnRequests.module.css";
import { ReturnRequestsSearch, ReturnRequestsTable } from "../..";
import { Link } from "react-router-dom";
const ReturnRequests = () => {
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/Orders/View Orders">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Return Requests</Breadcrumb.Item>
      </Breadcrumb>
      <ReturnRequestsSearch />
      <ReturnRequestsTable />
    </div>
  );
};

export default ReturnRequests;
