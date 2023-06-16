import React, { useState, useEffect } from "react";
import styles from "./Accounting.module.css";
import { Breadcrumb, Modal, Button, Form, Input } from "antd";
import { HiPlus } from "react-icons/hi";
import cx from "classnames";
import Transactions from "./Transactions/Transactions";
import Withdrawals from "./Withdrawals/Withdrawals";
import TextArea from "antd/es/input/TextArea";
import { useCreateNewWithdrawal } from "../../apis/AccountingApi";
import { useQueryClient } from "@tanstack/react-query";
import { useGetStatuses } from "../../apis/StatusApi";
import { useMemo } from "react";
import { Link } from "react-router-dom";
const Accounting = () => {
  const tabs = ["Transactions", "Balance withdrawals"];
  const [active, setActive] = useState(tabs[0]);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: createMutate, isLoading: createLoading } =
    useCreateNewWithdrawal();
  const { data: statusData } = useGetStatuses();
  // getting userInformation
  let user = JSON.parse(sessionStorage.getItem("userinfo"));

  // getting status of transaction detail
  const getStatus = useMemo(() => {
    if (statusData?.data) {
      return statusData?.data?.statuses;
    }
    return [];
  }, [statusData]);

  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    let payment_data = {
      payment: {
        amount: values.amount,
        comments: values.comments,
        vendor: user.id,
      },
    };
    createMutate(payment_data, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["withdrawals"]);
        queryClient.invalidateQueries(["transactions"]);
        setOpen(false);
        form.resetFields();
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <Withdrawals status={getStatus} />;

      default:
        return <Transactions status={getStatus} />;
    }
  };
  return (
    <div className={styles.container}>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Accounting</Breadcrumb.Item>
          <Breadcrumb.Item>{active}</Breadcrumb.Item>
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
            <div onClick={showModal} className={styles.new_add_btn}>
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
                style: { display: "none" },
              }}
              cancelButtonProps={{
                style: { display: "none" },
              }}
            >
              <hr />
              <p>
                <strong>Vendor:</strong> &nbsp;&nbsp; &nbsp;
                <span>Vendor Acc1</span>
              </p>
              <Form
                layout="vertical"
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
                  name="amount"
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
                  <TextArea rows={8} />
                </Form.Item>

                <Form.Item
                  // id="req"
                  label=""
                  name="submit"
                >
                  <Button
                    loading={createLoading}
                    type="primary"
                    htmlType="submit"
                    style={{ float: "right" }}
                  >
                    Create
                  </Button>
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
