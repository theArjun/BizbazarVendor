import React from 'react'
import styles from './Profile.module.css'
import { countries } from './countries'
import states from './state.json'
import { Form,Breadcrumb,Select,Button,Input, } from 'antd'
import { useState,useEffect } from 'react'
const Profile = () => {
  const [pradesh,setPradesh]=useState('')
  const [cities,setCities]=useState([])
const provinces=[]
  for( var key in states){
    provinces.push(key);
  } 
  // console.log(states)
  useEffect(() => {
    var demo=[]
    states[pradesh]?.map((item)=>{
          item.cities.map((city)=>{
            demo.push(city);
            
          })
    })
    setCities(demo);
  }, [pradesh]);
  const onFinish = (values) => {

    console.log(values)
   }
   const onSearch = (value) => {
    console.log("search:", value);
  };
  const onSelect=(value)=>{
   setPradesh(value)
  }
  return (
    <div className={styles.container}>
    <div className={styles.breadcrumb_create_btn}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Account setting</a>
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
         country:'NP'
        }}
      >
        <Form.Item style={{ float: "right" }} name="submit_btn">
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
        <div className={styles.information}>
          <div className="information_title" onClick={() => setInfo(!info)}>
            <h2 className={styles.title_header}>
             Account information
            </h2>
          </div>
          <div
            className={
              styles.information_container
            }
          >
          <div className={styles.name_container}>
          <Form.Item
            label=" First Name"
            name="fname"
            style={{
              width:'100%',
            }}
            rules={[
              {
                required: true,
                message: "Please enter your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
          className={styles.left_margin}
            label=" Last Name"
            name="lname"
            style={{
              width:'100%',
            }}
            rules={[
              {
                required: true,
                message: "Please enter your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          </div>
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
            <div className={styles.name_container}>
            <Form.Item
              label="Password"
              name="password"
              type="password"
              style={{
                width:'100%',
              }}
              rules={[
                {
                  required: true,
                  message: "Please enter your phone!",
                },
              ]}
            >
              <Input  />
            </Form.Item>  
            <Form.Item
            className={styles.left_margin}
              label="Confirm password"
              name="c_password"
              style={{
                width:'100%',
              }}
            
            >
              <Input  />
            </Form.Item>
            </div>
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
          </div>
        </div>
        <div className={styles.options}>
          <div
            className="information_title"
            onClick={() => setOptions(!options)}
          >
            <h2 className={styles.title_header}>
              Billing address
            </h2>
          </div>
          <div
            className={
             styles.options_container
            }
          >
            <Form.Item label="Country"
            
            name="country">
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
          </div>
        </div>
        <div className={styles.pricing}>
          <div className="pricing_title" onClick={() => setPricing(!pricing)}>
            <h2 className={styles.title_header}>
             Shipping address
            </h2>{" "}
          </div>
          <div
            className={
               styles.pricing_container
            }
          >
          {'This is shipping address'}
          </div>
        </div>
      </Form>
    </div>
  </div>
  )
}

export default Profile