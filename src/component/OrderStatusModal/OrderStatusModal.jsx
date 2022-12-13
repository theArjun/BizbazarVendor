import React, { useState } from "react";

import { Button, Modal } from "antd";
import { Input } from "antd";
import { Checkbox, notification } from "antd";
import { apicall } from "../../utils/apicall/apicall";

function OrderStatusModal({ statusModalOpen, setStatusModalOpen }) {
  const { TextArea } = Input;
  const handleCancel = () => {
    setStatusModalOpen({
      open: false,
      data: {},
      orderId: null,
    });
  };

  const [api] = notification.useNotification();

  const [notifyUser, setNotifyUser] = useState(true);
  const [notifyDepartment, setNotifyDepartment] = useState(true);
  const [notifyVendor, setNotifyVendor] = useState(true);

  const openNotification = (placement, message) => {
    notification.open({
      message: `Order update ${message}`,

      placement,
    });
  };

  const handleConfirm = async () => {
    const result = await apicall({
      method: "put",
      url: "vendors/62/orders/" + statusModalOpen.orderId,
      data: {
        status: statusModalOpen?.data?.status,
        notify_user: notifyUser ? "1" : "0",
        notify_department: notifyDepartment ? "1" : "0",
        notify_vendor: notifyVendor ? "1" : "0",
      },
    });
    if (result.status === 200) {
      openNotification("bottomRight", "SucessFull");

      handleCancel();
      return;
    }
    if (result.status != 200) {
      openNotification("bottomRight", "Failed");

      handleCancel();
      return;
    }
  };

  return (
    <Modal
      className="statusModal"
      open={statusModalOpen.open}
      onCancel={handleCancel}
      title={""}
      footer={[
        <Button key="submit" type="primary" onClick={handleConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <text style={{ color: statusModalOpen?.data?.params?.color }}>
        Status is going to be {statusModalOpen?.data?.description}
      </text>
      <h3>Reason *</h3>
      <TextArea rows={4} />
      <div style={{ marginTop: "10px" }} />
      <Checkbox
        checked={notifyUser}
        onChange={() => setNotifyUser((dat) => !dat)}
      >
        Notify user
      </Checkbox>
      <Checkbox
        checked={notifyDepartment}
        onChange={() => setNotifyDepartment((dat) => !dat)}
      >
        Notify department
      </Checkbox>
      <Checkbox
        checked={notifyVendor}
        onChange={() => setNotifyVendor((dat) => !dat)}
      >
        Notify vendor
      </Checkbox>
    </Modal>
  );
}

export default OrderStatusModal;
