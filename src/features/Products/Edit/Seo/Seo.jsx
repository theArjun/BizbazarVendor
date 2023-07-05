import React from "react";
import styles from "./Seo.module.css";
import { Form, Button, Input, Card, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUpdateSeoPath } from "../../../../apis/ProductApi";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../../component/Spinner/Spinner";
const { Text } = Typography;
const Seo = ({ data, seoPath }) => {
  const { isLoading, mutate } = useUpdateSeoPath();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    updateSEO(data?.product_id, values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const updateSEO = async (id, values) => {
    // mutate update function
    mutate(
      { data: values, id: id },
      {
        onSuccess: (res) =>
          queryClient.invalidateQueries([
            "single_product",
            String(data?.product_id),
          ]),
      }
    );
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.seo} key={data?.product_id}>
      <Form
        form={form}
        name="basic"
        initialValues={{
          seo_name: data?.seo_name,
          page_title: data?.page_title,
          meta_description: data?.meta_description,
          meta_keywords: data?.meta_keywords,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item className={styles.save_btn}>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
        <div className={styles.seo_card}>
          <div className={styles.seo_card_left}>
            <h3>Seo</h3>
            <div className={styles.input_items}>
              <Form.Item name="seo_name" label="SEO name">
                <Input addonBefore={seoPath} />
              </Form.Item>
            </div>
            <h3>Meta data </h3>
            <div className={styles.input_items}>
              <Form.Item name="page_title" label="Page title">
                <Input />
              </Form.Item>
              <Form.Item name="meta_description" label="Meta Description">
                <TextArea />
              </Form.Item>
              <Form.Item name="meta_keywords" label="Meta keywords">
                <TextArea />
              </Form.Item>
            </div>
          </div>
          <div className={styles.seo_card_right}>
            <h3>Google rich snippets preview</h3>
            <div className={styles.google_preview}>
              <h4 style={{ color: "#1677ff" }}>
                {data?.page_title ? data.page_title : data.product}
              </h4>
              <Text type="success">https://dev.bizbazar.com.np/acme/</Text>
              <div>
                <Text>{"रु" + Number.parseFloat(data?.price).toFixed(2)}</Text>-
                <Text>
                  {data?.amount <= 0 ? (
                    <span style={{ color: "red" }}>Out of stock</span>
                  ) : (
                    <span style={{ color: "green" }}>In stock</span>
                  )}
                </Text>
              </div>
              <Text type="secondary">
                {data?.meta_description
                  ? data?.meta_description
                  : data?.full_description
                      .replace(/<[^>]*>?/gm, "")
                      .substring(0, 150) + "..."}
              </Text>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Seo;
