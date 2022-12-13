import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apicall } from "../../../utils/apicall/apicall";
import styles from "./OrderDetails.module.css";
import { Breadcrumb } from "antd";
import Deatails from "./../../../pagecomponents/Orders/OrderDetails/Deatails/Deatails";

function OrderDetails() {
  const param = useParams();
  const [orderDetail, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = async () => {
    setLoading(true);
    const result = await apicall({
      url: "vendors/62/orders/" + param.id,
    });

    setOrderDetails(result.data);

    setLoading(false);
  };

  if (loading) {
    return <>loading ....</>;
  }

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Orders</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>View Orders</Breadcrumb.Item>
      </Breadcrumb>
      <Deatails orderDetail={orderDetail} />
    </div>
  );
}

export default OrderDetails;
