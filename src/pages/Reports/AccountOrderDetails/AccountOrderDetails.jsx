import React, { useState } from "react";
import { Breadcrumb, Button, Result } from "antd";
import styles from "./AccountOrderDetails.module.css";
import { useEffect } from "react";
import useDebounce from "../../../utils/Hooks/useDebounce";
import { Link, useNavigate } from "react-router-dom";
import AccountOrderDetailsSearch from "./../../../pagecomponents/Reports/AccountOrderDetails/Search/Search";
import AccountOrderDetailsTable from "../../../pagecomponents/Reports/AccountOrderDetails/Table/Table";
import { useGetAccountingOrderDetails } from "../../../apis/ReportsApi";
import { useMemo } from "react";
const INITIAL_PARAMS = {
  order_id: "",
  customer: "",
  phone: "",
  payment_id: "",
  account_status: "",
  filter_date: "",
  time_from: "",
  time_to: "",
};
const AccountOrderDetails = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [sValue, setSearchValue] = useState(INITIAL_PARAMS);
  const [radio, setRadio] = useState("O");
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    data: reportData,
    isLoading: reportLoading,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
  } = useGetAccountingOrderDetails(params);
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

  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  //  for getting Accounting order data
  let getAccountOrderData = useMemo(() => {
    let temp = [];
    reportData?.pages?.map((el) => {
      temp = [...temp, ...el?.data];
    });
    return temp || [];
  }, [reportData]);
  // handling Search value change
  useDebounce(
    () => {
      let temp = { ...params };
      temp.order_id = sValue.order_id || "";
      temp.customer = sValue.customer || "";
      temp.phone = sValue.phone || "";
      temp.payment_id = sValue.payment_id || "";
      temp.account_status = sValue.account_status || "";
      temp.time_from = sValue.time_from || "";
      temp.time_to = sValue.time_to || "";
      temp.filter_date = radio || "";
      setParams(temp);
    },
    500,
    [sValue, radio]
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
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Reports</Breadcrumb.Item>
          <Breadcrumb.Item>Account Orders Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <AccountOrderDetailsSearch
        setSearchValue={setSearchValue}
        sValue={sValue}
        radio={radio}
        setRadio={setRadio}
      />
      <AccountOrderDetailsTable
        accountOrderDetails={getAccountOrderData}
        loading={reportLoading || isFetchingNextPage}
      />
    </div>
  );
};

export default AccountOrderDetails;
