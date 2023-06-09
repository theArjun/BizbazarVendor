import { Modal } from "antd";
import React, { useState } from "react";
import styles from "./AddMoreModal.module.css";
import cx from "classnames";
function AddMoreModal({ openCreateModal, setOpenCreateModal }) {
  
  return (
    <Modal
      title="More options"
      centered
      open={openCreateModal}
      okText="Add options"
      onOk={() => setOpenCreateModal(false)}
      onCancel={() => setOpenCreateModal(false)}
      width={1000}
    >

      <div className={styles.modal_body}>THisi</div>
    </Modal>
  );
}

export default AddMoreModal;
