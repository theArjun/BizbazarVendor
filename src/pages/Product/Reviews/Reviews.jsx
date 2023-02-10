import React, { useEffect, useState } from 'react'
import { ReviewSearch, ReviewTable } from '../..';
import styles from './Reviews.module.css'
import { Breadcrumb } from 'antd'
import { apicall } from '../../../utils/apicall/apicall';
const Reviews = () => {
  const[reviews, setReviews]=useState([])
  const [loading, setLoading]=useState(false)
useEffect(()=>{
      getReviews();
},[])

const getReviews= async ()=>{
  setLoading(true)
  let result = await apicall({
    url:`ProductReview`
  })
  if(result?.data){
    setLoading(false)
    setReviews(Object.values(result.data.reviews).map((el, i)=>({...el, key:i})))
  }
  else{
    setLoading(false)

  }
}
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
  <ReviewTable loading={loading} reviews={reviews}/>
    </div>
  )
}

export default Reviews