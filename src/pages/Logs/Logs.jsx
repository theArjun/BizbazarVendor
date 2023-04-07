import React from "react";
import styles from "./logs.module.css";
import { LogList, LogSearch } from "..";
import { useGetLogs } from "../../apis/LogsApi";
import { useEffect } from "react";
import { useState } from "react";
const INITIAL_PARAMS = {
  period: "C",
  page: 1,
  time_from: "",
  time_to: "",
};
const Logs = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const [logs, setLogs] = useState([]);
  const { isLoading, data } = useGetLogs(params);

  useEffect(() => {
    if (data?.data?.logs && params.page === 1) {
      setLogs(data?.data?.logs);
    }
  }, [data]);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  useEffect(() => {
    if (data?.data?.logs?.length < 50) {
      return;
    }
    if (!bottom) {
      return;
    }
    let param = { ...params };
    param.page = param.page + 1;
    setParams(param);
    let temp_logs = [...logs, ...data?.data?.logs];
    setLogs(temp_logs);
  }, [bottom]);

  return (
    <div className={styles.logs}>
      <div className={styles.logTitle}>Activity logs</div>
      <LogSearch params={params} setParams={setParams} />
      <LogList handleScroll={handleScroll} logs={logs} loading={isLoading} />
    </div>
  );
};

export default Logs;
