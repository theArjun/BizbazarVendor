import React, { useEffect } from "react";
import styles from "./Seller.module.css";
import cx from "classnames";
import Spinner from "../../component/Spinner/Spinner";
import { Breadcrumb } from "antd";
import { useState } from "react";
import {
  SellerDescription,
  SellerGeneral,
  SellerLogos,
  SellerPlan,
  SellerTermsAndConditions,
} from "..";
import { useGetSellerInformation } from "../../apis/SellerApis";
const tabs = ["General", "Description", "Logos", "TermsAndConditions", "Plan"];
const Seller = () => {
  const [active, setActive] = useState("General");
  const { data, isLoading } = useGetSellerInformation();
  // get seller data
  const getSeller = () => {
    return data?.data;
  };
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <SellerDescription />;
      case tabs[2]:
        return <SellerLogos />;
      case tabs[3]:
        return <SellerTermsAndConditions />;
      case tabs[4]:
        return <SellerPlan />;
      default:
        return <SellerGeneral vendorData={getSeller()} />;
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb_create_btn}>
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Seller information</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
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
      <div className={styles.tab_body}>
        <div className={styles.tab_body_left}>{getContainerFromTab()}</div>
        <div className={styles.tab_body_right}>
          <div className={styles.vendor_menu}>
            <div className={styles.menu_title}>
              <h4>Menu</h4>
            </div>
            <div className={styles.menu_list}>
              <div>View vendor products</div>
              <div>View vendor admins</div>
              <div>View vendor orders</div>
            </div>
          </div>
          <div className={styles.vendor_statistics}>
            <div className={styles.stat_title}>
              <h4>Vendor's statistics</h4>
            </div>
            <div className={styles.menu_list}>
              <div>View vendor products</div>
              <div>View vendor admins</div>
              <div>View vendor orders</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
