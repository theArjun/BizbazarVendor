import React, { useRef, useState, useCallback } from "react";
import { Breadcrumb } from "antd";
import styles from "./AccountOrderDetails.module.css";

import { useEffect } from "react";
import { apicall2 } from "../../../utils/apicall/apicall2";
import { apicall } from "../../../utils/apicall/apicall";
import useDebounce from "../../../utils/Hooks/useDebounce";
import AccountOrderDetailsSearch from "./../../../pagecomponents/Reports/AccountOrderDetails/Search/Search";
import AccountOrderDetailsTable from "../../../pagecomponents/Reports/AccountOrderDetails/Table/Table";
import { addDays } from "date-fns";

const AccountOrderDetails = () => {
  const [sValue, setSearchValue] = useState({});
  const [status, setStatus] = useState([]);
  const [accountOrderDetails, setAccountOrderDetails] = useState([]);
  const [radio, setRadio] = useState("O");

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [dload, setDload] = useState(false);

  const page1 = useRef(1);

  const [sortBy, setSortBy] = useState("");
  const [sortColum, setSortingColum] = useState("");
  const [bottom, setBottom] = useState(false);

  const stateChange = Object.values(sValue).join("");

  useDebounce(
    () => {
      getAccountOrderDetails(sValue);
    },
    1200,
    [stateChange, dload]
  );

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

  useEffect(() => {
    getAccountOrderDetails(sValue);
  }, [load, sortBy?.order, sortBy?.field, radio]);

  const getPostUrl = (searchValue) => {
    let postUrl = "?";

    if (searchValue.orderno && searchValue.orderno.length > 0) {
      postUrl = postUrl + "order_id=" + searchValue.orderno;
    }
    if (searchValue.customername && searchValue.customername.length > 0) {
      postUrl = postUrl + "&customer=" + searchValue.customername;
    }
    if (searchValue.customerphone && searchValue.customerphone.length > 0) {
      postUrl = postUrl + "&phone=" + searchValue.customerphone;
    }
    if (searchValue.paymentmethod && searchValue.paymentmethod.length > 0) {
      postUrl = postUrl + "&payment_id=" + searchValue.paymentmethod;
    }
    if (searchValue.accountstatus && searchValue.accountstatus.length > 0) {
      postUrl = postUrl + "&account_status=" + searchValue.accountstatus;
    }
    if (searchValue.startDate && searchValue.startDate.length > 1) {
      let sdate = searchValue.startDate.split("-");
      postUrl + "&time_from=" + sdate[2] + "/" + sdate[1] + "/" + sdate[0];
    }
    if (searchValue.endDate && searchValue.endDate.length > 1) {
      let edate = searchValue.startDate.split("-");
      postUrl =
        postUrl + "&time_to=" + +edate[2] + "/" + edate[1] + "/" + edate[0];
    }
    if (sortBy?.order) {
      const orderType = sortBy?.order === "ascend" ? "asc" : "desc";
      postUrl = postUrl + "&sort_order=" + orderType;

      const sortByType = sortBy?.field === "order_id" ? "order" : "date";
      postUrl = postUrl + "&sort_by=" + sortByType;
    }
    postUrl = postUrl + "&filter_date=" + radio;
    console.log(postUrl, sValue);
    // return "?time_from=01/01/2022&time_to=27/12/2022";

    return postUrl + `&page=${page1.current}&items_per_page=${50}`;
  };

  const getAccountOrderDetails = async () => {
    setLoading(true);
    const result = await apicall2({
      preurl: "AccountOrderDetail",
      posturl: getPostUrl(sValue),
    });

    if (result?.status === 200) {
      setAccountOrderDetails(result.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (accountOrderDetails.length < 50) {
      return;
    }
    if (!bottom) {
      return;
    }
    page1.current = page1.current + 1;
    getMoreAccountOrderDetails(sValue);
  }, [bottom]);

  const getMoreAccountOrderDetails = async () => {
    setLoading(true);
    const result = await apicall2({
      preurl: "AccountOrderDetail",
      posturl: getPostUrl(sValue),
    });

    if (result?.status === 200) {
      setAccountOrderDetails((prev) => [...prev, ...result.data]);
    }
    setLoading(false);
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
      <AccountOrderDetailsSearch
        setAccountOrderDetails={setAccountOrderDetails}
        status={status}
        setSearchValue={setSearchValue}
        sValue={sValue}
        setLoad={setLoad}
        setDload={setDload}
        radio={radio}
        setRadio={setRadio}
        page1={page1}
      />
      <AccountOrderDetailsTable
        setAccountOrderDetails={setAccountOrderDetails}
        accountOrderDetails={accountOrderDetails}
        status={status}
        page1={page1}
        sortBy={sortBy}
        sortColum={sortColum}
        setSortingColum={setSortingColum}
        setSortBy={setSortBy}
        loading={loading}
        setLoad={setLoad}
      />
    </div>
  );
};

export default AccountOrderDetails;
