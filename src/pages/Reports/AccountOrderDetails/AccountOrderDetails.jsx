import React, { useRef, useState, useCallback } from "react";
import { Breadcrumb, Button, Result } from "antd";
import styles from "./AccountOrderDetails.module.css";
import { useEffect } from "react";
import { apicall2 } from "../../../utils/apicall/apicall2";
import useDebounce from "../../../utils/Hooks/useDebounce";
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
  const {
    data: reportData,
    isLoading: reportLoading,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
  } = useGetAccountingOrderDetails(params);
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
      let sdate = sValue.startDate.split("-");
      let edate = sValue.endDate.split("-");
      temp.order_id = sValue.orderno || "";
      temp.customer = sValue.customername || "";
      temp.phone = sValue.customerphone || "";
      temp.payment_id = sValue.paymentmethod || "";
      temp.account_status = sValue.accountstatus || "";
      temp.time_from = sdate[2] + "/" + sdate[1] + "/" + sdate[0] || "";
      temp.time_to = edate[2] + "/" + edate[1] + "/" + edate[0] || "";
      temp.filter_date = radio || "";
      console.log(temp);
      setParams(temp);
    },
    500,
    [sValue, radio]
  );
  useEffect(() => {
    getAccountOrderDetails(sValue);
  }, [load, sortBy?.order, sortBy?.field, radio]);

  const getPostUrl = (searchValue) => {
    let initial = true;
    let postUrl = "?";

    if (searchValue.orderno && searchValue.orderno.length > 0) {
      if (!initial) {
        postUrl = postUrl + "&";
      }
      postUrl = postUrl + "order_id=" + searchValue.orderno;
      initial = false;
    }
    if (searchValue.customername && searchValue.customername.length > 0) {
      if (!initial) {
        postUrl = postUrl + "&";
      }
      postUrl = postUrl + "customer=" + searchValue.customername;
      initial = false;
    }
    if (searchValue.customerphone && searchValue.customerphone.length > 0) {
      if (!initial) {
        postUrl = postUrl + "&";
      }
      postUrl = postUrl + "phone=" + searchValue.customerphone;
      initial = false;
    }
    if (searchValue.paymentmethod && searchValue.paymentmethod.length > 0) {
      if (!initial) {
        postUrl = postUrl + "&";
      }
      postUrl = postUrl + "payment_id=" + searchValue.paymentmethod;
      initial = false;
    }
    if (searchValue.accountstatus && searchValue.accountstatus.length > 0) {
      if (!initial) {
        postUrl = postUrl + "&";
      }
      postUrl = postUrl + "account_status=" + searchValue.accountstatus;
      initial = false;
    }
    if (searchValue.startDate && searchValue.startDate.length > 1) {
      if (!initial) {
        postUrl = postUrl + "&";
      }
      let sdate = searchValue.startDate.split("-");
      postUrl =
        postUrl + "time_from=" + sdate[2] + "/" + sdate[1] + "/" + sdate[0];
      initial = false;
    }
    if (searchValue.endDate && searchValue.endDate.length > 1) {
      if (!initial) {
        postUrl = postUrl + "&";
      }
      let edate = searchValue.endDate.split("-");
      postUrl =
        postUrl + "time_to=" + +edate[2] + "/" + edate[1] + "/" + edate[0];
      initial = false;
    }
    if (sortBy?.order) {
      if (!initial) {
        postUrl = postUrl + "&";
      }
      const orderType = sortBy?.order === "ascend" ? "asc" : "desc";
      postUrl = postUrl + "sort_order=" + orderType;
      initial = false;
      const sortByType = sortBy?.field;
      if (!initial) {
        postUrl = postUrl + "&";
      }
      postUrl = postUrl + "sort_by=" + sortByType;
      initial = false;
    }
    if (!initial) {
      postUrl = postUrl + "&";
    }
    postUrl = postUrl + "filter_date=" + radio;
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
        <Breadcrumb.Item>Reports</Breadcrumb.Item>
        <Breadcrumb.Item>Account Orders Details</Breadcrumb.Item>
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
        accountOrderDetails={getAccountOrderData}
        loading={reportLoading || isFetchingNextPage}
      />
    </div>
  );
};

export default AccountOrderDetails;
