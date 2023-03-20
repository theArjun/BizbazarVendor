import React, { useState, useRef } from "react";
import { Table, Button } from "antd";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
const AccountOrderDetailsTable = ({
  orderData,
  status,
  loading,
}) => {
  const windowSize = useWindowSize();
  const [print, setPrint] = useState(false);
  const componentRef = useRef();
  const navigate = useNavigate();

  const getStatusTag = (data) => {
    const [statusOfRow] = status.filter((dat) => dat.value === data);

    return (
      <React.Fragment>
        <Tag className={styles.dpContainer} color={statusOfRow?.color}>
          {statusOfRow?.label}
        </Tag>
      </React.Fragment>
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
      key: "order_id",
      render: (text, dat) => (
        <div
          onClick={() => navigate(`/Orders/orders details/${dat.order_id}`)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          #{text}
        </div>
      ),
      width: 100,
    },
    {
      title: "Order date",
      dataIndex: "ordered_date",
      key: "ordered_date",
      render: (text) => getTimeAndDate(text),
    },

    {
      title: "Vendor name",
      dataIndex: "vendor_name",
      key: "vendor_name",
    },
    {
      title: "Vendor address",
      dataIndex: "vendor_address",
      key: "vendor_address",
    },
    {
      title: "Vendor phone",
      dataIndex: "vendor_phone",
      key: "vendor_phone",
    },
    {
      title: "Product name",
      dataIndex: "product_name",
      key: "product_name",
    },

    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Order status",
      dataIndex: "order_status",
      key: "order_status",
      render:(status)=>getStatusTag(status)
    },
    {
      title: "Shipping cost",
      dataIndex: "shipping_cost",
      key: "shipping_cost",
      render: (text) => <div>रु{text || 0}</div>,
    },
    {
      title: "Total cost including shipping",
      dataIndex: "total_cost_including_shipping",
      key: "total_cost_including_shipping",
      render: (text) => <div>रु{text || 0}</div>,
    },
    {
      title: "Order delivery remarks",
      dataIndex: "order_delivery_remarks",
      key: "order_delivery_remarks",
    },
    {
      title: "Shipping customer name",
      dataIndex: "shipping_customer_name",
      key: "shipping_customer_name",
    },
    {
      title: "Shipping address",
      dataIndex: "shipping_address",
      key: "shipping_address",
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
        dataSource={orderData}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 500 : 300,
          x: 1800,
        }}
      />
      <div className={styles.positionabsolute}>
        <Button className={styles.print} onClick={handlePrint}>
          print
        </Button>
        <Button>
          <CSVLink
            filename={"Expense_Table.csv"}
            data={orderData}
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
          dataSource={orderData}
          pagination={false}
          // scroll={{ y: windowSize.height > 670 ? 450 : 300, x: 1000 }}
        />
      )}
    </div>
  );
};

export default AccountOrderDetailsTable;
