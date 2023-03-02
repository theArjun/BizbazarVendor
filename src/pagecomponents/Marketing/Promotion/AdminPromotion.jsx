import React, { useState } from "react";
import styles from "./Promotion.module.css";
import { Breadcrumb, Button, Table, } from "antd";
import ProductModal from "./ProductModal/ProductModal";
import useWindowSize from "../../../utils/Hooks/useWindowSize";
import { useGetPromotionProducts } from "../../../apis/PromotionApi";
const AdminPromotion = ({ data , loading}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const windowSize = useWindowSize();
  const { isLoading: productLoading, data: productData } =
    useGetPromotionProducts();
  const prepareData = (ids = "") => {
    try {
      let product_ids = String(ids);
      let arr_ids = product_ids.slice(9).split(",");
      let products = productData?.data?.products?.filter((item, i) => arr_ids.includes(String(item?.product_id))
      );
     return products
    } catch (err) {
      console.log("Error  has occured", err);
    }
  };
  const columns = [
    {
      title: "Name/Code",
      dataIndex: "name",
      render: (text, row) => (
        <>
          <div className={styles.product_name}>
            <h4>{row?.product}</h4>
            <p>{row?.product_code}</p>
          </div>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
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
            loading={productLoading || loading}
            rowKey={"product_id"}
            dataSource={prepareData(data?.conditions_hash)}
            columns={columns}
            pagination={false}
            scroll={{
              y: windowSize.height > 670 ? 300 : 200,
              x: 1000,
            }}
          />
        </div>
      </div>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        productData={productData?.data?.products}
      />
    </div>
  );
};

export default AdminPromotion;
