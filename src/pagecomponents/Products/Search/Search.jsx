import React, { useState } from "react";
import styles from "./Search.module.css";
import { apicall } from "../../../utils/apicall/apicall";
import { Card, Form, Input, Button, Select } from "antd";
import "./index.css";
import AdvanceSearch from "./AdvanceSearch/AdvanceSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAdvanceSearchModal,
  loadTableData,
  setLoading,
} from "../../../redux/features/products/productSlice";
import { useEffect } from "react";
const Search = ({ setSearchValue }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const onValueChange = (a,value) => {
    const sData = { ...value };
    categories.map((item, index) => {
      if (value.category == item.label) {
        sData.cid = item.id;
      }
    });
    setSearchValue(sData);
  };
  const retrieveCategories = async () => {
    const category = [];
    // perform api call to retrieve data
    const result = await apicall({
      url: `vendors/62/categories`,
    });
    await result.data.categories.map((item, index) => {
      category.push({
        value: item.category,
        label: item.category,
        id: item.category_id,
      });
    });
    setCategories(category);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div className={styles.container}>
      <Card bordered={true}>
        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          wrapperCol={{}}
          autoComplete="off"
          onValuesChange={onValueChange}
        >
          <div className={styles.search_inputs}>
            <Form.Item id="req" label="Product name" name="name">
              <Input type="text" />
            </Form.Item>
            <div>
              <label>Price (रु)</label>
              <div className={styles.price_container}>
                <Form.Item
                  id="min-price"
                  name="min_price"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>{" "}
                <Form.Item>-</Form.Item>
                <Form.Item
                  id="max-price"
                  name="max_price"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>
              </div>
            </div>
            <Form.Item id="req" label="Search in categories" name="category">
              <Select
                onClick={() => retrieveCategories()}
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={categories}
              />
            </Form.Item>
            <div
              style={{ float: "right", cursor: "pointer", color: "#7367f0" }}
              onClick={() => dispatch(handleAdvanceSearchModal("open"))}
            >
              {" "}
              Advanced search
            </div>
            <AdvanceSearch />
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
