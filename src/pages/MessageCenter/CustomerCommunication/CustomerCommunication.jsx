import React, { useEffect, useState } from "react";
import { CustomerCommunicationSearch, CustomerCommunicationTable } from "../..";
import { Breadcrumb } from "antd";
import { getVendorCustomerMessages } from "../../../apis/MessageCenterApi";
import { useMemo } from "react";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  time_from: "",
  time_to: "",
  customer_name: "",
};
const CustomerCommunication = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const {
    data: customerMessages,
    isLoading: messageLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = getVendorCustomerMessages(params);
  // getting messages
  let getCustomerMessages = useMemo(() => {
    let temp = [];
    customerMessages?.pages?.map((el) => {
      Object.values(el?.data?.threads || {})?.map((item) => {
        temp.push(item);
      });
    });
    return temp || [];
  }, [customerMessages]);
  // handle data when the there  is scroll in product table
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
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Message Center</Breadcrumb.Item>
        <Breadcrumb.Item>Customer Communications</Breadcrumb.Item>
      </Breadcrumb>
      <CustomerCommunicationSearch setParams={setParams} params={params} />
      <CustomerCommunicationTable
        loading={messageLoading || isFetchingNextPage}
        handleScroll={handleScroll}
        data={getCustomerMessages}
      />
    </div>
  );
};

export default CustomerCommunication;
