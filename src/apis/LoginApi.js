import { useMutation, useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import Axios from "../config/apiConfig";
export const useLogin = () =>
  useMutation({
    // mutationFn: (data) => Axios.post(`VendorAuthTokens`, data),
    mutationFn: (data) => Axios.post(`BizbazarVendors`, data),
    onError: (err) => {
      if (err?.response?.status === 404) {
        notification.error({
          message: "Login Failed",
          description: err.message,
        });
      } else {
        notification.error({
          message: "Login failed",
          description: err.message,
        });
      }
    },
  });
