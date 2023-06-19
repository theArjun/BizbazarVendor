import { Checkbox, List, Modal } from "antd";
import React, { useState } from "react";
import styles from "./AddMoreModal.module.css";
import { useEffect } from "react";
import Spinner from "../../../../../../component/Spinner/Spinner";
function AddMoreModal({
  openCreateModal,
  setOpenCreateModal,
  options = [],
  loading,
  handleScroll,
  option_keys,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [valueChanged, setValueChanged] = useState(false);
  useEffect(() => {
    document
      .querySelector("#modal_body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#modal_body")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  //listening on change
  const onChange = (values) => {
    setValueChanged(true);
    setSelectedOptions(values);
  };
  return (
    <Modal
      title="More options"
      centered
      open={openCreateModal}
      okText="Save options"
      onOk={() => setOpenCreateModal(false)}
      onCancel={() => setOpenCreateModal(false)}
      okButtonProps={{
        disabled: !valueChanged,
      }}
      width={1000}
    >
      <div className={styles.modal_body} id="modal_body">
        {loading && <Spinner />}
        <Checkbox.Group
          defaultValue={option_keys}
          options={options.map((item) => ({
            label: item?.option_name,
            value: item?.option_id,
          }))}
          onChange={onChange}
        />
      </div>
    </Modal>
  );
}

export default AddMoreModal;
