import { useMutation } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";


export const useAddProduct = ()=> useMutation((data)=>
 apicall({
    method: "post",
    url: "BulkProducts",
    data,
  })
)