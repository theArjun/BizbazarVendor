import React, { useState, useEffect } from "react";
import styles from "./Accounting.module.css";
import { Breadcrumb, Modal, Button, Form, Input, } from "antd";
import { HiPlus } from "react-icons/hi";
import cx from "classnames";
import Transactions from "./Transactions/Transactions";
import Withdrawals from "./Withdrawals/Withdrawals";
import TextArea from "antd/es/input/TextArea";
import { apicall } from "../../utils/apicall/apicall";
const Accounting = () => {
  const tabs = ["Transactions", "Balance withdrawals"];
  const [active, setActive] = useState("Transactions");
  const [data,setData]=useState('')
  const [open, setOpen] = useState(false);
  const[status,setStatus]=useState([])
  const [loading, setLoading]=useState(false)
  const [withdrawData,setWithdrawData]=useState('')
// getting userInformation
let user= JSON.parse(localStorage.getItem('userinfo'));
  // Lets get Accounting data through api
  useEffect(()=>{
    getAccountingInformation();
    getWithdrawInformation();
    getStatus();
  },[]);

  // get url for transaction search value 
  const getUrl=(values)=>{
    let baseUrl=`BizbazarAccounting/${user.id}?is_search=Y`
    if(values?.types){
      baseUrl=baseUrl+"&payout_type="+values.types
    }
    if(values?.status){
      baseUrl=baseUrl+'&approval_status='+values.status
    }
    if(values?.start_date && values?.end_date){
      baseUrl= baseUrl+'&time_from='+values.start_date+'&time_to='+values.end_date
    }
    return baseUrl;
  }
  // search url for withdrawals
  const getWithdrawUrl=(values)=>{
    let baseUrl=`BizbazarAccounting/${user.id}?is_search=Y&selected_section=withdrawals`
    if(values?.status){
      baseUrl=baseUrl+'&approval_status='+values.status
    }
    if(values?.start_date && values?.end_date){
      baseUrl= baseUrl+'&time_from='+values.start_date+'&time_to='+values.end_date
    }
    return baseUrl;
  }
  // getting status of transaction detail
  const getStatus = async () => {
    const result = await apicall({
      url: "statuses",
    });
    setStatus(result.data.statuses);
  };
// get Account info
  const getAccountingInformation=async (values)=>{
    setLoading(true)
     let result = await apicall({
        url:getUrl(values)
      });
      if(result.data){
        setData(result.data.map((item, index)=>({...item, key:index})))
        setLoading(false)
      }
      setLoading(false)
  };
// get Withdraw information 
const getWithdrawInformation= async(values)=>{
  setLoading(true)
  let result = await apicall({
     url:getWithdrawUrl(values)
   });
   if(result.data){
    
    let temp=result.data.map((item, index)=>({...item, key:index}))
     setWithdrawData(temp)
     setLoading(false)
   }
   setLoading(false)
}
  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    let payment_data={
      payment:{
        amount:values.amount,
        comments:values.comments,
        vendor:user.id
      }
    }

 let result= await apicall({
    url:`BizbazarAccounting`,
    method:'post',
    data:payment_data
  })
  if(result.status==201){
    setOpen(false)
    getAccountingInformation();
    getWithdrawInformation();
    getStatus();
  }
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
        return <Withdrawals data={withdrawData} status={status}  loading={loading} getWithdrawInformation={getWithdrawInformation}/>;

      default:
        return <Transactions data={data} status={status} getAccountingInformation={getAccountingInformation} loading={loading} />;
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
                  <TextArea rows={8}  />
                </Form.Item> 
                
                <Form.Item
                  // id="req"
                  label=""
                  name="submit"
                 
                >
                 <Button type="primary" htmlType="submit" style={{float:'right'}}>Create</Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
        {
          getContainerFromTab()}
      </div>
    </div>
  );
};

export default Accounting;
