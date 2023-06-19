import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./OrderDetails.module.css";
import { Breadcrumb, Button, Result } from "antd";
import Deatails from "./../../../features/Orders/OrderDetails/Deatails/Deatails";
import { useGetOrderByID } from "../../../apis/OrdersApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../component/Spinner/Spinner";
import { useGetStatuses } from "../../../apis/StatusApi";

function OrderDetails() {
  const param = useParams();
  const [orderDetail, setOrderDetails] = useState({});
  const [referesh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [statusModalOpen, setStatusModalOpen] = useState({
    open: false,
    data: {},
    orderId: null,
  });
  const {
    data: orderData,
    isLoading: orderLoading,
    error,
    isError,
  } = useGetOrderByID(param.id);
  const { data: statusData, isLoading: statusLoading } = useGetStatuses();
  useEffect(() => {
    if (statusModalOpen.open === true) {
      return;
    }

    // getOrderDetails();
  }, [statusModalOpen.open, referesh]);
  useEffect(() => {
    setOrderDetails(orderData?.data || {});
  }, [orderData]);
  // getting statuses
  const getStatus = useMemo(() => {
    if (statusData?.data) {
      return statusData?.data?.statuses;
    }
    return [];
  }, [statusData]);

  if (orderLoading || statusLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <Result
        status={error?.response?.status}
        title={error?.response?.status}
        subTitle={error?.message}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/Orders/View Orders">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{param.id}</Breadcrumb.Item>
      </Breadcrumb>
      <Deatails
        orderDetail={orderDetail}
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
        status={getStatus}
      />
    </div>
  );
}

export default OrderDetails;
