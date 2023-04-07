import React from "react";
import styles from "./logs.module.css";
import { LogList, LogSearch } from "..";
import { useGetLogs } from "../../apis/LogsApi";
import { useEffect } from "react";
import { useState } from "react";
import useDebounce from "../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const Logs = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const [logs, setLogs] = useState([]);
  const { isLoading, data, isFetchingNextPage, fetchNextPage } =
    useGetLogs(params);

  useEffect(() => {
    let temp = [];
    data?.pages?.map((el) => {
      el?.data?.logs?.map((item) => {
        temp.push(item);
      });
    });
    setLogs(temp || []);
  }, [data]);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
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
    <div className={styles.logs}>
      <div className={styles.logTitle}>Activity logs</div>
      <LogSearch params={params} setParams={setParams} />
      <LogList
        handleScroll={handleScroll}
        logs={logs}
        loading={isLoading || isFetchingNextPage}
      />
    </div>
  );
};

export default Logs;
