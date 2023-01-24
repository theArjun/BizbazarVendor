import React from "react";
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
import { Table } from "antd";
const ModalTable = ({ data, loading }) => {
  const windowSize = useWindowSize();

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
        dataSource={Object.values(data?data:[])}
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
