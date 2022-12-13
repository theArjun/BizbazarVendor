import React from "react";
import styles from "./LeftContain.module.css";
import { FiUser } from "react-icons/fi";
import { AiOutlineCar, AiOutlineTags } from "react-icons/ai";

function LeftContain({ orderDetail }) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Customer Information</div>
      <div className={styles.customerinformation}>
        <div>
          <FiUser />
        </div>
        <div>
          {orderDetail.firstname} {orderDetail?.lastname}
        </div>
        <div>Email</div>
        <div>{orderDetail?.email}</div>
        <div>Ip Address</div>
        <div>{orderDetail?.ip_address}</div>
        <div>Phone</div>
        <div>{orderDetail?.phone}</div>
      </div>

      <div className={styles.heading1}>Shipping address</div>
      <div className={styles.shippinginformation}>
        <div>
          <AiOutlineCar />
        </div>
        <div>
          {orderDetail?.s_address} {orderDetail?.s_city},
          {orderDetail?.s_state_descr}
          {orderDetail?.s_zipcode} {orderDetail?.s_country_descr}
        </div>
      </div>

      <div className={styles.heading1}>Billing address</div>
      <div className={styles.shippinginformation}>
        <div>
          <AiOutlineTags />
        </div>
        <div>
          {orderDetail?.b_address} {orderDetail?.b_city},
          {orderDetail?.b_state_descr}
          {orderDetail?.b_zipcode} {orderDetail?.b_country_descr}
        </div>
      </div>
      <div className={styles.heading1}>Shipping address In Map</div>
      <div>
        <iframe
          width="100%"
          height="200"
          src={`https://maps.google.com/maps?q=${orderDetail?.s_address}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div>
    </div>
  );
}

export default LeftContain;
