import React, { useEffect, useState } from "react";
import { CustomerCommunicationSearch, CustomerCommunicationTable } from "../..";
import { Breadcrumb } from "antd";
import { getVendorCustomerMessages } from "../../../apis/MessageCenterApi";
const INITIAL_PARAMS = {
  time_from: "",
  time_to: "",
  customer_name: "",
};
const CustomerCommunication = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);

  const { data: customerMessages, isLoading: messageLoading } =
    getVendorCustomerMessages(params);
  useEffect(() => {}, []);
  //get admin messages
  const getCustomerMessages = () => {
    if (customerMessages) {
      let message = Object.values(customerMessages?.data?.threads || {});
      return message;
    }
    return [];
  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Message Center</Breadcrumb.Item>
        <Breadcrumb.Item>Customer Communications</Breadcrumb.Item>
      </Breadcrumb>
      <CustomerCommunicationSearch setParams={setParams} params={params} />
      <CustomerCommunicationTable
        loading={messageLoading}
        data={getCustomerMessages()}
      />
    </div>
  );
};

export default CustomerCommunication;
