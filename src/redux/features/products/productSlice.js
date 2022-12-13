import { createSlice } from "@reduxjs/toolkit";
const initialState={
  advanceSearch:false,
  loading:false,
  products:null,
  categories:'',
  editData:'',
  selectedCats:'',
  selectedCatIds:''
 
    }
export const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
      setLoading:(state, action)=>{
        // setting the state of loading 
        state.loading=action.payload;
      },
       loadTableData:  (state, action)=>{
         let data=[]
           // setting to the initial state
           if(action.payload){
              action.payload.map((item, index)=>{
                item['key']=index
                data.push(item);
              })
          }
       state.products=data;
        
       },
       handleAdvanceSearchModal: (state,action)=>{
        switch(action.payload){
          case 'open':
            state.advanceSearch=true;
            break;
          case 'close':
            state.advanceSearch=false;
            break;
        }
       },
       setSelectedProductId:(state,action)=>{
        state.selectedProductId=action.payload;
       },
       saveCategories:(state,action)=>{
        state.categories=action.payload;
       }, 
       handleEditData:(state,action)=>{
        state.editData=action.payload
       },
       getSelectedCategory:(state)=>{
        var ids=[];
        var categories=[]
        if(state.categories && state.editData){
          state.categories.map((item)=>{
            state.editData.category_ids.map((id)=>{
              if(item.category_id==id){
                categories.push(item.category)
                ids.push(item.category_id)
              }
            })
          })
        }
        state.selectedCats=categories;
        state.selectedCatIds=ids;
       }
    }

})

//Action Creators are generated for each case reducer function
export const {loadTableData,handleAdvanceSearchModal, setLoading,setSelectedProductId,saveCategories,handleEditData,getSelectedCategory}=productSlice.actions;
export default productSlice.reducer;