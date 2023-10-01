import React, { useState } from 'react'
import styles from './Search.module.css'
import useDebounce from '../../../../utils/Hooks/useDebounce'
import { Card, Select, Input,Form, DatePicker } from 'antd'
const {RangePicker}=DatePicker
const CustomerCommunicationSearch = ({setParams, params}) => {
const [name,setName]=useState('');
  useDebounce(
    () => {
      let parameter={...params}
      parameter.customer_name=name
      setParams(parameter)
    },
    500,
    [name]
  );
    const onValueChange = (a, values) => {
      // if(values.customer_name){
      //  setName(values.customer_name)
      // }
      
        if(values.dates){
          let startDate = new Date(values?.dates[0]?.$y,values?.dates[0]?.$M, values?.dates[0]?.$D).getTime()/1000;
          let endDate = new Date(values?.dates[1]?.$y,values?.dates[1]?.$M, values?.dates[1]?.$D).getTime()/1000;
          let parameter={...params}
          parameter.time_from=startDate
          parameter.time_to=endDate
          setParams(parameter)
          
        }else{
          let parameter={...params}
            parameter.time_from=''
            parameter.time_to=''
            setParams(parameter)

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
            onChange={(e)=>setName(e.target.value)}
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

export default CustomerCommunicationSearch