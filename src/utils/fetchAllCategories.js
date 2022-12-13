import { apicall } from "./apicall/apicall";
import { useDispatch } from "react-redux";
import { saveCategories } from "../redux/features/products/productSlice";
const dispatch=useDispatch()
export default fetchAndSave= async ()=>{
    const result = await apicall({
        url: `vendors/62/categories`,
      });
      if(result.data){
       await dispatch(saveCategories(result.data))
      }
      else{
        console.log('error on fetching data');
      }
}