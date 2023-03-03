import React, { useState, useEffect } from "react";
import styles from "./General.module.css";
import { Form, Select, Button, Input, Card, Radio } from "antd";
import { countries } from "../../../pages/Profile/countries";
import states from "../../../pages/Profile/state.json";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSeller } from "../../../apis/SellerApis";
import Spinner from "../../../component/Spinner/Spinner";
const General = ({ vendorData }) => {
  const [cities, setCities] = useState([]);
  const [pradesh, setPradesh] = useState("");
  const [location, setLocation] = useState("");
  const {isLoading, mutate}=useUpdateSeller();
  const queryClient= useQueryClient()
  const provinces = [];
  for (var key in states) {
    provinces.push(key);
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
  const onFinish = (values) => {
   try{
    mutate(values,{
      onSuccess:(response)=>{
        queryClient.invalidateQueries(['seller_information'])
      }, 
      onError:(error)=>{
        console.log(error.message)
      }
    })

   }catch(err){
    console.log(err)
   }
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onSelect = (value) => {
    setPradesh(value);
  };
  if(isLoading){
    return <Spinner/>
  }
  return (
    <div className={styles.container_general}>
      <div className={styles.formContainer}>
        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            email: vendorData?.email,
            phone: vendorData?.phone,
            company: vendorData?.company,
            tax_number: vendorData?.tax_number,
            country: vendorData?.country,
            state: vendorData?.state,
            city: vendorData?.city,
            s_address: vendorData?.address,
            zipcode: vendorData?.zipcode,
            address: vendorData?.address,
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

              <Form.Item label="Status" name="status">
                <Radio
                checked={vendorData?.status === "A" ? true : false}
                >
                  Active
                </Radio>
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
                <Input
                  type="location"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="loc">
                <div>
                  <iframe
                    width="100%"
                    height="300"
                    src={`https://maps.google.com/maps?q=${
                      !location ? vendorData?.address : location
                    }&t=&z=11&ie=UTF8&iwloc=&output=embed`}
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
  );
};
export default General;
