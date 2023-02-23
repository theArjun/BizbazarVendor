import { Dropdown, Input, Menu, Tag,Select } from "antd";
import React, { useEffect, useState } from "react";
import OrderStatusModal from "../../../../../component/OrderStatusModal/OrderStatusModal";
import { apicall } from "../../../../../utils/apicall/apicall";
import styles from "./RightContain.module.css";

function RightContain({ orderDetail, statusModalOpen, setStatusModalOpen,setUpdateState }) {
  const [status, setStatus] = useState([]);
  const [manager,setManager]=useState([])
  const [carrier,setCarrier]=useState([])

  useEffect(() => {
    getStatus();
    getManager();
    getCarrier()
  }, []);

  const getStatus = async () => {
    const result = await apicall({
      url: "statuses",
    });
    setStatus(result.data.statuses);
  };

  const getManager=async()=>{
    const result = await apicall({
      url: "VendorManager",
    });
    setManager(result.data.vendormanagers);
    
  }

  const getCarrier=async()=>{
    const result = await apicall({
      url: "VendorCarrier",
    });
    setCarrier(Object.values(result.data.carriers)
      
      );
    
  }

  const menu = (filterStatus, objId) => (
    <Menu
      items={status
        .filter((datt, ii) => filterStatus != datt?.description)
        .map((dat, i) => ({
          key: i,
          label: (
            <div
              onClick={() => {
                setStatusModalOpen({
                  open: true,
                  data: dat,
                  orderId: objId,
                });
              }}
              target="_blank"
              style={{ color: dat?.params?.color }}
            >
              {dat.description}
            </div>
          ),
        }))}
    />
  );

  const getStatusTag = (data, obj) => {
    const [statusOfRow] = status.filter((dat) => dat.status === data);

    return (
      <Dropdown overlay={menu(statusOfRow?.description, obj)}>
        <Tag className={styles.dpContainer} color={statusOfRow?.params?.color}>
          {statusOfRow?.description}
        </Tag>
      </Dropdown>
    );
  };

  return (
    <div className={styles.container}>
      <div>
        {" "}
        <lable className={styles.label}>Status</lable>{" "}
        {getStatusTag(orderDetail.status, orderDetail.order_id)}
      </div>
      <div>
        {" "}
        {/* <lable className={styles.label}>Settlements</lable> Unsettled */}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Payment information</lable>
      </div>
      <div>
        {" "}
        Method {orderDetail?.payment_method?.payment}{" "}
        {orderDetail?.payment_method?.description}
      </div>
      <div style={{display:"flex"}}>
        {" "}
        <lable className={styles.label}>Manager</lable> <br />
        <Select
        onChange={(a)=>setUpdateState((prev)=>({...prev,trackingNumber:a.target.value}))} 
       
        style={{ width: "100%",marginLeft:"10px" }}
        dropdownMatchSelectWidth={false}
        // placement={placement}
        options={
          manager.map((dat)=>(
          {
            value:dat.id,
            label:dat.text
          }
          ))
        //   [
        //   {
        //     value: 'HangZhou',
        //     label: 'HangZhou #310000',
        //   },
        //   {
        //     value: 'NingBo',
        //     label: 'NingBo #315000',
        //   },
        //   {
        //     value: 'WenZhou',
        //     label: 'WenZhou #325000',
        //   },
        // ]
      }
      />
      </div>
      <div>
        {orderDetail?.issuer_data?.firstname}{" "}
        {orderDetail?.issuer_data?.lastname}{" "}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Shipping information</lable>
      </div>
      {orderDetail?.shipping?.map((dat, i) => (
        <>
          <div>{dat?.group_name}</div>
          <div>Method : {dat?.shipping}</div>
        </>
      ))}
      <div style={{display:"flex"}}>
      <div>Tracking Number </div><Input onChange={(a)=>setUpdateState((prev)=>({...prev,trackingNumber:a.target.value}))}  style={{height:"2.5em"}}/>
      </div>
      <div style={{display:"flex"}}>
      <div style={{marginRight:"10px"}}>Carrier  </div>    <Select
        // defaultValue="HangZhou"
        style={{ width: 120 }}
        dropdownMatchSelectWidth={false}
        // placement={placement}
        onChange={(a)=>setUpdateState((prev)=>({...prev,carrier:a.target.value}))} 
        options={
          carrier.map((dat)=>({
            label:dat.name,
            value:dat.name
          }))
      }
      />
      </div>
      <OrderStatusModal
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
      />
    </div>
  );
}

export default RightContain;
