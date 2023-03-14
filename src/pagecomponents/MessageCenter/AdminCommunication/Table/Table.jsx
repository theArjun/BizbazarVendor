import React from 'react'
import styles from './Table.module.css'
import useWindowSize from '../../../../utils/Hooks/useWindowSize'
import { Table, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
const AdminCommunicationTable = ({loading, data}) => {
  const windowSize = useWindowSize();
  const navigate=useNavigate()
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
  const getCustomerName=(firstname, lastname)=>{
      return firstname+' '+lastname;
  }
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "type",
      render:(text, row)=>(
        <div>
        <Image
        width={70}
        src={text}
        alt={"No image"}
      />
        </div>
      )
    },
    {
      title: "ID",
      dataIndex: "thread_id",
      key: "id",
      render: (text) =>(
        <a onClick={()=>navigate(`AdminMessage/${text}`)}>{'#thread '+text}</a>
      )
    },
    {
      title: "Message/Subject",
      dataIndex: "last_message",
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
      render: (date, row) => getCustomerName(row?.firstname,row?.lastname)
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
      render: (date) => getTimeAndDate(date),
    },
    
  ];
  return (
    <div>
      <Table
        id="product"
        rowKey={'thread_id'}
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