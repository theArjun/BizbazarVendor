import React, { useState, useRef } from "react";
import { Table, Button } from "antd";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

const AccountOrderDetailsTable = ({
  giftData,
  loading,
}) => {
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
      title: "Used date",
      dataIndex: "used_date",
      key: "order_id",
      render: (text) => getTimeAndDate(text),
    },
    {
      title: "Customer email",
      dataIndex: "email",
      key: "email",
      render: (text, dat) => (
        <a>{text}</a>
      ),
    },
    {
      title: "Customer number",
      dataIndex: "customer_number",
      key: "customer_number",
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      render: (text, dat) => (
        <div
          onClick={() => navigate(`/Orders/orders details/${dat.order_id}`)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          #{text}
        </div>
      ),
    },
    {
      title: "Total order value",
      dataIndex: "total_order_value",
      key: "total_order_value",
      render:(text)=>(
        <div>	रु{text}</div>
      )
    },
    {
      title: "Gift card amount used",
      dataIndex: "gift_card_amount_used",
      key: "gift_card_amount_used",
      render:(text)=>(
        <div>	रु{text}</div>
      )
    },

    {
      title: "Gift card number",
      dataIndex: "gift_card_number",
      key: "gift_card_number",
      render: (text, dat) => (
        <a>{text}</a>
      ),
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
        dataSource={giftData}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 500 : 300,
          x: 1200,
        }}
      />
      <div className={styles.positionabsolute}>
        <Button className={styles.print} onClick={handlePrint}>
          print
        </Button>
        <Button>
          <CSVLink
            filename={"Expense_Table.csv"}
            data={giftData}
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
          dataSource={giftData}
          pagination={false}
          // scroll={{ y: windowSize.height > 670 ? 450 : 300, x: 1000 }}
        />
      )}
    </div>
  );
};

export default AccountOrderDetailsTable;
