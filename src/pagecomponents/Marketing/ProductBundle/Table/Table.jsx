import React from "react";
import styles from "./table.module.css";
import { Image, Table, Tag } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
const ProductBundleTable = (data) => {
  const windowSize = useWindowSize();
  const getTag = (status) => {
    if (status === "A") {
      return <Tag color="green">Active</Tag>;
    }
    return <Tag color="red">Disabled</Tag>;
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, row) => <Image src={image} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "	Price for all (रु )",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, dat) => getTag(text),
    },
  ];
  return (
    <React.Fragment>
      <Table
        id="product_bundle"
        rowKey={"product_id"}
        loading={""}
        columns={columns}
        dataSource={""}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 200,
          x: 600,
        }}
      />
    </React.Fragment>
  );
};

export default ProductBundleTable;
