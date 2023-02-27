import { Dropdown, Input, Menu, Tag,Select } from "antd";
import React, { useEffect, useState } from "react";
import OrderStatusModal from "../../../../../component/OrderStatusModal/OrderStatusModal";
import { apicall } from "../../../../../utils/apicall/apicall";
import styles from "./RightContain.module.css";

function RightContain({ orderDetail, statusModalOpen, setStatusModalOpen,setUpdateState ,updateState}) {
  const [status, setStatus] = useState([]);
  const [manager,setManager]=useState([])
  const [carrier,setCarrier]=useState([])

  useEffect(() => {
    getStatus();
    getManager();
    getCarrier()
  }, []);

  // console.log(orderDetail);

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
    if (result.status===200) {
      setCarrier(Object.entries(result.data.carriers).map(dat=>({
        label:dat[1]?.name,
        value:dat[0]
      })));
    }
 
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

   const setManagerApi=async(a)=>{
    const result=apicall({
      method:"put",
      url:"VendorManager/"+a,

      data:{
        order_id:orderDetail.order_id
      }
    })
    console.log(result);
   }

  return (
    <div className={styles.container}>
      <div>
        {" "}
        <lable className={styles.label}>Status</lable>{" "}
        {getStatusTag(orderDetail.status, orderDetail.order_id)}
      </div>
      <div>
        {" "}
      
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
         onChange={(a)=>setUpdateState((prev)=>({...prev,manager:a}))} 
       
         defaultValue={updateState?.manager || orderDetail?.issuer_id}
        // onChange={(a)=>setManagerApi(a)}
        style={{ width: "100%",marginLeft:"10px" }}
        dropdownMatchSelectWidth={false}        options={
         [{label:"None",value:"0"},...manager.map((dat)=>(
          {
            value:dat.id,
            label:dat.text
          }
          ))]
       
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
        <div key={i}>
          <div>{dat?.group_name}</div>
          <div>Method : {dat?.shipping}</div>
        </div>
      ))}
      <div style={{display:"flex"}}>
      <div>Tracking Number </div><Input  defaultValue={updateState?.trackingNumber||orderDetail?.shipment_info?.length>0?  orderDetail?.shipment_info[0]?.tracking_number :""} onChange={(a)=>

        setUpdateState((prev)=>({...prev,trackingNumber:a.target.value}))
        }  style={{height:"2.5em"}}/>
      </div>
      <div style={{display:"flex"}}>
      <div style={{marginRight:"10px"}}>Carrier  </div>    <Select
        // defaultValue="HangZhou"
        style={{ width: 120 }}
        dropdownMatchSelectWidth={false}
        defaultValue={updateState?.carrier || orderDetail?.shipment_info?.length>0?  orderDetail?.shipment_info[0]?.carrier :""}
  
        onChange={(a)=>setUpdateState((prev)=>({...prev,carrier:a}))} 
        options={[{label:"None",value:" "},...carrier]
         
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
