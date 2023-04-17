import React, { useState } from "react";
import { Breadcrumb, Button, Result } from "antd";
import styles from "./ViewOrders.module.css";
import { ViewOrdersSearch, ViewOrdersTable } from "../..";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../utils/Hooks/useDebounce";
import { useGetOrders } from "../../../apis/OrdersApi";
import { useMemo } from "react";
import { useGetStatuses } from "../../../apis/StatusApi";
const INITIAL_PARAMS = {
  cname: "",
  email: "",
  phone: "",
  order_id: "",
  total_from: "",
  total_to: "",
  sort_order: "",
  sort_by: "",
};
const ViewOrders = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [order, setOrder] = useState([]);
  const [statusModalOpen, setStatusModalOpen] = useState({
    open: false,
    data: {},
    orderId: null,
  });
  const [sortBy, setSortBy] = useState("");
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    data: ordersData,
    isLoading: orderLoading,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
  } = useGetOrders(params);
  const { data: statusData, isLoading: statusLoading } = useGetStatuses();
  useEffect(() => {
    document
      .querySelector("#hello > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#hello > div > div.ant-table-body ")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Getting orders
  const getOrders = useMemo(() => {
    let temp = [];
    ordersData?.pages?.map((item, i) => {
      temp = [...temp, ...item?.data?.orders];
    });
    return temp;
  }, [ordersData]);
  // handle scroll
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;

    setBottom(condition);
  };
  // getting statuses
  const getStatus = useMemo(() => {
    if (statusData?.data) {
      return statusData?.data?.statuses;
    }
    return [];
  }, [statusData]);
  // for sorting order
  useDebounce(
    () => {
      if (sortBy?.order) {
        let temp = { ...params };
        const orderType = sortBy?.order === "ascend" ? "asc" : "desc";
        temp.sort_order = orderType;
        const sortByType = sortBy?.field === "order_id" ? "order" : "date";
        temp.sort_by = sortByType;
        setParams(temp);
      }
    },
    300,
    [sortBy]
  );
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
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Orders</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>View Orders</Breadcrumb.Item>
      </Breadcrumb>
      <ViewOrdersSearch
        order={order}
        status={getStatus}
        params={params}
        setParams={setParams}
      />
      <ViewOrdersTable
        order={getOrders}
        status={getStatus}
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
        setSortBy={setSortBy}
        setOrder={setOrder}
        loading={orderLoading || isFetchingNextPage || statusLoading}
      />
    </div>
  );
};

export default ViewOrders;
