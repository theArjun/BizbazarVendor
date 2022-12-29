import React, { useEffect } from "react";
import styles from "./ProductCountReport.module.css";
import { Button, Space, Table, Tag } from "antd";
import { CSVLink } from "react-csv";
import { useLocation } from "react-router-dom";
import { apicall } from "../../../utils/apicall/apicall";

function ProductCountReport() {
  const location = useLocation();

  const columns = [
    {
      title: "Vendor Id",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vendor Name",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Vendor Plan",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Products",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Active Products",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Disable Products",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Out Of Stock Products",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Image Missing Products",
      dataIndex: "address",
      key: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ];
  return (
    <div className={styles.container}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        scroll={{
          y: 240,
          x: 1000,
        }}
      />
      {location.pathname != "/" && (
        <div className={styles.positionabsolute}>
          <Button className={styles.print}>print</Button>
          <Button>
            <CSVLink
              filename={"Expense_Table.csv"}
              data={[]}
              className="btn btn-primary"
              onClick={() => {}}
            >
              Export to CSV
            </CSVLink>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductCountReport;
