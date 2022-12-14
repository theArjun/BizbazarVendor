import React from "react";
import styles from "./Profile.module.css";
import { countries } from "./countries";
import states from "./state.json";
import { Form, Breadcrumb, Select, Button, Input, Checkbox, Card, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { apicall } from "../../utils/apicall/apicall";
const Profile = () => {
  const [pradesh, setPradesh] = useState("");
  const [cities, setCities] = useState([]);
  const [isShipping, setIsShipping] = useState(false);
  const [vendorData, setVendorData]=useState('')
  const [loading,setLoading]=useState(false);
  const provinces = [];
  for (var key in states) {
    provinces.push(key);
  }

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
  const onFinish = (values) => {
    console.log(values);
  };
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
            email:vendorData?.email,
            phone:vendorData?.phone,
            fname:vendorData?.company?.split(' ')[0],
            lname:vendorData?.company?.split(' ')[1],
            country: vendorData?.country,
            state:vendorData?.state,
            city:vendorData?.city,
            s_address:vendorData?.address,
            s_postal:vendorData?.zipcode,
            

          }}
        >
          <Form.Item style={{ float: "right" }} name="submit_btn">
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
          <div className={styles.information}>
            <div className="information_title" onClick={() => setInfo(!info)}>
              <h2 className={styles.title_header}>Account information</h2>
            </div>
            <Card className={styles.information_container}>
              <div className={styles.name_container}>
                <Form.Item
                  label=" First Name"
                  name="fname"
                  style={{
                    width: "100%",
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
                    width: "100%",
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
                    width: "100%",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className={styles.left_margin}
                  label="Confirm password"
                  name="c_password"
                  style={{
                    width: "100%",
                  }}
                >
                  <Input />
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
            </Card>
          </div>
          <div className={styles.options}>
            <div className="information_title">
              <h2 className={styles.title_header}>Billing address</h2>
            </div>
            <Card className={styles.options_container}>
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
            </Card>
          </div>
          <div className={styles.pricing}>
            <div className="pricing_title" onClick={() => setPricing(!pricing)}>
              <h2 className={styles.title_header}>Shipping address</h2>{" "}
            </div>
            <Form.Item>
              <Checkbox onChange={() => setIsShipping(!isShipping)}>
                Are shipping and billing addresses the same?
              </Checkbox>
            </Form.Item>
            <Card className={!isShipping ? "" : styles.area_disabled}>
              <Form.Item label="Address" name="s_address">
                <Input type="address" />
              </Form.Item>
              <Form.Item
                label="Country"
                name={isShipping ? "country" : "s_country"}
              >
                <Select
                  onSearch={onSearch}
                  showSearch
                  options={countries.map((option) => ({
                    label: option.name,
                    value: option.code,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="State/Province"
                name={isShipping ? "state" : "s_state"}
              >
                <Select
                  onSelect={onSelect}
                  //   onChange={onSecondCityChange}
                  options={provinces.map((province) => ({
                    label: province,
                    value: province,
                  }))}
                />
              </Form.Item>
              <Form.Item label="City" name={isShipping ? "city" : "s_city"}>
                <Select
                  showSearch
                  options={cities.map((city) => ({
                    label: city,
                    value: city,
                  }))}
                />
              </Form.Item>
              <Form.Item label="Zip/postal code" name="s_postal">
                <Input type="text" vlaue="" pattern="\d*" />
              </Form.Item>
            </Card>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
