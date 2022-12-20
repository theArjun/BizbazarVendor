import React,{useState} from "react";
import styles from "./Shipping.module.css";
import './index.css'
import { Form, Input, Checkbox, Button, Card } from "antd";
const Shipping = () => {
  const [itemsInBox, setItemsInBox]=useState(false)
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onValueChange=(a,b)=>{
      console.log(b);
  }
  const onItemChange=(e)=>{
        const value= e?.target.value;
        if(value=='' || value==0){
          setItemsInBox(false)
        }
        else{
          setItemsInBox(true)
        }
  }
  return (
    <div className={styles.shipping}>
      <Form
        name="basic"
        initialValues={{
          weight: "0.000",
          freight: "0.00",
          min_items:'0',
          max_items:'0',
          box_width:'0',
          box_length:'0',
          box_height:'0'
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
          <Form.Item
            label="Weight (Kg)"
            name="weight"
            extra="Non-downloadable products with zero weight are handled as having minimal possible non-zero weight."
          >
            <Input className={styles.short_form} />
          </Form.Item>

          <Form.Item
            label="Free shipping"
            name="free_ship"
            extra="Products with the Free shipping option enabled will be excluded from shipping calculation if shipping method has the Use for free shipping option enabled."
          >
            <Checkbox />
          </Form.Item>

          <Form.Item label="Shipping freight(रु)" name="freight">
            <Input />
          </Form.Item>

          <Form.Item
            label="Items in a box"
            name="items_in_box"
            extra="Use this field to define the minimum and maximum number of product items to be shipped in a separate box. Enter a non-zero value and specify the box dimensions below."
          >
           
            <div  className={styles.items_in_box}>
              <Form.Item name="min_items" style={{width:'50px'}} >
                <Input  onChange={(e)=>onItemChange(e)}/>
              </Form.Item>
              <Form.Item>
            -
              
              </Form.Item>
              <Form.Item name="max_items" style={{width:'50px'}}>
                <Input onChange={(e)=>onItemChange(e)} />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label="Box length"
            name="box_length"
            className={itemsInBox?styles.short_form:styles.disable_form}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            label="Box width"
            name="box_width"
            className={itemsInBox?styles.short_form:styles.disable_form}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            label="Box height"
            name="box_height"
            className={itemsInBox?styles.short_form:styles.disable_form}
          >
            <Input  />
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default Shipping;
