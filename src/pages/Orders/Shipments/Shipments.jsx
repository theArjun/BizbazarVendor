import React, { useState } from "react";
import styles from "./Shipments.module.css";
import { SearchForShipment, TableForShipment } from "../..";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const INITIAL_PARAMS = {
  cname: "",
  email: "",
  phone: "",
  order_id: "",
  total_from: "",
  total_to: "",
  sort_order: "",
  sort_by: "",
};
const Shipments = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  return (
    <div className={styles.shipment}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Shipments</Breadcrumb.Item>
      </Breadcrumb>
      <SearchForShipment params={params} setParams={setParams} />
      <TableForShipment loading={false} />
    </div>
  );
};

export default Shipments;
