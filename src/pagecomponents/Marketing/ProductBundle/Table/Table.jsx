import React, { useState } from "react";
import styles from "./table.module.css";
import { Image, Table, Tag, Select, Button } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
const ProductBundleTable = ({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const windowSize = useWindowSize();
  const getTag = (status) => {
    if (status === "A") {
      return <Tag color="green">Active</Tag>;
    }
    return <Tag color="red">Disabled</Tag>;
  };
  // Method to delete product bundle
  const deleteProductBundle = () => {
    console.log("Clicked, Deleted");
  };
  // Method to change status
  const changeStatus = () => {
    console.log("Change status clicked");
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
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <React.Fragment>
      <div className={styles.action_buttons}>
        <Button disabled={!hasSelected} onClick={deleteProductBundle}>
          Delete
        </Button>
        <Select
          disabled={!hasSelected}
          defaultValue="Status"
          style={{
            width: 170,
          }}
          onChange={changeStatus}
          options={[
            {
              label: "Change to Active",
              value: "A",
            },
            {
              label: "Change to Disabled",
              value: "D",
            },
          ]}
        />
      </div>
      <Table
        id="product_bundle"
        rowKey={"product_id"}
        rowSelection={rowSelection}
        loading={""}
        columns={columns}
        dataSource={data}
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
