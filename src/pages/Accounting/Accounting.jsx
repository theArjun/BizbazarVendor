import React, { useState } from "react";
import styles from "./Accounting.module.css";
import { Breadcrumb, Modal, Button, Space, Form, Input } from "antd";
import { HiPlus } from "react-icons/hi";
import cx from "classnames";
import Transactions from "./Transactions/Transactions";
import Withdrawals from "./Withdrawals/Withdrawals";
import TextArea from "antd/es/input/TextArea";
const Accounting = () => {
  const tabs = ["Transactions", "Balance withdrawals"];
  const [active, setActive] = useState("Transactions");
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    localStorage.setItem("login", true);
    navigate("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const getContainerFromTab = () => {
    switch (active) {
      case "Balance withdrawals":
        return <Withdrawals />;

      default:
        return <Transactions />;
    }
  };
  return (
    <div className={styles.container}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Accounting</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.tabContainer}>
          <div className={styles.left}>
            {tabs.map((dat, i) => (
              <div
                className={cx(
                  styles.button,
                  active === dat ? styles.bgColor : null
                )}
                key={i}
                onClick={() => setActive(dat)}
              >
                {dat}
              </div>
            ))}
          </div>
          <div>
            <div
              type="primary"
              onClick={showModal}
              className={styles.new_add_btn}
            >
              <HiPlus size={25} />
            </div>
            <Modal
              title="New withdrawal"
              open={open}
              onOk={onFinish}
              onCancel={hideModal}
              okText="Create"
              cancelText="Cancel"
              okButtonProps={{
               style:{display:'none'}
              }} 
              cancelButtonProps={{
               style:{display:'none'}
              }}
            >
              <hr />
              <p>
                <strong>Vendor:</strong> &nbsp;&nbsp; &nbsp;
                <span>Vendor Acc1</span>
              </p>
              <Form
                // layout="vertical"
                form={form}
                className={styles.form}
                name=""
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  // id="req"
                  label="Payment amount"
                  name="payment_amt"
                 
                  rules={[
                    {
                      required: true,
                      message: "Please enter payment amount.",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  // id="req"
                  label="Comments"
                  name="comments"
                 
                >
                  <TextArea rows={8}  />
                </Form.Item> 
                
                <Form.Item
                  // id="req"
                  label=""
                  name="submit"
                 
                >
                 <Button primary type="primary" htmlType="submit" style={{float:'right'}}>Create</Button>
                </Form.Item>
                
              </Form>
            </Modal>
          </div>
        </div>
        {getContainerFromTab()}
      </div>
    </div>
  );
};

export default Accounting;
