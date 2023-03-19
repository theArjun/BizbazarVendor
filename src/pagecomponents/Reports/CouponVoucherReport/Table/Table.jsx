import React, { useEffect, useState, useRef } from "react";
import { Table, Button } from "antd";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

const AccountOrderDetailsTable = ({
  status,
  couponData,
  loading,
}) => {
  const windowSize = useWindowSize();

  const [print, setPrint] = useState(false);

  const componentRef = useRef();

  const navigate = useNavigate();

  const getStatusTag = (data) => {
    const [statusOfRow] = status.filter((dat) => dat.value === data);
    return (
      <div>
      <Tag className={styles.dpContainer} color={statusOfRow?.color}>
        {statusOfRow?.label}
      </Tag>
      </div>
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
    },
    {
      title: "Date And Time",
      dataIndex: "order_date",
      key: "date",
      render: (text) => getTimeAndDate(text),
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
      render:(status)=>getStatusTag(status)
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
        dataSource={couponData}
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
        />
      )}
    </div>
  );
};

export default AccountOrderDetailsTable;
