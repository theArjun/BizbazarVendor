import React from "react";
import styles from "./Profile.module.css";
import { countries } from "./countries";
import "./index.css";
import states from "./state.json";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Breadcrumb,
  Select,
  Button,
  Input,
  Checkbox,
  Card,
  Skeleton,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { apicall } from "../../utils/apicall/apicall";
const Profile = () => {
  const userInfo=JSON.parse(localStorage.getItem('userinfo'));
  const [pradesh, setPradesh] = useState("");
  const [cities, setCities] = useState([]);
  const [isShipping, setIsShipping] = useState(false);
  const [vendorData, setVendorData] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState("");
  const provinces = [];
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  for (var key in states) {
    provinces.push(key);
  }
  // This is used to alert user for any <information></information>
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      placement: "bottomRight",
    });
  };
  useEffect(() => {
    getVendorInformation();
  }, []);
  const getVendorInformation = async () => {
    setLoading(true);
    const result = await apicall({
      url:`users/${userInfo.user_id}`
      
    });
    if (result.data) {
      setVendorData(result.data);
      setPradesh(result?.data?.state)
    }
    setLoading(false);
  };
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
  const handleValueChange=(a,values)=>{
        if(values.password===''){
          setConfirm('')
        }
        if(values.c_password===''){
          setConfirm('')
        }
  }
  const onFinish = async (values) => {
    const data = { ...values };
    data.company = values.firstname + " " + values.lastname;
    if (values.password?.length > 0 && values?.password?.length < 8) {
      setConfirm("Password should at least 8 character!");
    } else {
      if (values.password != values.c_password) {
        setConfirm("password  doesn't match");
      } else {
        setConfirm("");
        const result = await apicall({
          url: `users/${userInfo.user_id}`,
          data: data,
          method: "put",
        });
        if (result.data) {
          // Seccess message
          openNotificationWithIcon(
            "success",
            "Your changes saved successfully!"
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          openNotificationWithIcon("error", "Failed to save your changes!");
        }
      }
    }
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onSelect = (value) => {
    setPradesh(value);
  };
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className={styles.container}>
      {contextHolder}
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
          onValuesChange={handleValueChange}
          initialValues={{
            email: vendorData?.email,
            phone: vendorData?.phone,
            firstname: vendorData?.firstname,
            lastname: vendorData?.lastname,
            country: vendorData?.country,
            state: vendorData?.state,
            city: vendorData?.city,
            password:vendorData?.password,
            b_address: vendorData?.address,
            b_zipcode: vendorData?.zipcode,
          }}
        >
          <Form.Item style={{ float: "right" }} name="submit_btn">
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
          <div className={styles.information}>
            <div className="information_title">
              <h2 className={styles.title_header}>Account information</h2>
            </div>
            <Card className={styles.information_container}>
              <div className={styles.name_container}>
                <Form.Item
                  label=" First Name"
                  name="firstname"
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
                  name="lastname"
                  style={{
                    width: "100%",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name !",
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
                  style={{
                    width: "100%",
                  }}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
                <Form.Item
                  className={styles.left_margin}
                  label="Confirm password"
                  name="c_password"
                  style={{
                    width: "100%",
                  }}
                >
                  <Input type="password" />
                </Form.Item>
              </div>
              <label style={{ color: "rgb(255, 53, 53)" }}>{confirm}</label>
              <Form.Item
                label="Email"
                name="email"
                // style={{ marginTop:'20px'}}
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
            <Form.Item label="Address" name="b_address">
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
              <Form.Item label="Zip/postal code" name="b_zipcode">
              <Input type="text" vlaue="" pattern="\d*" />
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
              <Form.Item label="Address" name={isShipping?'b_address':'s_address'}>
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
              <Form.Item label="Zip/postal code" name={isShipping?'b_zipcode':'s_zipcode'}>
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
