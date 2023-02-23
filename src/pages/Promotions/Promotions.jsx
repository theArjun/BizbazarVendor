import React,{useEffect} from "react";
import styles from "./Promotions.module.css";
import { Breadcrumb, Button, Table, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {apicall} from '../../utils/apicall/apicall'
import Spinner from "../../component/Spinner/Spinner";
import useWindowSize from "../../utils/Hooks/useWindowSize";
function Promotions() {
  const [promotions, setPromotions]=useState([])
  const [loading, setLoading]=useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const navigate = useNavigate();
  const windowSize= useWindowSize();
  useEffect(() => {
  getPromotions()
  }, []);
  //  lets get promotions from API 
  const getPromotions= async ()=>{
        setLoading(true)
        let result= await  apicall({
          url:`Promotions`
        })
        if(result?.data){
          let data=[...result.data.promotions]
            setPromotions(data.map((el,i)=>({...el, key:i})))
            setLoading(false)
            
        }
        setLoading(false)
  }
  // lets get status 
  const getStatus=(status)=>{
    switch(status){
      case 'A':
        return 'Active'
      case 'D':
        return 'Disabled'
      case 'H':
        return 'Hidden'
      default:
        return 'Pending'
    }
  }
  // lets handle the select status change 
  const handleStatusChange= async()=>{

  }
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex:'name',
      render:(name, row)=>(
        <React.Fragment>
        <a onClick={()=>navigate('../Marketing/Promotions/'+row?.promotion_id)} className={styles.promotion_name}>{name}</a>
        </React.Fragment>
      )
    },
    {
      title: "Stop other rules",
      dataIndex: "stop_other_rules",
      key: "rules",
      render:(text)=>(
        text=='N'?'No':'Yes'
      )
    },

    {
      title: "Priority",
      dataIndex: "priority",
      key: "4",
    },
    {
      title: "Zone",
      dataIndex: "zone",
      key: "5",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "5",
      render:(status)=>(
          <a>
          {getStatus(status)}
          </a>
      )
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
if(loading){
  return <Spinner/>
}
  return (
    <div className={styles.container}>
      <div className={styles.breadcumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Promotions</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.container}>
      <div className={styles.action_buttons}>
      <Button  disabled={!hasSelected} loading={loading}>
          Delete
        </Button>
        <Select
        disabled={!hasSelected}
        defaultValue='Status'
      style={{
        width: 170,
      }}
      onChange={handleStatusChange}
      options={[
        {
          label: 'Change to Active',
          value: 'A',
        },
        {
          label: 'Change to Hidden',
          value: 'H',
        },
        {
          label: 'Change to Disabled',
          value: 'D',
        },
      ]}
    />
      </div>
        <Table rowSelection={rowSelection}
         pagination={false} columns={columns}
          dataSource={promotions}
          scroll={{
            y: windowSize.height > 670 ? 300 : 200,
            x: 700,
          }} />
      </div>
      <Button
        className={styles.buttonAddCatalog}
        onClick={() => navigate("/Marketing/Add Catalog Promotion")}
      >
        Add Catalog Promotion
      </Button>
    </div>
  );
}

export default Promotions;
