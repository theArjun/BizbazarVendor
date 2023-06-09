import React, { useState } from "react";
import styles from "./CreateModal.module.css";
import { Modal } from "antd";
import cx from "classnames";
import General from "./components/General/General";
import Variants from "./components/Variants/Variants";
let data = [
  {
    name: "Apple",
    more: false,
    position: 0,
    modifier: "1200",
    type: "%",
    status: "A",
  },
  {
    name: "Mango",
    more: false,
    position: 0,
    modifier: "1200",
    type: "रु",
    status: "D",
  },
  {
    name: "Grapes",
    more: false,
    position: 0,
    modifier: "1200",
    type: "रु ",
    status: "A",
  },
  {
    name: "Watermelon",
    more: false,
    position: 0,
    modifier: "1200",
    type: "%",
    status: "D",
  },
];
function CreateModal({ openCreateModal, setOpenCreateModal }) {
  const [activeTab, setActiveTab] = useState("General");
  const [variants, setVariants] = useState(data);
  const getDivision = () => {
    switch (activeTab) {
      case "Variants":
        return <Variants variants={variants} setVariants={setVariants} />;
      default:
        return <General />;
    }
  };
  return (
    <Modal
      title="Create Option"
      centered
      open={openCreateModal}
      okText="Create"
      onOk={() => setOpenCreateModal(false)}
      onCancel={() => setOpenCreateModal(false)}
      width={1000}
    >
      <div className={styles.tabWrapper}>
        {["General", "Variants"].map((dat, i) => (
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

export default CreateModal;
