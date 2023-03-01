import React from "react";

import styles from "./ViewRateAreas.module.css";
import cx from "classnames";
import { Table } from "antd";
import GeneralRateAreas from "../../../../pagecomponents/Setting/ShippingMethod/RateAreas/Components/General";

const tabs = ["General", "Pickup"];

function ViewRateAreas() {
  const [active, setActive] = React.useState("General");

  const getContainerFromTab = () => {
    switch (active) {
      case "Pickup":
        return <Pickup />;

      default:
        return <GeneralRateAreas />;
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

export default ViewRateAreas;

const Pickup = () => {
  const dataSource = [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
    </>
  );
};
