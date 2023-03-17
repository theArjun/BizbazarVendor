import React,{useState, useEffect} from "react";
import styles from "./Search.module.css";
import { Card, Form, Select, DatePicker, Input } from "antd";
import useDebounce from "../../../../utils/Hooks/useDebounce";
const { RangePicker } = DatePicker;
const USER_TYPES = [
  { label: "Administrator", value: "A" },
  { label: "Vendor", value: "V" },
  { label: "Customer", value: "C" },
];
const Search = ({ status, setParams, params, userGroup }) => {
  const [form] = Form.useForm();
  const [orderId,setOrderId]=useState('');
  useDebounce(
    () => {
     let temp_param={...params}
     temp_param.order_id=orderId;
     setParams(temp_param)
    },
    500,
    [orderId]
  );
  const onValueChange = (a, values) => {
    let temp_param={...params}
    temp_param.status_id=values.status?values.status:'';
    temp_param.user_type=values.user_types?values.user_types:'';
    temp_param.usergroup_id=values.user_group?values.user_group:'';
    if(values.dates){
      let startDate = new Date(values?.dates[0]?.$y,values?.dates[0]?.$M, values?.dates[0]?.$D).getTime()/1000;
      let endDate = new Date(values?.dates[1]?.$y,values?.dates[1]?.$M, values?.dates[1]?.$D).getTime()/1000;
    temp_param.time_from=startDate?startDate:'';
    temp_param.time_to=endDate?endDate:''
    }else{
      temp_param.time_from=''
      temp_param.time_to=''
    }
    setParams(temp_param)
  };
  const getStatus = () => {
    return status?.map((el, i) => ({
      label: el?.description,
      value: el?.status_id,
    }));
  };
  return (
    <div className={styles.container} id="search_height">
      <Card>
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
            <Form.Item
              id="status"
              label="Order ID"
              style={{ minWidth: "150px" }}
      
            >
              <Input type="number" onChange={(e)=>setOrderId(e.target.value)} />
            </Form.Item>
            <Form.Item
              id="status"
              label="Order Status"
              name="status"
              style={{ width: "200px" }}
            >
              <Select
              allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={getStatus()}
              />
            </Form.Item>
            <Form.Item
              id="status"
              label="User types"
              name="user_types"
              style={{ width: "200px" }}
            >
              <Select
              allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={USER_TYPES}
              />
            </Form.Item>
            <Form.Item
              id="status"
              label="User group"
              name="user_group"
              style={{ width: "200px" }}
            >
              <Select
              allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userGroup}
              />
            </Form.Item>
            <Form.Item id="date" label="Select Dates" name="dates">
              <RangePicker />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Search;
