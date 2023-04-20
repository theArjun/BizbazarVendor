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
      title: "Date and time",
      dataIndex: "timestamp",
      key: "order_id",
      render: (text) => getTimeAndDate(text),
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
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "order_id",
      render: (text, dat) => <div>{text}</div>,
    },
    {
      title: "Total order value",
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
      title: "Payment method",
      dataIndex: "payment_method",
      key: "order_id",
    },
    {
      title: "Shipment amount",
      dataIndex: "shipping_cost",
      key: "order_id",
    },
    {
      title: "Vendor payable amount",
      dataIndex: "vendor_payable_amount",
      key: "order_id",
    },
    {
      title: "Remaining amount",
      dataIndex: "remaining_amount",
      key: "order_id",
    },
    {
      title: "Gif card amount used",
      dataIndex: "gift_card_amount_used",
      render: (text) => <>{text || 0}</>,
    },
    {
      title: "Product name",
      dataIndex: "product_name",
      render: (text) => <>{text}</>,
    },
    {
      title: "Product category",
      dataIndex: "product_category",
    },
    {
      title: "Settlement status",
      dataIndex: "settlement_status",
    },
    {
      title: "Settlement date",
      dataIndex: "settlement_date",
      render: (text) => getTimeAndDate(text),
    },
    {
      title: "Cash vendor settlement",
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
          y: windowSize.height > 670 ? 450 : 300,
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
