import React from "react";

import styles from "./AnalyticsCard.module.css";

function AnalyticsCard(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default AnalyticsCard;
