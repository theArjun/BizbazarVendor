import React, { useEffect, useState, useRef } from "react";
import { Table, Button } from "antd";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import { Dropdown, Menu, Space } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import { apicall } from "../../../../utils/apicall/apicall";

const AccountOrderDetailsTable = ({
  status,
  setAccountOrderDetails,
  couponData,
  setSortBy,
  loading,
  page1,
  setLoad,
}) => {
  const windowSize = useWindowSize();

  const [print, setPrint] = useState(false);

  const componentRef = useRef();

  const navigate = useNavigate();

  const menu = (filterStatus, objId) => (
    <Menu
      items={status
        .filter((datt, ii) => filterStatus != datt?.description)
        .map((dat, i) => ({
          key: i,
          label: (
            <div target="_blank" style={{ color: dat?.params?.color }}>
              {dat.description}
            </div>
          ),
        }))}
    />
  );

  const getStatusTag = (data, obj) => {
    const [statusOfRow] = status.filter((dat) => dat.status === data);

    return (
      <Dropdown overlay={menu(statusOfRow?.description, obj)}>
        <Tag className={styles.dpContainer} color={statusOfRow?.params?.color}>
          {statusOfRow?.description}
        </Tag>
      </Dropdown>
    );
  };

  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp) * 1000);
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
      title: "Order Id",
      dataIndex: "order_id",
      key: "status_id",
      render: (text, dat) => (
        <div
          onClick={() => navigate(`/Orders/orders details/${dat.order_id}`)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          #{text}
        </div>
      ),
      width: 140,
      sorter: (a, b) => {},
    },
    {
      title: "Date And Time",
      dataIndex: "order_date",
      key: "date",
      render: (text) => getTimeAndDate(text),
      sorter: (a, b) => {},
    },
    {
      title: "Company name",
      dataIndex: "company_name",
      key: "company_name",
      render: (text, dat) => <div>{text}</div>,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key:'customer'
    },
    {
      title: "Customer number",
      dataIndex: "customer_number",
      key: "customer_number",
    },
    {
      title: "Total order value",
      dataIndex: "total_order_value",
      key: "total_order_value",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },

    {
      title: "Promotion  value",
      dataIndex: "promotion_value",
      key: "promotion_value",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },
    {
      title: "Net order value",
      dataIndex: "net_order_value",
      key: "net_order_value",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },
    {
      title: "Promotion name",
      dataIndex: "promotion_value",
      key: "promotion_value",
    },
    {
      title: "Order status",
      dataIndex: "status_id",
      key: "status_id",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    page1.current = 1;

    setSortBy(sorter);
  }

  const printing = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setPrint(false),
  });

  const handlePrint = () => {
    setPrint(true);
    const time = setTimeout(printing, 10);
    return () => clearTimeout(time);
  };

  return (
    <div>
      <Table
        id="reportaccount"
        columns={columns}
        rowKey={"order_id"}
        loading={loading}
        dataSource={couponData}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 500 : 300,
          x: 1800,
        }}
        onChange={onChange}
      />
      <div className={styles.positionabsolute}>
        <Button className={styles.print} onClick={handlePrint}>
          print
        </Button>
        <Button>
          <CSVLink
            filename={"Expense_Table.csv"}
            data={couponData}
            className="btn btn-primary"
            onClick={() => {}}
          >
            Export to CSV
          </CSVLink>
        </Button>
      </div>

      {print && <div className={styles.margintop} />}
      {print && (
        <Table
          id="reporprintTableaccount1"
          className={styles.printTable}
          style={{ zIndex: -1 }}
          columns={columns}
          ref={componentRef}
          rowKey={"order_id"}
          // loading={loading}
          dataSource={couponData}
          pagination={false}
          // scroll={{ y: windowSize.height > 670 ? 450 : 300, x: 1000 }}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default AccountOrderDetailsTable;
