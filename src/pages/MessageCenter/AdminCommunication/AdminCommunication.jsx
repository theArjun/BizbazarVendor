import React,{useState} from 'react'
import { AdminCommunicationSearch, AdminCommunicationTable } from '../..'
import styles from './AdminCommunication.module.css'
import { Breadcrumb, Modal, Form, Input, Button } from 'antd'
import { HiPlus } from 'react-icons/hi'
const {TextArea}=Input;
const data= [
  {
    image:'https://www.digitaltrends.com/wp-content/uploads/2021/11/macbook-pro-2021-16.jpg',
    id:'Thread$3',
    message:'Is this product available at your store?',
    customer:'Avinash KC',
    date:'1672831913'
  }
]
const AdminCommunication = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();
  const onFinish = async (values) => {
   console.log(values)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const hideModal = () => {
    setOpen(false);
  };
  return (
    <div>
    <div className={styles.top_nav}>
    <Breadcrumb>
    <Breadcrumb.Item>Message Center</Breadcrumb.Item>
    <Breadcrumb.Item>Admin Communications</Breadcrumb.Item>
  </Breadcrumb>
        <div
        type="primary"
        onClick={showModal}
        className={styles.new_add_btn}
      >
        <HiPlus size={25} />
      </div>
            <Modal
            width={800}
            title="Contact administrator"
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
           
            <Form
              layout="vertical"
              form={form}
              className={styles.form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                // id="req"
                label="Subject"
                name="subject"
               
                rules={[
                  {
                    required: true,
                    message: "Please enter subject",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                // id="req"
                label="Your message to administrator"
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Please enter your message",
                  },
                ]}
              >
                <TextArea rows={8} placeholder={'Type a message...'}  />
              </Form.Item> 
              
              <Form.Item
                // id="req"
                label=""
              >
               <Button primary type="primary" htmlType="submit" style={{float:'right'}}>Send</Button>
              </Form.Item>
            </Form>
          </Modal>
    </div>
    <AdminCommunicationSearch/>
    <AdminCommunicationTable data= {data}/>
    </div>
  )
}

export default AdminCommunication