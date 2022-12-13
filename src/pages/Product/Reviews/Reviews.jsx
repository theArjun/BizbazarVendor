import React, { useState } from 'react'
import Search from '../../../pagecomponents/Products/Reviews/Search/Search';
import { ProductTable, ReviewSearch } from '../..';
import styles from './Reviews.module.css'
import { Breadcrumb } from 'antd'
const Reviews = () => {
  return (
    <div className={styles.container}>
    <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Products</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Reviews</Breadcrumb.Item>
  </Breadcrumb>
  <ReviewSearch />
  <ProductTable/>
    </div>
  )
}

export default Reviews