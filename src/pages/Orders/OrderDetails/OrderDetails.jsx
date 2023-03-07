import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apicall } from "../../../utils/apicall/apicall";
import styles from "./OrderDetails.module.css";
import { Breadcrumb } from "antd";
import Deatails from "./../../../pagecomponents/Orders/OrderDetails/Deatails/Deatails";
import { Alert, Space, Spin } from 'antd';

function OrderDetails() {
  const param = useParams();
  const [orderDetail, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [referesh,setRefresh]=useState(false)

  const [statusModalOpen, setStatusModalOpen] = useState({
    open: false,
    data: {},
    orderId: null,
  });

  useEffect(() => {
    if (statusModalOpen.open === true) {
      return;
    }

    getOrderDetails();
  }, [statusModalOpen.open,referesh]);

  const getOrderDetails = async () => {
    setLoading(true);
    const result = await apicall({
      url: "VendorOrder/" + param.id,
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
      <Deatails
      referesh={referesh}
      setRefresh={setRefresh}
        orderDetail={orderDetail}
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
      />
    </div>
  );
}

export default OrderDetails;
