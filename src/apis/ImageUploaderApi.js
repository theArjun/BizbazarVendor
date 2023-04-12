import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
import { notification } from "antd";

export const useUploadImage = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`ImageUploads`, data),
    onError: (err) => {
      notification.error({ message: "Error!", description: err.message });
    },
  });
