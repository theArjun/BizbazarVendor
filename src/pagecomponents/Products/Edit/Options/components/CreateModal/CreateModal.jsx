import React, { useState } from "react";
import styles from "./CreateModal.module.css";
import { Modal, message } from "antd";
import cx from "classnames";
import General from "./components/General/General";
import Variants from "./components/Variants/Variants";
function CreateModal({ openCreateModal, setOpenCreateModal }) {
  const [activeTab, setActiveTab] = useState("General");
  const [variants, setVariants] = useState([]);
  const getDivision = () => {
    switch (activeTab) {
      case "Variants":
        return <Variants variants={variants} setVariants={setVariants} />;
      default:
        return <General />;
    }
  };
  // Checking duplicate array of objects
  const checkDuplicateVariants = (array = []) => {
    // Using Array.prototype.some()
    const hasDuplicate = array.some((obj, index) => {
      return array.some((innerObj, innerIndex) => {
        return innerIndex !== index && innerObj.name.trim() === obj.name.trim();
      });
    });
    return hasDuplicate;
  };
  //  handle create variants
  const handleCreateVariants = () => {
    let emptyNameCount = variants.filter((item) => !item?.name);
    if (emptyNameCount.length) {
      message.error("Variants name must not be empty!");
    } else {
      if (checkDuplicateVariants(variants)) {
        message.error("Duplicate variants detected!");
      } else {
        setOpenCreateModal(false);
      }
    }
  };
  return (
    <Modal
      title="Create Option"
      centered
      open={openCreateModal}
      okText="Create"
      onOk={() => handleCreateVariants()}
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
