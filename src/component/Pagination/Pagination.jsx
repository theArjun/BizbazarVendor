import { Pagination } from "antd";
import React from "react";
import styles from "./styles.module.css";

function CustomPagination({ page, setPage, pageSize = 5, total = 0 }) {
  console.log(total);

  return (
    <div className={styles.container}>
      <Pagination
        defaultCurrent={1}
        current={page}
        total={total}
        onChange={(page) => {
          setPage(page);
        }}
        pageSize={pageSize}
        showSizeChanger={false}
      />
    </div>
  );
}

export default CustomPagination;
