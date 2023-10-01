import React from "react";
import styles from "./StoreFronts.module.css";
import { Table, Tag } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
const StoreFronts = ({ storefronts, singleShipment, setSingleShipment }) => {
  const [data, setData] = useState([]);
  const windowSize = useWindowSize();
  useEffect(() => {
    let ids = singleShipment?.storefront_ids.split(",");
    let selected_stores = storefronts?.reduce((accumulator, currentValue) => {
      if (ids.includes(String(currentValue?.id))) {
        accumulator.push(parseInt(currentValue?.id));
      }
      return accumulator;
    }, []);
    setData(selected_stores);
  }, [singleShipment]);
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowKeys: data,
    onChange: (selectedRowKeys, selectedRows) => {
      let temp = { ...singleShipment };
      let select = selectedRowKeys.reduce((accumulator, currentValue) => {
        accumulator = accumulator + "," + currentValue;
        return accumulator;
      }, "");
      temp.storefront_ids = select.slice(1);
      setSingleShipment(temp);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const columns = [
    {
      title: "Storefront name",
      dataIndex: "data",
      key: "name",
      render: (text) => <a>{text?.name}</a>,
    },
    {
      title: "Url",
      dataIndex: "data",
      key: "url",
      render: (text) => (
        <a href={text?.url} target="_blank">
          {text?.url}
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "data",
      align: "right",
      key: "status",
      render: (data) => (
        <Tag color={data?.status === "Y" ? "green" : "red"}>
          {data?.status === "Y" ? "ON" : "OFF"}
        </Tag>
      ),
    },
  ];
  return (
    <div>
      <Table
        rowKey={"id"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={storefronts}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 600,
        }}
      />
    </div>
  );
};

export default StoreFronts;
