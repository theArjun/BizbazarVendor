import React, { useMemo, useState } from "react";
import { WithdrawalSearch, WithdrawalTable } from "../..";
import { useNavigate } from "react-router-dom";
import { useGetWithdrawals } from "../../../apis/AccountingApi";
import { Button, Result } from "antd";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  approval_status: "",
  time_from: "",
  time_to: "",
};
const Withdrawals = ({ status, getWithdrawInformation }) => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    data: withdrawalData,
    isLoading: withdrawalLoading,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useGetWithdrawals(params);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  // getting messages
  let getWithdrawals = useMemo(() => {
    let temp = [];
    withdrawalData?.pages?.map((el) => {
      temp = [...temp, ...el?.data];
    });
    return temp || [];
  }, [withdrawalData]);
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
      <WithdrawalSearch params={params} setParams={setParams} />
      <WithdrawalTable
        data={getWithdrawals}
        status={status}
        loading={withdrawalLoading || isFetchingNextPage}
        handleScroll={handleScroll}
      />
    </div>
  );
};

export default Withdrawals;
