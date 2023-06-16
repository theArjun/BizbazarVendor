import React, { useState } from "react";
import { Breadcrumb, Button, Result } from "antd";
import styles from "./CallRequests.module.css";
import { CallRequestsSearch, CallRequestsTable } from "../..";
import { useEffect } from "react";
import useDebounce from "../../../utils/Hooks/useDebounce";
import { useGetCallRequests } from "../../../apis/CallRequestsApi";
import { useMemo } from "react";
import { useGetStatuses } from "../../../apis/StatusApi";
import { Link, useNavigate } from "react-router-dom";
const INITIAL_PARAMS = {
  name: "",
  id: "",
  phone: "",
};
const CallRequests = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    data: callRequestData,
    isLoading: callRequestLoading,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
  } = useGetCallRequests(params);
  const { data: statusData, isLoading: statusLoading } = useGetStatuses();
  // Listening scrolling behavior
  useEffect(() => {
    document
      .querySelector("#cancelreq > div > div.ant-table-body ")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#cancelreq > div > div.ant-table-body ")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;

    setBottom(condition);
  };
  // Getting call requests
  const getCallRequests = useMemo(() => {
    let temp = [];
    callRequestData?.pages?.map((item, i) => {
      temp = [...temp, ...item?.data?.call_requests];
    });
    return temp;
  }, [callRequestData]);
  // getting statuses
  const getStatus = useMemo(() => {
    if (statusData?.data) {
      return statusData?.data?.statuses;
    }
    return [];
  }, [statusData]);
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
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/Orders/View Orders">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Call Requests</Breadcrumb.Item>
      </Breadcrumb>
      <CallRequestsSearch params={params} setParams={setParams} />
      <CallRequestsTable
        callRequest={getCallRequests}
        status={getStatus}
        loading={callRequestLoading || isFetchingNextPage}
      />
    </div>
  );
};

export default CallRequests;
