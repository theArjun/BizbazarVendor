import React, { useState } from "react";
import { useMemo } from "react";
import { TransactionTable, TransactionSearch } from "../..";
import { useGetTransactions } from "../../../apis/AccountingApi";
import useDebounce from "../../../utils/Hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
const INITIAL_PARAMS = {
  payout_type: "",
  approval_status: "",
  time_from: "",
  time_to: "",
};
const Transactions = ({ status }) => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    data: transactionData,
    isLoading: transactionLoading,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useGetTransactions(params);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  // getting messages
  let getTransactions = useMemo(() => {
    let temp = [];
    transactionData?.pages?.map((el) => {
      temp = [...temp, ...el?.data];
    });
    return temp || [];
  }, [transactionData]);
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
    <div>
      <TransactionSearch
        data={getTransactions}
        params={params}
        setParams={setParams}
      />
      <TransactionTable
        data={getTransactions}
        status={status}
        loading={transactionLoading || isFetchingNextPage}
        handleScroll={handleScroll}
      />
    </div>
  );
};

export default Transactions;
