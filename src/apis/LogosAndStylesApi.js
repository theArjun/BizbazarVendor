import { useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
import { notification } from "antd";
export const useGetThemes = () =>
  useQuery({
    queryKey: ["themes"],
    queryFn: () => Axios.get("Themes"),
  });

export const useUpdateTheme = () =>
  useMutation({
    mutationFn: (data) => Axios.post("Themes", data),
    onSuccess: (res) => {
      notification.success({ message: "Theme updated successfully!" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to update",
        description: err.message,
      });
    },
  });
