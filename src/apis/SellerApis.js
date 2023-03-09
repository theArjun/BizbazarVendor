import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
const { id } = JSON.parse(window.localStorage.getItem("userinfo"));
export const useGetSellerInformation = () =>
  useQuery({
    queryKey: ["seller_information"],
    queryFn: () => apicall({ url: `Companies` }),
    onError: (err) => console.log(err),
  });
export const useUpdateSeller = () =>
  useMutation((data) =>
    apicall({ url: `Companies`, method: "post", data: data })
  );
