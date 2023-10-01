import React from "react";
import styles from "./Options.module.css";
import { Form, Input,Button, Card, } from "antd";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";
const Options = () => {
  const [inputVariant, setInputVariant] = useState("");
  const [variants, setVariants] = useState([]);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onValueChange = (a, b) => {};
  // Lets check the variant name and push into the array
  const checkVariant = () => {
    const temp = variants.filter((item) => {
      return item.name == inputVariant;
    });
    if (temp.length === 0 && inputVariant) {
      setVariants([...variants, { name: inputVariant }]);
    } else {
      setError({visible:true,message:'Please try new variant'})
    }
  };
  return (
    <div className={styles.options}>
      <Form
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={onValueChange}
      >
        <div className={styles.create_section}></div>
        <Card title="New option">
          <Form.Item
            name="option_name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Option name is required!",
              },
            ]}
          >
            <Input className={styles.short_form} placeholder='eg: Color' />
          </Form.Item>
          <div className={styles.variant_container}>
            <Form.Item
              name="variant"
              label="Variant"
              style={{
                width: "100%",
                marginRight: "10px",
              }}
              extra="To add multiple product variant enter variant name and click on plus button."
            >
              <Input
                onChange={(e) => setInputVariant(e.target.value)}
                value={inputVariant}
                placeholder='eg: Blue'
              />
            </Form.Item>
            <Form.Item>
              <div
                className={styles.new_add_btn}
                onClick={() => checkVariant()}
              >
                {" "}
                <HiPlus size={20} />
              </div>
            </Form.Item>
          </div>
          <div className={styles.variant_list}>
            {variants.length
              ? variants.map((item, index) => {
                  return (
                    <div key={index} className={styles.variant_list_item}>
                      {item.name}
                    </div>
                  );
                })
              : ""}
          </div>
          <Form.Item style={{ float: "right" }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default Options;
