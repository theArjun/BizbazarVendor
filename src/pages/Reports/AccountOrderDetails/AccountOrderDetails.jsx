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
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), -30),
    },
  ]);
  const [sValue, setSearchValue] = useState({});
  const [status, setStatus] = useState([]);
  const [accountOrderDetails, setAccountOrderDetails] = useState([]);

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  const page1 = useRef(1);

  const [sortBy, setSortBy] = useState("");
  const [sortColum, setSortingColum] = useState("");
  const [bottom, setBottom] = useState(false);

  // const a = Object.values(sValue).join("");

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
  }, [load]);

  console.log(range[0].startDate.getFullYear());

  const getApicallFormatDate = (date) => {
    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
  };

  const getAccountOrderDetails = async () => {
    setLoading(true);
    const result = await apicall2({
      preurl: "AccountOrderDetail",
      posturl:
        "time_from=" +
        // getApicallFormatDate(range[0].endDate) +
        "&time_to=",
      // getApicallFormatDate(range[0].startDate),
    });
    console.log(result);
    if (result?.status === 200) {
      setAccountOrderDetails(result.data);
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
        range={range}
        setRange={setRange}
        setLoad={setLoad}
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
