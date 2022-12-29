import { Dropdown, Input, Menu, Tag } from "antd";
import React, { useEffect, useState } from "react";
import OrderStatusModal from "../../../../../component/OrderStatusModal/OrderStatusModal";
import { apicall } from "../../../../../utils/apicall/apicall";
import styles from "./RightContain.module.css";

function RightContain({ orderDetail, statusModalOpen, setStatusModalOpen }) {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const result = await apicall({
      url: "statuses",
    });
    setStatus(result.data.statuses);
  };

  const menu = (filterStatus, objId) => (
    <Menu
      items={status
        .filter((datt, ii) => filterStatus != datt?.description)
        .map((dat, i) => ({
          key: i,
          label: (
            <div
              onClick={() => {
                setStatusModalOpen({
                  open: true,
                  data: dat,
                  orderId: objId,
                });
              }}
              target="_blank"
              style={{ color: dat?.params?.color }}
            >
              {dat.description}
            </div>
          ),
        }))}
    />
  );

  const getStatusTag = (data, obj) => {
    const [statusOfRow] = status.filter((dat) => dat.status === data);

    return (
      <Dropdown overlay={menu(statusOfRow?.description, obj)}>
        <Tag className={styles.dpContainer} color={statusOfRow?.params?.color}>
          {statusOfRow?.description}
        </Tag>
      </Dropdown>
    );
  };

  return (
    <div className={styles.container}>
      <div>
        {" "}
        <lable className={styles.label}>Status</lable>{" "}
        {getStatusTag(orderDetail.status, orderDetail.order_id)}
      </div>
      <div>
        {" "}
        {/* <lable className={styles.label}>Settlements</lable> Unsettled */}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Payment information</lable>
      </div>
      <div>
        {" "}
        Method {orderDetail?.payment_method?.payment}{" "}
        {orderDetail?.payment_method?.description}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Manager</lable> <br />
        <Input />
      </div>
      <div>
        {orderDetail?.issuer_data?.firstname}{" "}
        {orderDetail?.issuer_data?.lastname}{" "}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Shipping information</lable>
      </div>
      {orderDetail?.shipping?.map((dat, i) => (
        <>
          <div>{dat?.group_name}</div>
          <div>Method : {dat?.shipping}</div>
        </>
      ))}
      <OrderStatusModal
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
      />
    </div>
  );
}

export default RightContain;
