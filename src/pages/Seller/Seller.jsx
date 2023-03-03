import React, { useEffect } from 'react'
import styles from "./Seller.module.css";
import cx from "classnames";
import Spinner from '../../component/Spinner/Spinner'
import { Breadcrumb } from "antd";
import { useState } from "react";
import { SellerDescription, SellerGeneral } from '..';
import { useGetSellerInformation } from '../../apis/SellerApis';
const tabs = [
  "General",
  "Description",
  "Logos",
  "TermsAndConditions",
  "Plan",
];
const Seller = () => {
    const [active, setActive] = useState("General");
    const {data,isLoading}=useGetSellerInformation()
   // get seller data 
   const getSeller=()=>{
    return data?.data
   }
    const getContainerFromTab = () => {
      switch (active) {
        case tabs[1]:
          return <SellerDescription/>
        case tabs[2]:
          return ''
        case tabs[3]:
          return ''
        case tabs[4]:
          return ''
        default:
          return <SellerGeneral vendorData={getSeller()} />
      }
    };
    if(isLoading){
      return(
        <Spinner/>
      )
    }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb_create_btn}>
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Seller information</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.left}>
          {tabs.map((dat, i) => (
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
      </div>

      {getContainerFromTab()}
    </div>
  )
}

export default Seller