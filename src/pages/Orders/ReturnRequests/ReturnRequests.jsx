import React from 'react'
import { Breadcrumb } from 'antd'
import styles from './ReturnRequests.module.css'
import { ReturnRequestsSearch,ReturnRequestsTable } from '../..'
const ReturnRequests = () => {
  return (
    <div className={styles.container}>
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Orders</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Return Requests</Breadcrumb.Item>
    </Breadcrumb>
    <ReturnRequestsSearch />
    <ReturnRequestsTable />
  </div>
  )
}

export default ReturnRequests