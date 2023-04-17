import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { Checkbox } from "antd";
import "./index.css";
import { useChangeOrderStatus } from "../../apis/OrdersApi";
import { useQueryClient } from "@tanstack/react-query";
function OrderStatusModal({ statusModalOpen, setStatusModalOpen }) {
  const { TextArea } = Input;
  const handleCancel = () => {
    setStatusModalOpen({
      open: false,
      data: {},
      orderId: null,
    });
  };
  const [notifyUser, setNotifyUser] = useState(true);
  const [notifyDepartment, setNotifyDepartment] = useState(true);
  const [notifyVendor, setNotifyVendor] = useState(true);
  const { mutate, isLoading } = useChangeOrderStatus();
  const queryClient = useQueryClient();
  const handleConfirm = async () => {
    let data = {
      order_id: statusModalOpen.orderId,
      status: statusModalOpen?.data?.status,
      notify_user: notifyUser ? "1" : "0",
      notify_department: notifyDepartment ? "1" : "0",
      notify_vendor: notifyVendor ? "1" : "0",
    };
    mutate(data, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["orders"]);
        queryClient.invalidateQueries(["single_order"]);
        handleCancel();
      },
    });
  };

  return (
    <Modal
      className="statusModal"
      open={statusModalOpen.open}
      onCancel={handleCancel}
      title={""}
      footer={[]}
    >
      <>
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
      </>

      <div id="modalButtonFooter">
        {" "}
        <Button
          loading={isLoading}
          key="submit"
          type="primary"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}

export default OrderStatusModal;
