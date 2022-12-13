import React, { useEffect, useState } from "react";
import {Table, Dropdown,Button } from "antd";
import styles from "./Table.module.css";
import { AiFillSetting } from "react-icons/ai";
const data = [
  {
    key: "1",
    price: 2554,
    quantity: 5,
    code: "#12545",
    status:{
      status:'Confirmed',
      update_by:'Admin Admin'
    },
    date:{
      date:'11/29/2022',
      time:'15:07'
    },
    customer:'Vision Computer',
    phone:'9805335201',
    settlement:'Unsettled',
    total:56
  },
  {
    key: "2",
    price: 2474,
    quantity: 25,
    code: "#12545",
    status:{
      status:'Confirmed',
      update_by:'Admin Admin'
    },
    date:{
      date:'11/29/2022',
      time:'15:07'
    },
    customer:'Vision Computer',
    phone:'9805335201',
    settlement:'Unsettled',
    total:89
  },
  {
    key: "3",
    price: 5554,
    quantity: 65,
    code: "#12545",
    status:{
      status:'Confirmed',
      update_by:'Admin Admin'
    },
    date:{
      date:'11/29/2022',
      time:'15:07'
    },
    customer:'Vision Computer',
    phone:'9805335201',
    settlement:'Unsettled',
    total:45
  },
];
var gross_total=0;
const ViewOrderTable =  () => {
  const[tableData,setTableData]=useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   useEffect(()=>{
    setTableData(data)
      
      //  return await gross_total;
    
  },[data]);
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/products/products/delete"
        >
          View
        </a>
      ),
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "code",
      key: "code",
      render: (code) => (
        <a href="#">Order {code}</a>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "price",
      render:(status)=>(
        <div className={styles.order_status}>
        <Button style={{width:'fit-content'}} type="primary" id="status">{status.status}</Button>
        <label htmlFor="#status">{status.update_by}</label>
        </div>
      )
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render:(date)=>(
            <p>{date.date+','+date.time}</p>
      )
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
    
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    
    },
    {
      title: "SETTLEMENT STATUS",
      dataIndex: "settlement",
      key: "settlement",
    
    },
    {
      title: "ACTION",
      key: "action",
      dataIndex: "action",
      render: (action) => (
        <div className={styles.product_action}>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow
          >
            <AiFillSetting size={20} className={styles.icons} />
          </Dropdown>
        </div>
      ),
    },
    {
      title: "TOTAL",
      dataIndex:'total',
      key: "total",
      render: (total) => (
        <p>रु{total}</p>
      ),
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={tableData} pagination={false} scroll={{
        x: 1000,
        // y: 300,
      }} />
      <div className={styles.gross_total}>
        <p>Gross Total: {}</p>
        <h4>Total Paid <span style={{color:'green'}}>रु{0}</span></h4>
      </div>
    </div>
  );
};

export default ViewOrderTable;
