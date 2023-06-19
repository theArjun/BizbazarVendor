import React, { useEffect, useRef, useState } from "react";
import styles from "./Table.module.css";
import { Table, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { useReactToPrint } from "react-to-print";
const USER_TYPE = {
  A: "Admin",
  C: "Customer",
  V: "Vendor",
};
const MonthlyOrderReportTable = ({ data, loading, status, handleScroll }) => {
  const [print, setPrint] = useState(false);
  const windowSize = useWindowSize();
  const componentRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    document
      .querySelector("#reportaccount > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#reportaccount > div > div.ant-table-body")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
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
  const printing = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setPrint(false),
  });

  const handlePrint = () => {
    setPrint(true);
    const time = setTimeout(printing, 10);
    return () => clearTimeout(time);
  };
  const getStatusTag = (data, obj) => {
    const [statusOfRow] = status.filter((dat) => dat.status === data);

    return (
      <div>
        <Tag className={styles.dpContainer} color={statusOfRow?.params?.color}>
          {statusOfRow?.description}
        </Tag>
      </div>
    );
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
      title: "Customer",
      dataIndex: "customer",
      key: "customer_id",
      width: 150,
      render: (text, dat) => <div>{text}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "order_id",
      width: 150,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "order_id",
      width: 250,
    },

    {
      title: "Order date",
      dataIndex: "timestamp",
      key: "order_id",
      width: 200,
      render: (date) => getTimeAndDate(date),
    },
    {
      title: "Order status",
      dataIndex: "status",
      key: "order_id",
      width: 150,
      render: (status, row) => getStatusTag(status),
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "order_id",
    },
    {
      title: "Product name",
      dataIndex: "order_detail",
      key: "order_id",
      width: 150,
      render: (detail) => (
        <React.Fragment>
          <div>{detail[0]?.product_name}</div>
        </React.Fragment>
      ),
    },
    {
      title: "Category",
      dataIndex: "order_detail",
      key: "category",
      width: 150,
      render: (detail) => (
        <React.Fragment>
          <div>{detail[0]?.category}</div>
        </React.Fragment>
      ),
    },
    {
      title: "Price",
      dataIndex: "order_detail",
      key: "price",
      width: 150,
      render: (detail) => (
        <React.Fragment>
          <div>{detail[0]?.price}</div>
        </React.Fragment>
      ),
    },
    {
      title: "User type",
      dataIndex: "user_type",
      key: "user_type",
      render: (type) => USER_TYPE[type],
    },
    {
      title: "User group",
      dataIndex: "usergroup",
    },
  ];
  return (
    <div className={styles.report_table_container}>
      <div className={styles.positionabsolute}>
        <Button className={styles.print} onClick={handlePrint}>
          print
        </Button>
        <Button>
          <CSVLink
            filename={"Monthly_Report_Table.csv"}
            data={data}
            className="btn btn-primary"
            onClick={() => {}}
          >
            Export to CSV
          </CSVLink>
        </Button>
      </div>
      <Table
        id="reportaccount"
        columns={columns}
        loading={loading}
        rowKey={"order_id"}
        dataSource={data}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 500 : 300,
          x: 1800,
        }}
      />

      {print && <div className={styles.margintop} />}
      {print && (
        <React.Fragment>
          <h2 style={{ textAlign: "center" }}>Monthly order report</h2>
          <Table
            id="reporprintTableaccount1"
            className={styles.printTable}
            style={{ zIndex: 100 }}
            columns={columns}
            ref={componentRef}
            rowKey={"order_id"}
            // loading={loading}
            dataSource={data}
            pagination={false}
            //   onChange={onChange}
          />
        </React.Fragment>
      )}
    </div>
  );
};
export default MonthlyOrderReportTable;
