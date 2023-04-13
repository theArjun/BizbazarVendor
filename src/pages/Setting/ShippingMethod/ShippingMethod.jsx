import React, { useState } from "react";
import styles from "./ShippingMethod.module.css";
import cx from "classnames";
import RateAreas from "./../../../pagecomponents/Setting/ShippingMethod/RateAreas/RateAreas";
import ShippingMethod from "./../../../pagecomponents/Setting/ShippingMethod/ShippingMethod/ShippingMethod";
import StoresAndPickup from "./../../../pagecomponents/Setting/ShippingMethod/StoresAndPickup/StoresAndPickup";
import { useGetShippingMethods } from "../../../apis/ShippingMethodApi";
import { useEffect } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const tabs = ["Shipping Method", "Rate Areas", "Stores And pickup Points"];

function ShippingMethodPage() {
  const [active, setActive] = useState("Shipping Method");
  const [open, setOpen] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [update, setUpdate] = useState(false);
  const [shipings, setShippings] = React.useState([]);
  const navigate = useNavigate();
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
  if (isError) {
    return (
      <Result
        status={error?.response?.status}
        title={error?.response?.status}
        subTitle={error?.message}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }
  const getContainerFromTab = () => {
    switch (active) {
      case "Shipping Method":
        return (
          <ShippingMethod
            loading={shippingLoading || isFetching}
            setOpen={setOpen}
            open={open}
            setUpdate={setUpdate}
            shipings={shipings}
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
    <div>
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
