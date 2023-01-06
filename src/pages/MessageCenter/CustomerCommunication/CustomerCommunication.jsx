import React, { useEffect } from 'react'
import { CustomerCommunicationSearch, CustomerCommunicationTable } from '../..'
import { Breadcrumb } from 'antd'
const data= [
  {
    image:'https://www.digitaltrends.com/wp-content/uploads/2021/11/macbook-pro-2021-16.jpg',
    id:'Thread$3',
    message:'Is this product available at your store?',
    customer:'Avinash KC',
    date:'1672831913'
  }
]
const CustomerCommunication = () => {
    useEffect(()=>{
        
    },[])
  return (
    <div>
    <Breadcrumb>
    <Breadcrumb.Item>Message Center</Breadcrumb.Item>
    <Breadcrumb.Item>Customer Communications</Breadcrumb.Item>
  </Breadcrumb>
    <CustomerCommunicationSearch/>
    <CustomerCommunicationTable data={data}/>
    </div>
  )
}

export default CustomerCommunication