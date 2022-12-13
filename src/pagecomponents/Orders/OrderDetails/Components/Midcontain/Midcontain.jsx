import React from "react";
import styles from "./Midcontain.module.css";
import { Image, Input } from "antd";

function Midcontain({ orderDetail }) {
  const { TextArea } = Input;
  console.log(orderDetail);
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div>Product</div>
        <div>Product Code</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Discount</div>
        <div>Sub Total</div>
      </div>
      {orderDetail?.product_groups?.map((datum, index) => {
        return Object.values(datum?.products)?.map((dat, i) => (
          <div className={styles.tableMap}>
            <div>
              <Image
                className={styles.imageTable}
                src={dat?.main_pair?.detailed?.https_image_path}
              />
            </div>
            <div className={styles.code}>{dat?.product_code}</div>
            <div>रु{dat?.base_price}</div>
            <div>{dat?.amount}</div>
            <div>रु{dat?.discount}</div>
            <div>रु{dat?.display_price}</div>
          </div>
        ));
      })}

      <div className={styles.calculationSection}>
        <div className={styles.calPart}>
          <div className={styles.totalHeading}>total</div>
          <div className={styles.calculationSectionDivisions}>
            <div>Sub total :</div>
            <div>Rs {orderDetail?.subtotal}</div>
          </div>

          <div className={styles.calculationSectionDivisions}>
            <div>Shipping cost :</div>
            <div>Rs {orderDetail?.shipping_cost}</div>
          </div>
          <div className={styles.calculationSectionDivisions}>
            <div>Including discount :</div>
            <div>Rs{orderDetail?.discount}</div>
          </div>
          <div className={styles.calculationSectionDivisions}>
            <div className={styles.totalHeading}>Total :</div>
            <div className={styles.totalPrice}>Rs{orderDetail?.total}</div>
          </div>
        </div>
      </div>
      <div className={styles.notes}>
        <div>
          <div>Staff notes</div>
          <TextArea />
        </div>
        <div>
          <div>Customer notes</div>
          <TextArea />
        </div>
      </div>
    </div>
  );
}

export default Midcontain;
