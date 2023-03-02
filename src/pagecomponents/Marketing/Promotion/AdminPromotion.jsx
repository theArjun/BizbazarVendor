import React, { useState } from "react";
import styles from "./Promotion.module.css";
import { Breadcrumb, Button, Table } from "antd";
import ProductModal from "./ProductModal/ProductModal";
import useWindowSize from "../../../utils/Hooks/useWindowSize";
const AdminPromotion = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const windowSize= useWindowSize()
  const columns = [
    {
      title: "",
      dataIndex: "image_pair",
      render:(image, row)=>(
        <div>
        <Image src={row?.main_pair?.detailed?.image_path}  width={50}/>
        </div>
      )
    },
    {
      title: "Name/Code",
      dataIndex: "name",
      render:(text, row)=>(
        <>
        <div className={styles.product_name}>
        <h4>{row?.product}</h4>
        <p>{row?.product_code}</p>
        </div>
        </>
        
      )
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "List price",
      dataIndex: "list_price",
    },
    {
      title: "Quantity",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <div className={styles.container.admin_promotion}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Edit Catalog Promotion</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={""} type="primary">
          Save changes
        </Button>
      </div>
      <div className={styles.top_section}>
        <div className={styles.promotion_name}>
          <p>{data?.name}</p>
        </div>
      </div>
      <div></div>
      <div className={styles.promotion_body}>
        <div className={styles.add_btn}>
          <Button type="primary" onClick={() => setModalOpen(true)}>
            {" "}
            Add products
          </Button>

        </div>
        <div className={styles.tableContain}>
        <Table
           rowKey={"product_id"}
          dataSource={[]}
          columns={columns}
          pagination={false}
          scroll={{
            y: windowSize.height > 670 ? 300 : 200,
            x: 1000,
          }}
        />
      </div>
      </div>
      <ProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AdminPromotion;
