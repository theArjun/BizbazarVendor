import React, { useState } from "react";
import { AccountingSearch, AccountingTable } from "..";
import styles from "./Accounting.module.css";
import { Breadcrumb } from "antd";
import cx from "classnames";
const Accounting = () => {
  const tabs = ["Transactions", "Balance withdrawals"];
  const [active, setActive] = useState("Transactions");
  const getContainerFromTab = () => {
    switch (active) {
      case "Balance withdrawals":
        return <div>Balance withdrawals</div>;

      default:
        return (
          <div>
            <AccountingSearch />
            <AccountingTable />
          </div>
        );
    }
  };
  return (
    <div className={styles.container}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Accounting</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.tabContainer}>
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
        {getContainerFromTab()}
      </div>
    </div>
  );
};

export default Accounting;
