import React from "react";
import styles from "./Search.module.css";
import { Card, Form, Input, Button,Select} from "antd";
import { AiFillStar } from "react-icons/ai";
import "./index.css";
const Search = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
      // console.log(getAllOrders())
    };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
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
              id="advantages"
              label="Advantages"
              name="advantages"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              id="disadvantages"
              label="Disadvantages"
              name="disadvantages"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              id="comment"
              label="Comment"
              name="comment"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              id="rating"
              label="Rating"
              name="rating"
            >
            <Select
            showSearch
            placeholder="Select Rating"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: '5',
                label: (
                  <span>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  </span>
                ),
              },
              {
                value: '4',
                label: (
                  <span>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  </span>
                ),
              },
              {
                value: '3',
                label: (
                  <span>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  </span>
                ),
              },
              {
                value:'2',
                label: (
                  <span>
                  <AiFillStar/>
                  <AiFillStar/>
                  </span>
                ),
              },
              {
                value:'1',
                label: (
                  <span>
                  <AiFillStar/>
                  </span>
                ),
              }
            ]}
          />
          </Form.Item>
            <div>
              <label>Helpfulness</label>
              <div className={styles.price_container}>
                <Form.Item
                  id="help_from"
                  name="help_from"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>{" "}

               <Form.Item>-</Form.Item>
                <Form.Item
                  id="help_to"
                  name="help_to"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              id="photo"
              label="With photo"
              name="photo"
            >
            <Select
            showSearch
            placeholder="With photo"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 'with_photo',
                label: 'With photo',
              },
              {
                value: 'without_photo',
                label: 'Without photo',
              },
            ]}
          />
          </Form.Item>
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
