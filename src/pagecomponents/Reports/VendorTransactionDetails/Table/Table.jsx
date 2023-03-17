import React, { useState, useRef } from "react";
import { Table, Button } from "antd";
import styles from "./Table.module.css";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

const AccountOrderDetailsTable = ({
  accountOrderDetails,
  setSortBy,
  loading,
  page1,
}) => {
  const windowSize = useWindowSize();

  const [print, setPrint] = useState(false);

  const componentRef = useRef();

  const columns = [
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Vendor name",
      dataIndex: "vendor_name",
      key: "vendor_name",
    },
    {
      title: "Total order amount",
      dataIndex: "total_order_amount",
      key: "total_order_amount",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },

    {
      title: "Total shipping",
      dataIndex: "total_shipping",
      key: "total_shipping",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },
    {
      title: "Total withdrawal",
      dataIndex: "total_withdrawal",
      key: "total_withdrawal",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },
    {
      title: "Total payout addition",
      dataIndex: "total_payout_addition",
      key: "total_payout_addition",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },
    {
      title: "Total payout deduction",
      dataIndex: "total_payout_deduction",
      key: "total_payout_deduction",
      render:(text)=>(
        <div>रु{text}</div>
      )
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key:'balance',
      render:(text)=>(
        <div>रु{text}</div>
      )
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
        rowKey={"company_id"}
        loading={loading}
        dataSource={accountOrderDetails}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 500 : 300,
          x: 1500,
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
          loading={loading}
          dataSource={accountOrderDetails}
          pagination={false}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default AccountOrderDetailsTable;
