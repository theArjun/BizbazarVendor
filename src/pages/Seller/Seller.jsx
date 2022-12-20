import React from 'react'
import styles from "./Seller.module.css";
import { countries } from "../Profile/countries";
import states from "../Profile/state.json";
import { Form, Breadcrumb, Select, Button, Input, notification, Card, Skeleton,Radio } from "antd";
import { useState, useEffect } from "react";
import { apicall } from "../../utils/apicall/apicall";
const Seller = () => {
    const [pradesh, setPradesh] = useState("");
    const [cities, setCities] = useState([]);
    const [vendorData, setVendorData]=useState('')
    const [loading,setLoading]=useState(false);
    const [location,setLocation]=useState('')
    const [api, contextHolder] = notification.useNotification();
    const provinces = [];
    for (var key in states) {
      provinces.push(key);
    }
  // This is used to alert user for any <information></information>
 const openNotificationWithIcon = (type,message) => {
    api[type]({
      message: message,
      placement:'bottomRight'
    });
  };
    useEffect(()=>{
      getVendorInformation();
    },[])
    const getVendorInformation= async ()=>{
      setLoading(true);
      const result= await apicall({
        url: `vendors/62`
      })
      if(result.data){
          setVendorData(result.data)
      }
     setLoading(false)
    }
    // console.log(states)
    useEffect(() => {
      var demo = [];
      states[pradesh]?.map((item) => {
        item.cities.map((city) => {
          demo.push(city);
        });
      });
      setCities(demo);
    }, [pradesh]);
    const onFinish =async(values) => {
       
        const result= await apicall({
          url: `vendors/62`,
          data:values,
          method:'put'
        })
        if(result.data){
            // Seccess message
            openNotificationWithIcon('success','Your changes saved successfully!');
          }
          else{

              openNotificationWithIcon('error','Failed to save your changes!');
          }
           
    }
    const onSearch = (value) => {
      console.log("search:", value);
    };
    const onSelect = (value) => {
      setPradesh(value);
    };
    if(loading){
      return(
        <Skeleton/>
      )
    }
  return (
    <div className={styles.container}>
    {contextHolder}
    <div className={styles.breadcrumb_create_btn}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href=""> Seller information</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
    <div className={styles.formContainer}>
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          email:vendorData?.email,
          phone:vendorData?.phone,
          company:vendorData?.company,
         tax_number:vendorData?.tax_number,
         country:vendorData?.country,
          state:vendorData?.state,
          city:vendorData?.city,
          s_address:vendorData?.address,
          zipcode:vendorData?.zipcode,
          address:vendorData?.address
        }}
      >
        <Form.Item style={{ float: "right" }} name="submit_btn">
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
        <div className={styles.information}>
          <div className="information_title" onClick={() => setInfo(!info)}>
            <h2 className={styles.title_header}>Information</h2>
          </div>
          <Card className={styles.information_container}>
           
              <Form.Item
                label="Company"
                name="company"
                style={{
                  width: "100%",
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your company name!",
                  },
                ]}
              >
                <Input />
              </Form.Item> 
              
              <Form.Item
                label="Status"
                name="status"
              >
              <Radio defaultChecked={vendorData?.status==='A'?true:false} >Active</Radio>
              </Form.Item>
            
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
             <Form.Item
              label="Tax number"
              name="tax_number"
              
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Address" name="s_address">
            <Input type="address" />
          </Form.Item>
            <Form.Item label="Country" name="country">
              <Select
                onSearch={onSearch}
                showSearch
                options={countries.map((option) => ({
                  label: option.name,
                  value: option.code,
                }))}
              />
            </Form.Item>

            <Form.Item label="State/Province" name="state">
              <Select
                onSelect={onSelect}
                //   onChange={onSecondCityChange}
                options={provinces.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Select
                showSearch
                // //   onChange={onSecondCityChange}
                options={cities.map((city) => ({
                  label: city,
                  value: city,
                }))}
              />
            </Form.Item>
            <Form.Item label="Zip/postal code" name="zipcode">
            <Input type="text" vlaue="" pattern="\d*" />
          </Form.Item>
          <Form.Item label="Location" name="address">
          <Input type="location" onChange={(e)=>setLocation(e.target.value)}  />
        </Form.Item>
        <Form.Item name="loc">
        <div>
        <iframe
          width="100%"
          height="300"
          src={`https://maps.google.com/maps?q=${!location?vendorData?.address:location}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </div>
        </Form.Item>
          </Card>
        </div>
      </Form>
    </div>
  </div>
  )
}

export default Seller