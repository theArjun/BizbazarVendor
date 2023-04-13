import React, { useState, useMemo } from "react";
import { Breadcrumb, Button, Result } from "antd";
import styles from "./VendorTransactionDetails.module.css";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../utils/Hooks/useDebounce";
import VendorTransactionDetailsSearch from "../../../pagecomponents/Reports/VendorTransactionDetails/Search/Search";
import VendorTransactionsReportTable from "../../../pagecomponents/Reports/VendorTransactionDetails/Table/Table";
import { useGetVendorTransactionDetails } from "../../../apis/ReportsApi";
const INITIAL_PARAMS = {
  time_from: "",
  time_to: "",
  vendor: "",
};
const VendorTransactionDetails = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    isLoading: transactionLoading,
    data: transactionData,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useGetVendorTransactionDetails(params);
  //  for getting coupon reports
  let getTransactionReportData = useMemo(() => {
    let temp = [];
    transactionData?.pages?.map((el) => {
      el?.data?.report?.map((item) => {
        temp.push(item);
      });
    });
    return temp || [];
  }, [transactionData]);
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
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
        <Breadcrumb.Item>Vendor Transaction Details</Breadcrumb.Item>
      </Breadcrumb>
      <VendorTransactionDetailsSearch params={params} setParams={setParams} />
      <VendorTransactionsReportTable
        accountOrderDetails={getTransactionReportData}
        handleScroll={handleScroll}
        loading={transactionLoading || isFetchingNextPage}
      />
    </div>
  );
};

export default VendorTransactionDetails;
