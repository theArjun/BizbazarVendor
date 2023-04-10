import React, { useEffect, useState, useRef } from "react";
import { Table, Button } from "antd";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

const AccountOrderDetailsTable = ({ accountOrderDetails, loading }) => {
  const windowSize = useWindowSize();

  const [print, setPrint] = useState(false);

  const componentRef = useRef();

  const navigate = useNavigate();

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
        dataSource={accountOrderDetails}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 500 : 300,
          x: 2500,
        }}
      />
      <div className={styles.positionabsolute}>
        <Button className={styles.print} onClick={handlePrint}>
          print
        </Button>
        <Button>
          <CSVLink
            filename={"Expense_Table.csv"}
            data={accountOrderDetails}
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
        />
      )}
    </div>
  );
};

export default AccountOrderDetailsTable;
