import React from "react";
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
import { Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
const ModalTable = ({ data, loading, product_data }) => {
  const windowSize = useWindowSize();
  const [variation, setVariation] = useState([]);
  useEffect(() => {
    if (data[0]?.value) {
      let temp_data = data?.map((item, i) => ({
        name: product_data?.product,
        feature: item?.label,
        code: product_data.product_code
          ? product_data.product_code + "_" + randomIntFromInterval(1000, 9999)
          : "product_" + randomIntFromInterval(1000, 9999),
        price: product_data?.price,
        quantity: product_data?.amount,
      }));
      setVariation(temp_data);
    } else {
      let t_data = data?.map((item, i) => {
        if (item.length) {
          let feat = "";
          item.map((variant) => {
            feat = feat + ", " + variant?.label;
          });
          return {
            name: product_data?.product,
            feature: feat.substring(1),
            code: product_data.product_code
              ? product_data.product_code +
                "_" +
                randomIntFromInterval(1000, 9999)
              : "product_" + randomIntFromInterval(1000, 9999),
            price: product_data?.price,
            quantity: product_data?.amount,
          };
        }
      });
      setVariation(t_data[0] !== undefined ? t_data : "");
    }
  }, [data]);
  // random number generator
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const columns = [
    {
      title: "FEATURES",
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CODE",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "PRICE",
      key: "price",
      dataIndex: "price",
      render: (text) => <div>{parseFloat(text).toFixed(2)}</div>,
    },
    {
      title: "QUANTITY",
      key: "quantity",
      dataIndex: "quantity",
    },
  ];
  return (
    <div>
      <p>Modify the variations to be created.</p>
      <Table
        id="product"
        loading={loading}
        columns={columns}
        dataSource={variation}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};

export default ModalTable;
