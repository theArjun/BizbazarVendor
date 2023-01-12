import React, { useRef, useState, useCallback } from "react";
import { Breadcrumb } from "antd";
import styles from "./ViewOrders.module.css";
import { ViewOrdersSearch, ViewOrdersTable } from "../..";
import { useEffect } from "react";
import { apicall } from "../../../utils/apicall/apicall";
import useDebounce from "../../../utils/Hooks/useDebounce";

const ViewOrders = () => {
  const [sValue, setSearchValue] = useState({});
  const [status, setStatus] = useState([]);
  const [order, setOrder] = useState([]);

  const [loading, setLoading] = useState(false);

  const page1 = useRef(1);

  const [statusModalOpen, setStatusModalOpen] = useState({
    open: false,
    data: {},
    orderId: null,
  });

  const [sortBy, setSortBy] = useState("");
  const [sortColum, setSortingColum] = useState("");
  const [bottom, setBottom] = useState(false);
  const a = Object.values(sValue).join("");

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

  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;

    setBottom(condition);
  };

  useDebounce(
    () => {
      page1.current = 1;
      getOrder(sValue);
    },
    1200,
    [a]
  );

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    getOrder(sValue);
  }, [statusModalOpen.open, sortBy?.order, sortBy?.field]);

  const getStatus = async () => {
    const result = await apicall({
      url: "statuses",
    });

    setStatus(result.data.statuses);
  };

  const getUrl = (values) => {
    console.log(sValue);
    let newUrl = "orders?is_search=Y";
    if (values?.customer) {
      newUrl = newUrl + "&cname=" + values.customer;
    }
    if (values?.email) {
      newUrl = newUrl + "&email=" + values.email;
    }
    if (values?.phone) {
      newUrl = newUrl + "&phone=" + values.phone;
    }
    if (values?.max_price) {
      newUrl = newUrl + "&total_to=" + values.max_price;
    }
    if (values?.orderid) {
      newUrl = newUrl + "&order_id=" + values.orderid;
    }
    if (values?.min_price) {
      newUrl = newUrl + "&total_from=" + values.min_price;
    }
    if (sortBy?.order) {
      const orderType = sortBy?.order === "ascend" ? "asc" : "desc";
      newUrl = newUrl + "&sort_order=" + orderType;

      const sortByType = sortBy?.field === "order_id" ? "order" : "date";
      newUrl = newUrl + "&sort_by=" + sortByType;
    }
    return newUrl + `&page=${page1.current}&items_per_page=${50}`;
  };

  const getOrder = async (values) => {
    setLoading(true);
    const result = await apicall({
      url: getUrl(values),
    });
    setOrder(result?.data?.orders);
    setLoading(false);
  };

  const getMoreData = async (values) => {
    setLoading(true);
    const result = await apicall({
      url: getUrl(values),
    });
    setOrder((prevOrder) => [...prevOrder, ...result?.data?.orders]);
    setLoading(false);
  };

  useEffect(() => {
    if (order.length < 50) {
      return;
    }
    if (!bottom) {
      return;
    }
    page1.current = page1.current + 1;
    getMoreData(sValue);
  }, [bottom]);

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
        status={status}
        setSearchValue={setSearchValue}
      />
      <ViewOrdersTable
        order={order}
        status={status}
        page1={page1}
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
        sortBy={sortBy}
        sortColum={sortColum}
        setSortingColum={setSortingColum}
        setSortBy={setSortBy}
        setOrder={setOrder}
        loading={loading}
      />
    </div>
  );
};

export default ViewOrders;
