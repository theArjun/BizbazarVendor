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
  accountOrderDetails,
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
    console.log(timeStamp, date);
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
      title: "Date And Time",
      dataIndex: "timestamp",
      key: "order_id",
      render: (text) => getTimeAndDate(text),
      sorter: (a, b) => {},
    },
    {
      title: "Order Id",
      dataIndex: "order_id",
      key: "status_id",
      render: (text, dat) => (
        <div style={{ color: "blue", cursor: "pointer" }}>#{text}</div>
      ),
      width: 140,
      sorter: (a, b) => {},
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "order_id",
      render: (text, dat) => <div>{text}</div>,
    },
    {
      title: "TOTAL ORDER VALUE",
      dataIndex: "subtotal",
    },
    {
      title: "Status",
      dataIndex: "statuses",
      key: "order_id",

      width: 100,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "order_id",
    },

    {
      title: "PAYMENT METHOD",
      dataIndex: "payment_method",
      key: "order_id",
    },
    {
      title: "SHIPMENT AMOUNT",
      dataIndex: "shipping_cost",
      key: "order_id",
    },
    {
      title: "VENDOR PAYABLE AMOUNT",
      dataIndex: "vendor_payable_amount",
      key: "order_id",
    },
    {
      title: "REMAINING AMOUNT",
      dataIndex: "remaining_amount",
      key: "order_id",
    },
    {
      title: "GIFT CARD AMOUNT USED",
      dataIndex: "gift_card_amount_used",
      render: (text) => <>{text || 0}</>,
    },
    {
      title: "PRODUCT NAME",
      dataIndex: "product_name",
      render: (text) => <>{text}</>,
    },
    {
      title: "PRODUCT CATEGORY",
      dataIndex: "product_category",
    },
    {
      title: "SETTLEMENT STATUS",
      dataIndex: "settlement_status",
    },
    {
      title: "SETTLEMENT DATE",
      dataIndex: "settlement_date",
    },
    {
      title: "CASH VENDOR SETTLEMENT",
      dataIndex: "cash_vendor_settlement",
    },
  ];

  const total = () => {
    const data = order;
    const gr = data.reduce((init, dat) => init + parseInt(dat.total), 0);
    return gr;
  };

  const grossTotal = () => {
    const data = order;
    const t = data
      .filter((datt, ii) => datt.status === "P")
      .reduce((init, dat) => init + parseInt(dat.total), 0);

    return t;
  };

  function onChange(pagination, filters, sorter, extra) {
    page1.current = 1;
    setSortBy(sorter);
    // setOrder([]);
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
        loading={loading}
        dataSource={accountOrderDetails}
        pagination={false}
        scroll={{ y: windowSize.height > 670 ? 10000 : 3200, x: 2700 }}
        onChange={onChange}
      />
      <div className={styles.positionabsolute}>
        <Button className={styles.print} onClick={handlePrint}>
          print
        </Button>
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
          dataSource={accountOrderDetails}
          pagination={false}
          // scroll={{ y: windowSize.height > 670 ? 450 : 300, x: 1000 }}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default AccountOrderDetailsTable;
