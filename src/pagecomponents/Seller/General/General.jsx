import React, { useState, useEffect } from "react";
import styles from "./General.module.css";
import { Select, Input, Card, Radio, Form } from "antd";
const General = ({
  vendorData,
  countries,
  states,
  handleFormSubmit,
  handleFinishFailed,
  setGeneral,
  form
}) => {
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    getStates(vendorData?.country);
  }, [vendorData]);
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const getStates = (value) => {
    setState([]);
    let temp_states = states[value];
    if (temp_states) {
      setState(
        temp_states.map((el, i) => ({ label: el?.state, value: el?.code }))
      );
    }
  };
  const onValueChanges=(a,values)=>{
   setGeneral(values)
  }
  return (
    <div className={styles.container_general}>
      <div className={styles.formContainer}>
        <Form
        layout="vertical"
        form={form}
          name="basic"
          onFinish={handleFormSubmit}
          onFinishFailed={handleFinishFailed}
          onValuesChange={onValueChanges}
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
          <div className={styles.information}>
            <div className="information_title">
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
                <Input value={vendorData?.company} />
              </Form.Item>

              <Form.Item label="Status" name="status">
                <Radio checked={vendorData?.status === "A" ? true : false}>
                  Active
                </Radio>
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    len:10,
                    message: "Phone number should must have 10 digit",
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
                    type: "email",
                    message: "The input is not valid E-mail!",
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
                    message: "Please enter your tax!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item label="Address" name="address"
              
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              >
                <Input type="address"
                 />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
              >
                <Select
                  onSelect={getStates}
                  onSearch={onSearch}
                  showSearch
                  options={countries}
                />
              </Form.Item>

              <Form.Item
                label="State/Province"
                name="state"
              >
                <Select onSearch={onSearch} showSearch options={state} />
              </Form.Item>
              <Form.Item label="City" name="city"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              >
                <Input type="address" />
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
