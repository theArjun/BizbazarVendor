import React, { useState } from "react";
import styles from "./ShippingMethod.module.css";
import cx from "classnames";
import RateAreas from "./../../../pagecomponents/Setting/ShippingMethod/RateAreas/RateAreas";
import ShippingMethod from "./../../../pagecomponents/Setting/ShippingMethod/ShippingMethod/ShippingMethod";
import StoresAndPickup from "./../../../pagecomponents/Setting/ShippingMethod/StoresAndPickup/StoresAndPickup";
import { apicall } from "../../../utils/apicall/apicall";

const tabs = ["Shipping Method", "Rate Areas", "Stores And pickup Points"];

function ShippingMethodPage() {
  const [active, setActive] = useState("Shipping Method");
  const [bottom, setBottom] = useState(false);
  const [update,setUpdate]=useState(false)
  const [shipings, setShippings] = React.useState([]);

  const page = React.useRef(1);

  React.useEffect(() => {
    getShiippingMethod();
  }, [update]);

  const getShiippingMethod = async () => {
    
    const result = await apicall({
      url: "/ShippingMethod?" + `page=${page.current}&items_per_page=${50}`,
    });

    setShippings(result.data.shippings);
  };

  React.useEffect(() => {
    if (shipings.length < 50) {
      return;
    }
    if (!bottom) {
      return;
    }
    page.current = page.current + 1;
    getMoreShiippingMethod();
  }, [bottom]);

  const getMoreShiippingMethod = async () => {
    const result = await apicall({
      url: "shippings?" + `&page=${page.current}&items_per_page=${50}`,
    });

    setShippings((dat) => [...dat, ...result.data.shippings]);
  };

  const getContainerFromTab = () => {
    switch (active) {
      case "Shipping Method":
        return <ShippingMethod  setUpdate={setUpdate} shipings={shipings} setBottom={setBottom} />;
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
