import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";
import { Table, Image, Skeleton } from "antd";
import { apicall } from "../../../../utils/apicall/apicall";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";

const data = [
  {
    image: "https://m.media-amazon.com/images/I/51UKnksIdGL._SL1275_.jpg",
    status: "Pending",
    date: "12/13/2022, 11:00",
    type: "Withdrawal",
    t_value: "30600",
    v_cost: "0",
    cert_cost: "0",
    shipping_cost: "100",
    order_code: "48364",
    name: "Pendrive",
  },
];
const TransactionTable = ({ handleScroll, loading }) => {
  // const data = useSelector((state) => state.product.products);
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();
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
  // Set id
  const setSelectedRow = async (id, method) => {
    setProductId(id);
    if (method === "detail") {
      navigate("Edit Product");
    }
  };
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      data: "data",
      key: "product",
      render: (status, row) => (
        <div className={styles.product_info}>
          <Image width={70} src={!row ? "" : row.image} alt={""} />
          <div className={styles.product_name}>
            <strong>{row.name}</strong> <br />
            <a
              href="#"
              onClick={() => setSelectedRow(row["product_id"], "detail")}
            >
              #<small>{row.order_code}</small>
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Transaction value",
      dataIndex: "t_value",
      key: "t_value",
      render: (value) => <p>रु{value}</p>,
    },
    {
      title: "Voucher cost",
      key: "v_cost",
      dataIndex: "v_cost",
      render: (value) => <p>रु{value}</p>,
    },
    {
      title: "Gift certificate cost",
      key: "cert_cost",
      dataIndex: "cert_cost",
      render: (value) => <p>रु{value}</p>,
    },
    {
      title: "Shipping cost",
      dataIndex: "shipping_cost",
      key: "shipping_cost",
      render: (value) => <p>रु{value}</p>,
    },
    {
      title: "Total transaction",
      dataIndex: "total_transaction",
      key: "total_transaction",
      render: (value, row) => (
        <p>रु{row.t_value - row.shipping_cost - row.v_cost - row.cert_cost}</p>
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
              <span>{"रु44,760"}</span>
            </h5>
            <h5>
              Shipping cost:
              <span>रु44,760</span>
            </h5>
            <h5>
              Voucher cost:
              <span className={styles.red}>रु44,760</span>
            </h5>
            <h5>
              Gift certificate cost:
              <span className={styles.red}>रु44,760</span>
            </h5>
            <h5>
              Net income:
              <span>रु44,760</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
