import React, { useState } from "react";
import styles from "./Shipping.module.css";
import "./index.css";
import { Form, Input, Checkbox, Button, Card } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProduct } from "../../../../apis/ProductApi";
import Spinner from "../../../../component/Spinner/Spinner";
const Shipping = ({ data }) => {
  const [itemsInBox, setItemsInBox] = useState(false);
  const [free_ship, setFree_ship] = useState(false);
  const { isLoading, mutate } = useUpdateProduct();
  const queryClient = useQueryClient();
  const onFinish = (values) => {
    const temp = {
      ...values,
      ...{ free_shipping: free_ship ? "Y" : "N" },
      product_id: data?.product_id,
    };
    updateShipping(temp);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onItemChange = (e) => {
    const value = e?.target.value;
    if (value == "" || value == 0) {
      setItemsInBox(false);
    } else {
      setItemsInBox(true);
    }
  };
  // lets call api to update shipping details
  const updateShipping = (values) => {
    mutate(values, {
      onSuccess: (res) => {
        queryClient.invalidateQueries([
          "single_product",
          String(data?.product_id),
        ]);
      },
      onError: (err) => {},
    });
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.shipping}>
      <Form
        name="basic"
        initialValues={{
          weight: data?.weight,
          shipping_freight: data?.shipping_freight,
          min_items_in_box: data?.min_items_in_box,
          max_items_in_box: data.max_items_in_box,
          box_width: data?.box_width,
          box_length: data?.box_length,
          box_height: data?.box_height,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
        <br />
        <br />
        <Card>
          <Form.Item
            label="Weight (Kg)"
            name="weight"
            extra="Non-downloadable products with zero weight are handled as having minimal possible non-zero weight."
          >
            <Input className={styles.short_form} />
          </Form.Item>

          <Form.Item
            label="Free shipping"
            extra="Products with the Free shipping option enabled will be excluded from shipping calculation if shipping method has the Use for free shipping option enabled."
          >
            <Checkbox onChange={() => setFree_ship(!free_ship)} />
          </Form.Item>
          <Form.Item label="Shipping freight(रु)" name="shipping_freight">
            <Input />
          </Form.Item>

          <Form.Item
            label="Items in a box"
            extra="Use this field to define the minimum and maximum number of product items to be shipped in a separate box. Enter a non-zero value and specify the box dimensions below."
          >
            <div className={styles.items_in_box}>
              <Form.Item name="min_items_in_box" style={{ width: "50px" }}>
                <Input onChange={(e) => onItemChange(e)} />
              </Form.Item>
              <Form.Item>-</Form.Item>
              <Form.Item name="max_items_in_box" style={{ width: "50px" }}>
                <Input onChange={(e) => onItemChange(e)} />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label="Box length"
            name="box_length"
            className={itemsInBox ? styles.short_form : styles.disable_form}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Box width"
            name="box_width"
            className={itemsInBox ? styles.short_form : styles.disable_form}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Box height"
            name="box_height"
            className={itemsInBox ? styles.short_form : styles.disable_form}
          >
            <Input />
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};
export default Shipping;
