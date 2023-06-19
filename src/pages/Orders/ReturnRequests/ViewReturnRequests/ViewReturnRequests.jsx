import React, { useState } from "react";
import styles from "./ViewReturnRequests.module.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineCar, AiOutlineTags } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import cx from "classnames";
const tabs = [
  "Return products information",
  "Declined products information",
  "Comments",
  "Actions",
  "History",
];
const ViewReturnRequests = () => {
  const [active, setActive] = useState(tabs[0]);
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <div>Declined products information</div>;
      case tabs[2]:
        return <div>Comments</div>;
      case tabs[3]:
        return <div>Actions</div>;
      case tabs[4]:
        return <div>History</div>;
      default:
        return <div>Return products information</div>;
    }
  };
  return (
    <div className={styles.view_return_requests}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Orders/View Orders">Orders</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Return Requests</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.view_return_requests_body}>
        <div className={styles.view_return_requests_left}>
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
        <div className={styles.view_return_requests_right}>
          <div className={styles.request_information}>
            <p>Return #178 by Bishal budhathoki on 09.09.2022, 15:28</p>
          </div>
          <div className={styles.request_information}>
            <h4>Amrit Acharya</h4>
            <div>
              <FiUser />
              <p>IP address: 49.126.172.51</p>
            </div>
          </div>
          <div className={styles.request_information}>
            <h4>Shipping address</h4>
            <div>
              <AiOutlineCar />
              <p>Kathmandu kathmandu, Bagmati 44600 Nepal</p>
            </div>
          </div>
          <div className={styles.request_information}>
            <h4>Billing address</h4>
            <div>
              <AiOutlineTags />
              <p>Kathmandu kathmandu, Bagmati 44600 Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReturnRequests;
