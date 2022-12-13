import React, { useState } from "react";
import { Breadcrumb } from "antd";
import styles from "./CallRequests.module.css";
import { CallRequestsSearch, CallRequestsTable } from "../..";
import { useEffect } from "react";
import { apicall } from "../../../utils/apicall/apicall";
import { useRef } from "react";
import useDebounce from "../../../utils/Hooks/useDebounce";
const CallRequests = () => {
  const [callRequest, setCallRequest] = useState([]);
  const [sValue, setSearchValue] = useState({});
  const [bottom, setBottom] = useState(false);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  const page = useRef(1);

  const a = Object.values(sValue).join("");

  useDebounce(
    () => {
      page.current = 1;
      getCallRequest();
    },
    1000,
    [a]
  );

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

  useEffect(() => {
    getCallRequest();
  }, []);

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (!bottom) return;
    page.current = page.current + 1;
    getMoreCallRequest();
  }, [bottom]);

  const getStatus = async () => {
    const result = await apicall({
      url: "statuses",
    });

    setStatus(result.data.statuses);
  };

  const getCallRequest = async () => {
    setLoading(true);
    const result = await apicall({
      url: getUrl(sValue),
    });

    if (result.status === 200) {
      setCallRequest(result?.data?.call_requests);
    }
    setLoading(false);
  };

  const getMoreCallRequest = async () => {
    setLoading(true);
    const result = await apicall({
      url: getUrl(sValue),
    });

    if (result.status === 200) {
      setCallRequest((prev) => [...prev, ...result?.data?.call_requests]);
    }
    setLoading(false);
  };

  const getUrl = (values) => {
    let newUrl = "vendors/62/call_requests?is_search=Y";
    if (values?.name) {
      newUrl = newUrl + "&name=" + values.name;
    }
    if (values?.phone) {
      newUrl = newUrl + "&phone=" + values.phone;
    }
    if (values?.id) {
      newUrl = newUrl + "&id=" + values.id;
    }

    return newUrl + `&page=${page.current}&items_per_page=${50}`;
  };

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Orders</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Call Requests</Breadcrumb.Item>
      </Breadcrumb>
      <CallRequestsSearch
        callRequest={callRequest}
        setCallRequest={setCallRequest}
        setSearchValue={setSearchValue}
      />
      <CallRequestsTable
        callRequest={callRequest}
        setCallRequest={setCallRequest}
        status={status}
        loading={loading}
      />
    </div>
  );
};

export default CallRequests;
