import React, { useEffect, useState } from "react";
import styles from "./CreateModal.module.css";
import { Modal, message } from "antd";
import cx from "classnames";
import General from "./components/General/General";
import Variants from "./components/Variants/Variants";
function CreateModal({
  openCreateModal,
  setOpenCreateModal,
  optionData,
  setOptionData,
  mode,
  variants,
  setVariants,
}) {
  const [activeTab, setActiveTab] = useState("General");
  const { id } = JSON.parse(sessionStorage.getItem("userinfo"));
  // Checking whether  vendor option data or not
  const isMyOption = () => {
    if (String(id) !== optionData?.company_id && optionData?.company_id) {
      return false;
    }
    return true;
  };
  const getDivision = () => {
    switch (activeTab) {
      case "Variants":
        return (
          <Variants
            variants={variants}
            isMyOption={isMyOption()}
            setVariants={setVariants}
          />
        );
      default:
        return (
          <General
            general={optionData}
            setGeneral={setOptionData}
            isMyOption={isMyOption()}
          />
        );
    }
  };
  // Checking duplicate array of objects
  const checkDuplicateVariants = (array = []) => {
    // Using Array.prototype.some()
    const hasDuplicate = array.some((obj, index) => {
      return array.some((innerObj, innerIndex) => {
        return (
          innerIndex !== index &&
          innerObj.variant_name.trim() === obj.variant_name.trim()
        );
      });
    });
    return hasDuplicate;
  };
  //  handle create variants
  const handleCreateVariants = () => {
    if (!optionData?.option_name) {
      message.error("Option name is required");
    } else {
      let emptyNameCount = variants.filter((item) => !item?.variant_name);
      if (emptyNameCount.length) {
        message.error("Variants name must not be empty!");
      } else {
        if (checkDuplicateVariants(variants)) {
          message.error("Duplicate variants detected!");
        } else {
          setOpenCreateModal(false);
        }
      }
    }
  };
  return (
    <Modal
      title={mode ? "" + optionData?.option_name : "Create option"}
      centered
      open={openCreateModal}
      okText="Create"
      okButtonProps={{
        style: {
          display: isMyOption() ? "inline" : "none",
        },
      }}
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
