import React, { useEffect, useState } from "react";
import styles from "./ViewShipment.module.css";
import { Link, useParams } from "react-router-dom";
import { useGetSingleShipment } from "../../../../apis/ShipmentApi";
import Spinner from "../../../../component/Spinner/Spinner";
import { Breadcrumb, Button, Dropdown } from "antd";
const ViewShipment = () => {
  const { id } = useParams();
  const [shipment, setShipment] = useState({});
  const { data, loading } = useGetSingleShipment(id);
  useEffect(() => {
    let abortController = new AbortController();
    /* In the above code, I’ve used AbortController to unsubscribe the effect. When the async action is completed, then I abort the controller and unsubscribe the effect. */

    // Action is here
    setShipment(data?.data || {});
    return () => {
      abortController.abort();
    };
  }, [data]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.view_shipment}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="">Orders</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shipments</Breadcrumb.Item>
          <Breadcrumb.Item>{id}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.action_buttons}>
          <Button type="primary">Save changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ViewShipment;
