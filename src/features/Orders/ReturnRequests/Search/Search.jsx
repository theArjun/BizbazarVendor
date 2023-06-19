import React from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button} from "antd";
const Search = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    // console.log(getAllOrders())

    
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.container}>
      <Card bordered={true}>

        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          wrapperCol={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.search_inputs}>
            <Form.Item
              id="customer"
              label="Customer"
              name="customer"
            >
              <Input type="text" />
            </Form.Item> 
            <Form.Item
              id="email"
              label="E-mail"
              name="email"
            >
              <Input type="email" />
            </Form.Item>

            <div>
              <label>Quality</label>
              <div className={styles.price_container}>
                <Form.Item
                  id="quality-min"
                  name="quality-min"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>{" "}

               <Form.Item>-</Form.Item>
                <Form.Item
                  id="quality-max"
                  name="quality-max"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>
              </div>
            </div>
            
          <a  href="#" style={{float:'right'}}> Advanced search</a>
          <Form.Item  className={styles.search_btn}
          >
          <Button htmlType="submit">Search</Button>
          </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
