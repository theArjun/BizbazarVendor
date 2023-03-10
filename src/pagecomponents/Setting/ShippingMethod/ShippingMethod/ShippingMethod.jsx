import React, { useState } from "react";
import styles from "./ShippingMethod.module.css";
import { Button, Modal, Table,Radio } from "antd";
import { Tag } from "antd";
import CreateShipping from "./../CreateShipping/CreateShipping";
import EditShipping from "../EditShipping/EditShipping";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import { apicall } from "../../../../utils/apicall/apicall";

function ShippingMethod({ shipings, setBottom,setUpdate }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openStatusModal,setOpenStatusModal]=useState(false)
  const [status,setStatus]=useState("A")
  const [id,setId]=useState("")

  const windowSize = useWindowSize();

  React.useEffect(() => {
    document
      .querySelector("#shiipmenttable > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#shiipmenttable > div > div.ant-table-body ")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };

  const columns = [
    {
      title: "Pos",
      dataIndex: "position",
    },
    {
      title: "Name",
      dataIndex: "shipping",
      render: (text,dat) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/Setting/Shipping Methods/"+dat.shipping_id)}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Delivery Time",
      dataIndex: "delivery_time",
    },
    {
      title: "Weight Limit",
      dataIndex: "Position",
      render: (text, dat) => (
        <>
          {dat.max_weight}-{dat.min_weight}
        </>
      ),
    },
    {
      title: "User Group",
      dataIndex: "usergroup_ids",
    },
    {
      title: "Tools",
      dataIndex: "Position",
      render: (text, dat) => <div onClick={() =>{ setOpenEdit(true);
        setId(dat.shipping_id)
      }}>Edit</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, dat) => (
        <Tag color={text === "A" ? "green" : "red"}>
          {text === "A" ? "Active" : "Disable"}
        </Tag>
      ),
    },
  ];
  

  const onSelectChange = (a) => {
    console.log();
    setSelectedRowKeys(a);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteShipments=async()=>{
    const result=await apicall({
      url:"ShippingMethod/",
      method:"delete",
      data:{
        "shipping_ids": Object.assign({}, selectedRowKeys)
      }
      
      
    })
if(result.status==200){
  setUpdate(dat=>!dat)
}
  }

  const changeStatus=async()=>{
    const result=await apicall({
      url:"StatusTool/",
      method:"post",
      data:{
        "table_name": "shippings",
        "status": status,
        "id_name": "shipping_id",
        "ids": [...selectedRowKeys]
    }
      
      
    })
if(result.status==200){
  setUpdate(dat=>!dat)
  setOpenStatusModal(false)
}


  }
  
  

  return (
    <div className={styles.container}>
      <div style={{display:"flex",width:"100%",justifyContent:"right", marginBottom:"10px"}}>
     
      {selectedRowKeys.length>0?<>
     
     <Button onClick={deleteShipments}>
      Delete
     </Button>
     
     <Button style={{margin:"0 0 0 10px"}} onClick={()=>setOpenStatusModal(true)}>
   Change Status
     </Button>
     </>:null}
      <Button style={{margin:"0 0 0 10px"}} onClick={() => setOpen(true)}>
        Create
      </Button>
     
      </div>
    
      
      <Table
        id="shiipmenttable"
        rowSelection={rowSelection}
        dataSource={shipings}
        columns={columns}
        rowKey={"shipping_id"}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 300,
          x: 1000,
        }}
      />
    
      <CreateShipping open={open} setOpen={setOpen} />
      {/**Edit Shipping is actually view shipping */}
      <EditShipping  id={id} openEdit={openEdit} setOpenEdit={setOpenEdit} />
      <Modal open={openStatusModal}
        title="Change Status"
onCancel={()=>setOpenStatusModal(false)}
onOk={()=>changeStatus()}
>
  <div>
    Status : 
    <Radio.Group  onChange={(e)=>setStatus(
             
           e.target.value

             )} 
          value={status}
          >
            <Radio  
           value={"A"}
             >
              Active
            </Radio>
            <Radio value={"D"} >
              Disabled
            </Radio>
            </Radio.Group>
  </div>

</Modal>
    </div>
  );
}

export default ShippingMethod;


