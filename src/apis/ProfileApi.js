import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
import { notification } from "antd";
// getting profile information
export const useGetProfileInformation = (id) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: () => Axios.get(`VendorProfile/${id}?details=1`),
    refetchOnWindowFocus: true,
  });
// Now update profile information
export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (data) =>
      Axios.put(`VendorProfile/${data.user_id}?details=1`, data),
    onSuccess: (res) => {
      notification.success({ message: "Your changes applied successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to update ",
        description: err?.response?.data?.message,
      });
    },
  });
