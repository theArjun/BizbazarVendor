import React, { useEffect, useMemo } from "react";
import { Empty } from "antd";
import styles from "./Table.module.css";
import { Progress } from "antd";
import Spinner from "../../Spinner/Spinner";
const Table = React.memo(({ table_data, handleScroll, loading }) => {
  let temp = Object.values(table_data?.table?.elements);
  const getTableData = useMemo(() => {
    let finalData = temp?.map((el) => ({
      label: el?.full_description,
      value: table_data?.table?.values[el?.element_hash][1],
    }));
    return finalData || [];
  });
  useEffect(() => {
    document
      .querySelector("#progress")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#progress")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  // Getting percentage  for each order status
  const getPercentage = (value = 0) => {
    let values = getTableData.reduce((accumulator, currentValue) => {
      accumulator.push(parseInt(currentValue.value));
      return accumulator;
    }, []);
    return ((value / Math.max(...values)) * 100).toFixed(2);
  };
  // Getting total
  const getTotalValue = () => {
    let total = getTableData.reduce((accumulator, currentValue) => {
      accumulator = accumulator + parseFloat(currentValue.value);
      return accumulator;
    }, 0);
    return total;
  };
  if (!temp.length) {
    return <Empty className={styles.empty} />;
  }
  return (
    <div className={styles.top_fifty_customers_container}>
      <div className={styles.top_fifty_customers_header}>
        <div>{table_data?.table?.parameter}</div>
        <div>Total</div>
      </div>
      {loading && <Spinner />}
      <div className={styles.data_container} id="progress">
        {getTableData.map((item, i) => {
          return (
            <div className={styles.single_top_fifty_customers} key={i}>
              <div>
                <div> {item.label}</div>
                <div className={styles.progressContainer}>
                  <Progress
                    percent={getPercentage(item.value)}
                    showInfo={false}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>
              <div className={styles.progress_value}> {item.value}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.total_value}> Total: {getTotalValue()}</div>
    </div>
  );
});

export default Table;
