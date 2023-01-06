import React from 'react'
import styles from './Table.module.css'
import useWindowSize from '../../../../utils/Hooks/useWindowSize'
import { Table } from 'antd'
const AdminCommunicationTable = ({loading, data}) => {
  const windowSize = useWindowSize();

   // getting time and date 
   const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp*1000));
    const monthyear = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
    });
    return monthyear + ", " + time;
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "type",
      render:(text, row)=>(
        <div>{text}</div>
      )
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) =>(
        <div>{text}</div>
      )
    },
    {
      title: "Message/Subject",
      dataIndex: "message",
      key: "message",
      render:(text, row)=>(
        <div>
        {text}
        </div>
      )
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => getTimeAndDate(date),
    },
    
  ];
  return (
    <div>
      <Table
        id="product"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 1000,
        }}
      />
    </div>
  )
}

export default AdminCommunicationTable