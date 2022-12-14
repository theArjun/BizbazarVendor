import React, { useEffect, useState, forwardRef } from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button, Radio, DatePicker } from "antd";
import { Dropdown, Space } from "antd";
import { BsChevronDown } from "react-icons/bs";

import "./index.css";

const Search = ({ setSearchValue }) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const items = [
    {
      key: "1",
      label: (
        <a
        // target="_blank"
        // rel="noopener noreferrer"
        // href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
        // target="_blank"
        // rel="noopener noreferrer"
        // href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <div className={styles.container} id="changeHere">
      <Card>
        <div className={styles.formcolumn}>
          <label>
            Order No.
            <Input type="text" />
          </label>
          <label>
            Customer
            <Input type="text" />
          </label>
          <label>
            Customer phone
            <Input type="text" />
          </label>
          {/* <label>
            Order status
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Button className={styles.dropdownbutton}>
                bottom <BsChevronDown className={styles.icon} />{" "}
              </Button>
            </Dropdown>
          </label> */}
          <label>
            Payment method
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Button className={styles.dropdownbutton}>
                bottom <BsChevronDown className={styles.icon} />
              </Button>
            </Dropdown>
          </label>
          <label>
            <div>Account Status</div>

            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Button className={styles.dropdownbutton}>
                bottom <BsChevronDown className={styles.icon} />
              </Button>
            </Dropdown>
          </label>
          {/* <label>
            <div style={{ marginBottom: "3px" }}>Account Status</div>
            <div>
              <Radio>Order Created Date</Radio>
              <Radio>Settlement Date</Radio>
            </div>
          </label> */}
          <label>
            RangePicker
            <RangePicker />
          </label>
        </div>
      </Card>
    </div>
  );
};

export default Search;
