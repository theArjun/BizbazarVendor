import React from "react";
import styles from "./logList.module.css";
import { Avatar, List, Space } from "antd";
import { useEffect } from "react";
const LogList = ({ logs, loading, handleScroll }) => {
  useEffect(() => {
    document
      .querySelector("#log_list > div >div > ul.ant-list-items")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#log_list > div >div >ul.ant-list-items")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // getting time and date
  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp * 1000));
    const monthyear = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
    });
    return monthyear + ", " + time;
  };
  return (
    <React.Fragment>
      <div className={styles.log_container}>
        <List
          id="log_list"
          loading={loading}
          className={styles.log_list}
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={logs}
          renderItem={(item, i) => (
            <List.Item key={item.log_id}>
              <div className={styles.list_item_container}>
                <h3>{`${item?.type}(${item.action})`}</h3>
                <div className={styles.item_body}>
                  {Object.keys(item?.content)?.map((el, i) => (
                    <div key={i} className={styles.item_body_container}>
                      <div className={styles.body_container}>
                        <div>{el}:</div> <span>{item?.content[el]}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <br />
                <div className={styles.list_footer}>
                  <div>
                    User: <span>{`${item?.firstname} ${item?.lastname}`}</span>
                  </div>{" "}
                  <div>
                    IP: <span>{`${item?.content?.ip_address || ""}`}</span>
                  </div>{" "}
                  <div>
                    Time: <span>{getTimeAndDate(item?.timestamp)}</span>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </React.Fragment>
  );
};

export default LogList;
