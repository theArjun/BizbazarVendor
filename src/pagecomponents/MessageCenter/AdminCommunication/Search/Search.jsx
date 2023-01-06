import React from 'react'
import styles from './Search.module.css'
import { Card, Select, Input,Form, DatePicker } from 'antd'
const {RangePicker}=DatePicker
const AdminCommunicationSearch = () => {


    const onValueChange = (a, values) => {
        if(values.dates){
          let startDate = new Date(values?.dates[0]?.$y,values?.dates[0]?.$M, values?.dates[0]?.$D).getTime()/1000;
          let endDate = new Date(values?.dates[1]?.$y,values?.dates[1]?.$M, values?.dates[1]?.$D).getTime()/1000;
          let data={...values, start_date:startDate, end_date:endDate}
          
        }else{
          
        }
      };
  return (
    <div className={styles.container}>
    <Card >
      <Form
        layout="vertical"
        className={styles.form}
        name="basic"
        wrapperCol={{}}
        autoComplete="off"
        onValuesChange={onValueChange}
        initialValues={
         ''
        }
      >
        <div className={styles.search_inputs}>
          <Form.Item 
          label="Customer name" 
          name="customer_name"
        >
            <Input
            />
          </Form.Item> 
          <Form.Item id="date" 
          label="Select Dates" 
          name="dates">
          <RangePicker/>
          </Form.Item>
         
        </div>
      </Form>
    </Card>
  </div>
  )
}

export default AdminCommunicationSearch