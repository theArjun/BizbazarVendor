import React, { useState } from "react";
import LeftContain from "../Components/LeftContain/LeftContain";
import Midcontain from "../Components/Midcontain/Midcontain";
import styles from "./Details.module.css";
import cx from "classnames";
import RightContain from "../Components/RightContain/RightContain";
import { Button } from "antd";

function Deatails({ orderDetail, statusModalOpen, setStatusModalOpen }) {
  const midTab = ["General", "Add On", "Promotion"];

  const [active, setActive] = useState("General");
  const getContainerFromTab = () => {
    switch (active) {
      case "Add On":
        return <>Add on</>;
      case "Promotion":
        return <>Promotion</>;

      default:
        return <Midcontain orderDetail={orderDetail} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContain}>
        <LeftContain orderDetail={orderDetail} />
      </div>
      <div className={styles.midcontain}>
        <div className={styles.tabContainer}>
          {midTab.map((dat, i) => (
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
      <div className={styles.rightContain}>
        <RightContain
          orderDetail={orderDetail}
          statusModalOpen={statusModalOpen}
          setStatusModalOpen={setStatusModalOpen}
        />
      </div>
      <Button className={styles.savebutton}>Save</Button>
    </div>
  );
}

export default Deatails;
