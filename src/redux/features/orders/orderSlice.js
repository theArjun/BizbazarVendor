import { createSlice } from "@reduxjs/toolkit";
const data= [
    {
      key: "1",
      price: 2554,
      quantity: 5,
      code: "#12545",
      status:{
        status:'Confirmed',
        update_by:'Admin Admin' 
      },
      date:{
        date:'11/29/2022',
        time:'15:07'
      },
      customer:'Vision Computer',
      phone:'9805335201',
      settlement:'Unsettled',
      total:56
    },
    {
      key: "2",
      price: 2474,
      quantity: 25,
      code: "#12545",
      status:{
        status:'Confirmed',
        update_by:'Admin Admin'
      },
      date:{
        date:'11/29/2022',
        time:'15:07'
      },
      customer:'Vision Computer',
      phone:'9805335201',
      settlement:'Unsettled',
      total:89
    },
    {
      key: "3",
      price: 5554,
      quantity: 65,
      code: "#12545",
      status:{
        status:'Confirmed',
        update_by:'Admin Admin'
      },
      date:{
        date:'11/29/2022',
        time:'15:07'
      },
      customer:'Vision Computer',
      phone:'9805335201',
      settlement:'Unsettled',
      total:45
    },
  ];
  const calculateTotalPrice= ()=>{
    var count=0;
   data.map((item)=>{
        count+=item.total;
    })
    return count;
  }
const initialState={
   data:data,
   total:calculateTotalPrice(),
   orderStatus:'Open',
   loading:false,
}
export const orderSlice=createSlice({
        name:'order',
        initialState,
        reducers:{
            changeOrderStatus:(state,action)=>{
              state.loading=true;
              const {order,status}=action.payload;
              let orderData=[...data];
              // console.log(order)
                orderData.map((item, index)=>{
                  if(order.key===item.key){
                    const recent_status={status:status,update_by:item.status.update_by}
                      console.log("Your status changed: ",recent_status);
                      // Call api here to update the data
                  }
                })
                // console.log(orderData)
                state.data=orderData;
                state.loading=false;
            }
            
        }
})

export const {changeOrderStatus}=orderSlice.actions;
export default orderSlice.reducer