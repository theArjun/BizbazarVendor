import React from 'react'
import {TransactionTable,TransactionSearch} from '../..'
const Transactions = ({data ,status}) => {
  const getTotalTransaction=()=>{
   return  data.reduce((init, dat) =>  init + parseFloat(dat?.payout_amount), 0);
  };
  const getTotalShipping=()=>{
   return  data.reduce((init, dat) =>  init + parseFloat(dat?.shipping_cost?dat.shipping_cost:0), 0);
  }; 
  const getTotalVoucher=()=>{
   return  data.reduce((init, dat) =>  init + parseFloat(dat?.voucher_cost?dat.voucher_cost:0), 0);
  };
  const getTotalGift=()=>{
    return  data.reduce((init, dat) =>  init + parseFloat(dat?.gift_certificate_cost?dat.gift_certificate_cost:0), 0);
   };
   
   const getNetIncome=()=>{
    return  getTotalTransaction()-getTotalShipping()-getTotalVoucher();
   };
  return (
    <div>
    <TransactionSearch getTotalTransaction={getTotalTransaction} getTotalShipping={getTotalShipping} getTotalVoucher={getTotalVoucher} getTotalGift={getTotalGift} getNetIncome={getNetIncome} />
    <TransactionTable data={data} status={status} getTotalTransaction={getTotalTransaction} getTotalShipping={getTotalShipping} getTotalVoucher={getTotalVoucher} getTotalGift={getTotalGift} getNetIncome={getNetIncome} />
  </div>
  )
}

export default Transactions