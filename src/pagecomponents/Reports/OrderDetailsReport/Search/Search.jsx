import React, { useState, } from "react";
import styles from "./Search.module.css";
import { Card, Input } from "antd";

import "./index.css";
import { DatePicker } from "antd";
import useDebounce from "../../../../utils/Hooks/useDebounce";

const { RangePicker } = DatePicker;
const INITIAL_SEARCH={
    order_id:'',
    vendor_name:'',
    customer_name:'',
    ordered_date:''
}
const Search = ({
  params,
  setParams
}) => {
  const [orderDetail, setOrderDetail] = useState(INITIAL_SEARCH);
  useDebounce(()=>{
    let temp_params={...params}
    if(orderDetail.ordered_date){
      let startDate =
      new Date(orderDetail.ordered_date[0]?.$y, orderDetail.ordered_date[0]?.$M, orderDetail.ordered_date[0]?.$D).getTime() / 1000;
    let endDate =
      new Date(orderDetail.ordered_date[1]?.$y, orderDetail.ordered_date[1]?.$M, orderDetail.ordered_date[1]?.$D).getTime() / 1000;
      temp_params.date=`time_from=${startDate}&time_to=${endDate}`;
    }else{
      temp_params.date='isSearch=Y'
    }
    temp_params.order_id=orderDetail?.order_id;
    temp_params.vendor_name=orderDetail?.vendor_name;
    temp_params.shipping_customer_name=orderDetail?.customer_name;
    setParams(temp_params)

  },500,[orderDetail])

  return (
    <div className={styles.container} id="changeHere">
      <Card>
        <div className={styles.formcolumn}>
          <label>
            Order ID
            <Input
              type="number"
              onChange={(e) =>
                {
                  let init_state={...orderDetail}
                  init_state.order_id=e.target.value;
                  setOrderDetail(init_state);
                }
              }
            />
          </label>
          <label>
            Vendor name
            <Input
              type="text"
              onChange={(e) =>
                {
                  let init_state={...orderDetail}
                  init_state.vendor_name=e.target.value;
                  setOrderDetail(init_state);
                }
              }
            />
          </label>
          <label>
            Shipping Customer Name
            <Input
              type="text"
              onChange={(e) =>
                {
                  let init_state={...orderDetail}
                  init_state.customer_name=e.target.value;
                  setOrderDetail(init_state);
                }
              }
            />
          </label>

          <label>
            Ordered Date <br />
            <div style={{ display: "flex" }}>
             <RangePicker onChange={(e)=>{
              {
                let init_state={...orderDetail}
                init_state.ordered_date=e;
                setOrderDetail(init_state);
              }
             }}/>
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default Search;
