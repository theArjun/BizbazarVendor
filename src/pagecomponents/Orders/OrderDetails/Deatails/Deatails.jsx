import React, { useState } from "react";
import LeftContain from "../Components/LeftContain/LeftContain";
import Midcontain from "../Components/Midcontain/Midcontain";
import styles from "./Details.module.css";
import cx from "classnames";
import RightContain from "../Components/RightContain/RightContain";
import { Button } from "antd";
import { apicall } from "../../../../utils/apicall/apicall";

function Deatails({ orderDetail, statusModalOpen, setStatusModalOpen,referesh,setRefresh }) {
  const midTab = ["General", "Add On", "Promotion"];

  const [active, setActive] = useState("General");
  const [updateState,setUpdateState]=useState({})

  const getContainerFromTab = () => {
    switch (active) {
      case "Add On":
        return <>Add on</>;
      case "Promotion":
        return <>Promotion</>;

      default:
        return <Midcontain updateState={updateState} setUpdateState={setUpdateState}  orderDetail={orderDetail} />;
    }
  };

  const updateOrder=async()=>{
   if(Object.keys(updateState).length===0){
    return
   }
     const tn =JSON.parse(`{"${orderDetail.shipment_ids.length>0?orderDetail.shipment_ids[0]:0}":
     {"tracking_number":"${updateState?.trackingNumber||orderDetail?.shipment_info[0]?.tracking_number ||""}",
         "shipping_id":6,
           "carrier":"${updateState?.carrier||orderDetail?.shipment_info[0]?.carrier  ||""}"}}`)
    const result =await apicall(
      {
        url:"VendorOrder/"+orderDetail.order_id,
        method:"put",
        data: {"order_id":orderDetail.order_id,
              "update_order":
                          {"notes":updateState?.customernotes || orderDetail?.notes,
                            "details":updateState?.staffnotes|| orderDetail?.details,
                            "issuer_id":updateState?.manager||orderDetail?.issuer_id,
                            "delivery_date":orderDetail?.timestamp,
                            "delivery_time_from":0,
                            "delivery_time_to":0,
                            "delivery_message":0},
                            "update_shipping":
                                            {"0":tn
                                                  }
      }}
    )
    if(result.data.status===200){
    
      setRefresh((dat)=>!dat)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftContain}>
        <LeftContain  orderDetail={orderDetail} />
      </div>
      <div className={styles.midcontain}>
        <div className={styles.tabContainer}>
          {midTab.map((dat, i) => (
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
        {getContainerFromTab()}
      </div>
      <div className={styles.rightContain}>
        <RightContain
        setUpdateState={setUpdateState}
          orderDetail={orderDetail}
          statusModalOpen={statusModalOpen}
          setStatusModalOpen={setStatusModalOpen}
        />
      </div>
      <Button className={styles.savebutton} onClick={()=>updateOrder()}>Save</Button>
    </div>
  );
}

export default Deatails;
