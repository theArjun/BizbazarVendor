import { useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
import { notification } from "antd";
export const useGetSellerInformation = () =>
  useQuery({
    queryKey: ["seller_information"],
    queryFn: () => Axios.get(`Companies`),
    refetchOnWindowFocus: false,
  });
export const useUpdateSeller = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`Companies`, data),
    onSuccess: (res) => {
      notification.success({
        message: "Your changes have been saved.",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to save",
        description: err?.message,
      });
    },
  });
