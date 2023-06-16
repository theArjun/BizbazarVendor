import React, { useState } from "react";
import styles from "./ShippingMethod.module.css";
import cx from "classnames";
import RateAreas from "./../../../pagecomponents/Setting/ShippingMethod/RateAreas/RateAreas";
import ShippingMethod from "./../../../pagecomponents/Setting/ShippingMethod/ShippingMethod/ShippingMethod";
import StoresAndPickup from "./../../../pagecomponents/Setting/ShippingMethod/StoresAndPickup/StoresAndPickup";
import { useGetShippingMethods } from "../../../apis/ShippingMethodApi";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const tabs = ["Shipping Method", "Rate Areas", "Stores And pickup Points"];

function ShippingMethodPage() {
  const [active, setActive] = useState("Shipping Method");
  const [open, setOpen] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [update, setUpdate] = useState(false);
  const [shippings, setShippings] = React.useState([]);
  const {
    data: shippingData,
    isLoading: shippingLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useGetShippingMethods();
  useEffect(() => {
    try {
      if (shippingData?.pages) {
        let temp = [];
        shippingData?.pages?.map((group, i) =>
          group?.data?.shippings?.map((el, i) => {
            temp.push(el);
          })
        );
        setShippings(temp);
      }
    } catch (err) {
      console.log("error!", err.message);
    }
  }, [shippingData]);
  React.useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    if (!bottom) {
      return;
    }
    fetchNextPage();
  }, [bottom]);
  const getContainerFromTab = () => {
    switch (active) {
      case "Shipping Method":
        return (
          <ShippingMethod
            loading={shippingLoading || isFetching}
            setOpen={setOpen}
            open={open}
            setUpdate={setUpdate}
            shippings={shippings}
            setBottom={setBottom}
          />
        );
      case "Rate Areas":
        return <RateAreas />;
      default:
        return <StoresAndPickup />;
    }
  };
  return (
    <div className={styles.shipping_method}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Setting</Breadcrumb.Item>
          <Breadcrumb.Item> Shipping Methods</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.left}>
          {tabs.map((dat, i) => (
            <div
              className={cx(
                styles.button,
                active === dat ? styles.bgColor : null
              )}
              key={i}
              onClick={() => setActive(dat)}
            >
              {dat}
            </div>
          ))}
        </div>
      </div>
      {getContainerFromTab()}
    </div>
  );
}

export default ShippingMethodPage;
