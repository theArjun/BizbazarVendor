import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";
import { Table, Tag } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
const WithdrawalsTable = ({ handleScroll, loading, data }) => {
  const windowSize = useWindowSize();
  useEffect(() => {
    document
      .querySelector("#product > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#product > div > div.ant-table-body")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // getting status tag
  const getStatusTag = (status) => {
    switch (status) {
      case "P":
        return <Tag color="yellow">Pending</Tag>;
      case "C":
        return <Tag color="green">Completed</Tag>;
      case "D":
        return <Tag color="orange">Declined</Tag>;
      default:
        return <Tag color="magenta">Unknown</Tag>;
    }
  };
  // getting time and date
  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp * 1000));
    const monthyear = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
    });
    return monthyear + ", " + time;
  };
  const columns = [
    {
      title: "Status",
      dataIndex: "approval_status",
      data: "data",
      key: "product",
      render: (text) => getStatusTag(text),
    },
    {
      title: "Date",
      dataIndex: "payout_date",
      key: "date",
      render: (date) => getTimeAndDate(date),
    },
    {
      title: "Type",
      dataIndex: "payout_type",
      key: "type",
    },
    {
      title: "Transaction value",
      dataIndex: "payout_amount",
      key: "transaction",
      render: (value) => <p>रु{value}</p>,
    },
  ];
  return (
    <div>
      <Table
        id="product"
        rowKey={"payout_id"}
        loading={loading}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              Comment:
              {" " + record.comments}
            </p>
          ),
          rowExpandable: (record) => record.comments,
        }}
        dataSource={data}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};

export default WithdrawalsTable;
