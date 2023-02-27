import React, { useRef, useState } from "react";
import LeftContain from "../Components/LeftContain/LeftContain";
import Midcontain from "../Components/Midcontain/Midcontain";
import styles from "./Details.module.css";
import cx from "classnames";
import RightContain from "../Components/RightContain/RightContain";
import { Button, Dropdown } from "antd";
import { apicall } from "../../../../utils/apicall/apicall";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

function Deatails({ orderDetail, statusModalOpen, setStatusModalOpen,referesh,setRefresh }) {
  const midTab = ["General", "Add On", "Promotion"];
  const contentRef = useRef(null);

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
                                            {"0":tn}                                               
      }}
    )
    if(result.data.status===200){
    
      setRefresh((dat)=>!dat)
    }
  }

  const printInvoice=async(dat)=>{
 
    const postUrl=dat===1?"print_invoice=1":"print_packing_slip=1"
const result=await apicall({
url:"VendorOrder/"+orderDetail.order_id+"?"+postUrl
})
// console.log();
const myWindow = window.open('', 'Print');
myWindow.document.write(result.data);
myWindow.document.close();


 setTimeout(()=>{
  myWindow.focus();
  myWindow.print();
  myWindow.close();
}, 100);


  }

  
  const printInvoicePdf=async(dat)=>{
         
    const postUrl=dat===1?"print_invoice=1":"print_packing_slip=1"
const result=await apicall({
url:"VendorOrder/"+orderDetail.order_id+"?"+postUrl
})

const myWindow = window.open('', 'Print');
myWindow.document.write(result.data);

const element = myWindow.document.querySelector("tbody");


const doc = new jsPDF('p', 'mm', dat===2?'a5':"a4");


setTimeout(() => {
  html2canvas(element,{
    useCORS: true,allowTaint: true}).then(canvas => {
   
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 4, 4, dat===2?150:200, dat===2?230:240);

   
    doc.save('output.pdf');
 
 
}, 1000).then(()=>{
  myWindow.close();
});
  
}, 1000);

  
    
    
    



  }



  const items = [
    {
      key: '1',
      label: (
        <div onClick={()=>printInvoice(1)}> Print invoice</div>
      ),
    },
    {
      key: '2',
      label: (
        <div>Tweak and send invoice</div>
      ),
    },
    {
      key: '3',
      label: (
        <div onClick={()=>printInvoice(2)}>Print packing slip</div>
      ),
    },
    {
      key: '4',
      label: (
        <div> Contact customer</div>
      ),
    },
    {
      key: '5',
      label: (
        <div>Contact administrator</div>
      ),
    },
    {
      key: '6',
      label: (
        <div onClick={()=>printInvoicePdf(1)} > Print invoice (pdf)</div>
      ),
    },
    {
      key: '7',
      label: (
        <div onClick={()=>printInvoicePdf(2)}> Print packing slip (pdf)</div>
      ),
    },
  ]

  return (
    <div ref={contentRef} className={styles.container}>
      <div id="content" className={styles.leftContain}>
        <i></i>
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
      <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      arrow={{
        pointAtCenter: true,
      }}
      className={styles.savebutton1}
    >
      <Button>Setting</Button>
    </Dropdown>
      {/* <Button    onClick={()=>printInvoice()} >Invoice</Button> */}
      <Button className={styles.savebutton} onClick={()=>updateOrder()}>Save</Button>
    </div>
  );
}

export default Deatails;
