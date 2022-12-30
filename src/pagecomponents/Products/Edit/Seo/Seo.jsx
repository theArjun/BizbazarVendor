import React from "react";
import styles from "./Seo.module.css";
import { Form, Button, Input, Card, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { apicall } from "../../../../utils/apicall/apicall";
const {Text}=Typography;
const Seo = ({ data }) => {
  const value = "https://";
  const onFinish = (values) => {
    updateSEO(data?.product_id, values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onValueChange = (a, b) => {};
  const updateSEO = async (id, values) => {
   const result= await apicall({
      url: `products/${id}`,
      data: values,
      method: "put",
    });
    if(result.data){
      window.location.reload();
    }
  };
  return (
    <div className={styles.seo}>
      <Form
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
        onValuesChange={onValueChange}
      >
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
        <br />
        <br />
        <Card>
          <div className={styles.seo_card}>
            <div className={styles.seo_card_left}>
              <h3>SEO</h3>
              <Form.Item name="seo_name" label="SEO name">
                <Input addonBefore={value} />
              </Form.Item>
              <h3>Meta data </h3>
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
            <div className={styles.seo_card_right}>
              <h3>Google rich snippets preview</h3>
              <div className={styles.google_preview}>
                <h4 style={{color:'#1677ff'}}>
                  {data?.page_title?data.page_title:data.product}
                </h4>
                <Text type="success" >https://dev.bizbazar.com.np/acme/</Text>
                <div>
                <Text >{'रु'+Number.parseFloat(data?.price).toFixed(2)}</Text>-
                <Text>{data?.amount<=0?<span style={{color:'red'}}>Out of stock</span>:<span style={{color:'green'}}>In stock</span>}</Text>
                </div>
                <Text type="secondary">{data?.meta_description?data.meta_description:data.full_description.replace(/<[^>]*>?/gm, '').substring(0,150)+'...'}</Text>
              </div>
            </div>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default Seo;
