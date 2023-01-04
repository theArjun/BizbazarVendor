import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";
import { Table, Tag } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
const TransactionTable = ({ handleScroll, loading, data, status,getTotalTransaction,getTotalShipping,getTotalVoucher,getTotalGift, getNetIncome}) => {
  const windowSize = useWindowSize();
  useEffect(() => {
    document
      .querySelector("#product > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#product > div > div.ant-table-body")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);


// getting status tag
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
// getting time and date 
  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp*1000));
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
      title: "Status",
      dataIndex: "approval_status",
      data: "data",
      key: "product",
      render: (text) => getStatusTag(text=='P'?'G':text)
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render:(text, row)=>getTimeAndDate(row.payout_date)
    },
    {
      title: "Type",
      dataIndex: "payout_type",
      key: "type",
    },
    {
      title: "Transaction value",
      dataIndex: "payout_amount",
      key: "t_value",
      render: (value) => <p>रु{value}</p>,
    },
    {
      title: "Voucher cost",
      key: "v_cost",
      dataIndex: "voucher_cost",
      render: (value) => <p>रु{value?value:0}</p>,
    },
    {
      title: "Gift certificate cost",
      key: "cert_cost",
      dataIndex: "gift_certificate_cost",
      render: (value) => <p>रु{value?value:0}</p>,
    },
    {
      title: "Shipping cost",
      dataIndex: "shipping_cost",
      key: "shipping_cost",
      render: (value) => <p>रु{value?value:0}</p>,
    },
    {
      title: "Total transaction",
      dataIndex: "total_transaction",
      key: "total_transaction",
      render: (value, row) => (
        <p>रु{parseFloat(row?.payout_amount?row.payout_amount:0) - parseFloat(row?.shipping_cost?row.shipping_cost:0) - parseFloat(row?.voucher_cost?row.voucher_cost:0) - parseFloat(row?.gift_certificate_cost?row.gift_certificate_cost:0)}</p>
      ),
    },
  ];
  return (
    <div>
      <Table
        id="product"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 1000,
        }}
      />
      <div className={styles.right_card}>
        <div className={styles.right_container}>
          <div className={styles.title}>
            <h3>Total</h3>
          </div>
          <div className={styles.right_card_body}>
            <h5>
              Total Transaction value:
              <span>रु{getTotalTransaction()}</span>
            </h5>
            <h5>
              Shipping cost:
              <span>रु{getTotalShipping()}</span>
            </h5>
            <h5>
              Voucher cost:
              <span className={styles.red}>रु{getTotalVoucher()}</span>
            </h5>
            <h5>
              Gift certificate cost:
              <span className={styles.red}>रु{getTotalGift()}</span>
            </h5>
            <h5>
              Net income:
              <span>रु{getNetIncome()}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
