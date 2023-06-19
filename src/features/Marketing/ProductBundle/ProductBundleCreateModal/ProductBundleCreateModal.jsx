import { Modal } from "antd";
import React, { useState } from "react";
import styles from "./ProductBundleCreateModal.module.css";
import cx from "classnames";
import General from "./Components/General/General";
import Products from "./Components/Products/Products";
function ProductBundleCreateModal({ openCreateModal, setOpenCreateModal }) {
  const [activeTab, setActiveTab] = useState("General");
  const [productList, setProductList] = useState([]);
  const getDivision = () => {
    switch (activeTab) {
      case "General":
        return <General />;

      default:
        return (
          <Products productList={productList} setProductList={setProductList} />
        );
    }
  };
  return (
    <Modal
      title="Create Product Bundle"
      centered
      open={openCreateModal}
      okText="Create"
      onOk={() => setOpenCreateModal(false)}
      onCancel={() => setOpenCreateModal(false)}
      width={1000}
    >
      <div className={styles.tabWrapper}>
        {["General", "Products"].map((dat, i) => (
          <div
            className={cx(
              styles.tab,
              dat === activeTab ? styles.bgColor : null
            )}
            key={i}
            onClick={() => setActiveTab(dat)}
          >
            {dat}
          </div>
        ))}
      </div>
      <div className={styles.tabcontain}>{getDivision()}</div>
    </Modal>
  );
}

export default ProductBundleCreateModal;
