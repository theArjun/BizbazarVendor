import React from "react";
import styles from "./CategoryData.module.css";
import { Collapse } from "antd";
import NestedObjectData from "./components/NestedObjectData";
const { Panel } = Collapse;
const CategoryData = () => {
  let data = {
    13: {
      name: "Bikes",
      products: 4,
      status: "Active",
      pos: 0,
      id: 13,
      14: {
        name: "Racing",
        products: 4,
        status: "Active",
        pos: 0,
        id: 14,
        data: [
          { name: "Hero Honda", id: 1, products: 4, status: "Active", pos: 0 },
          { name: "Pulsar", id: 2, products: 4, status: "Active", pos: 0 },
          { name: "Duke", id: 3, products: 4, status: "Active", pos: 0 },
          { name: "TVS", id: 4, products: 4, status: "Active", pos: 0 },
        ],
      },
    },
    30: {
      name: "Fruits",
      products: 4,
      status: "Active",
      pos: 0,
      id: 30,
      31: {
        name: "Seasonal",
        products: 4,
        status: "Active",
        pos: 0,
        id: 31,
        data: [
          { name: "Mango", id: 1, products: 4, status: "Active", pos: 0 },
          { name: "Apple", id: 2, products: 4, status: "Active", pos: 0 },
          { name: "Grapes", id: 3, products: 4, status: "Active", pos: 0 },
          { name: "Orange", id: 4, products: 4, status: "Active", pos: 0 },
        ],
      },
    },
  };
  const testData = {
    key1: "Value 1",
    key2: {
      nestedKey1: "Nested Value 1",
      nestedKey2: {
        deeplyNestedKey1: "Deeply Nested Value 1",
        deeplyNestedKey2: "Deeply Nested Value 2",
      },
    },
  };
  return (
    <div className={styles.category_data}>
      <div className={styles.category_list_holder}>
        <div
          className={`${styles.category_list_design} ${styles.category_list_heading}`}
        >
          <h4>Position</h4>
          <h4>Name</h4>
          <h4>Products</h4>
          <h4>Status</h4>
        </div>
        {<NestedObjectData data={testData} />}
      </div>
    </div>
  );
};

export default CategoryData;
