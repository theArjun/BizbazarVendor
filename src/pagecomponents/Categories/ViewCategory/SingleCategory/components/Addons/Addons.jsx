import React from "react";
import styles from "./Addons.module.css";
import { Checkbox } from "antd";
const Addons = ({ data }) => {
  return (
    <div className={styles.addons}>
      <div className={styles.addons_content}>
        <h4>SEO</h4>
        <div className={styles.addons_content_body}>
          <div>SEO name:</div>
          <div> {`/${data?.seo_name || ""}`}</div>
        </div>
        <h4>Age verification</h4>
        <div className={styles.addons_content_body}>
          <div>Age verification:</div>
          <div>
            <Checkbox
              checked={data?.age_verification === "Y" ? true : false}
              disabled={data?.age_verification === "N" ? true : false}
            />
          </div>
        </div>
        <div className={styles.addons_content_body}>
          <div>Age limit:</div>
          <div>{`${data?.age_limit} years`}</div>
        </div>
        <div className={styles.addons_content_body}>
          <div>Warning message:</div>
          <div>{data?.age_warning_message || ""}</div>
        </div>
        <h4>Comments and reviews </h4>
        <div className={styles.addons_content_body}>
          <div>Reviews:</div>
          <div>{data?.reviews || "Disabled"}</div>
        </div>
      </div>
    </div>
  );
};

export default Addons;
