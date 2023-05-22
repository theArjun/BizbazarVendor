import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import Axios from "../config/apiConfig";
const ITEM_PER_PAGE = 50;
// Creating promotion
export const useCreatePromotion = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`Promotions`, data),
    onSuccess: (res) => {
      notification.success({
        message: "Promotion have been created successfully",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to create promotion.",
        description: err.message,
      });
    },
  });
export const useUpdatePromotion = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`Promotions`, data),
    onSuccess: (res) => {
      notification.success({
        message: "Changes have been successfully applied.",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to update.",
        description: err.message,
      });
    },
  });
export const useDeletePromotions = () =>
  useMutation({
    mutationFn: (data) => Axios.delete(`Promotions`, { data: data }),
    onSuccess: (res) => {
      notification.success({
        message: "Promotions deleted successfully.",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to delete.",
        description: err.message,
      });
    },
  });
export const useChangePromotionStatus = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`StatusTool`, data),
    onSuccess: (res) => {
      notification.success({
        message: "Status changed successfully.",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to change status.",
        description: err.message,
      });
    },
  });
export const useGetPromotions = () =>
  useInfiniteQuery({
    queryKey: ["promotions"],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(`Promotions?page=${pageParam}&items_per_page=${ITEM_PER_PAGE}`),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.promotions?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage.data?.params?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });

export const useDeletePromotionImage = () =>
  useMutation({
    mutationFn: (data) => Axios.delete(`ImageUploads`, { data: data }),
    onError: (err) => {
      notification.error({
        message: "Failed to delete. promotion image",
        description: err.message,
      });
    },
  });

export const useGetPromotionById = (id) =>
  useQuery({
    queryKey: ["single_promotion", id],
    queryFn: () =>
      Axios.get(`Promotions?promotion_id=${id}&extend[]=get_images&expand=1`),
    refetchOnWindowFocus: false,
  });

export const useGetPromotionProducts = () =>
  useQuery({
    queryKey: ["promotion_products"],
    queryFn: () => Axios.get(`VendorProducts?get_short_list_only=1`),
  });
export const useGetPromotionCategories = () =>
  useQuery({
    queryKey: ["promotion_categories"],
    queryFn: () => Axios.get("categories"),
  });

export const useGetPromotionUsers = () =>
  useQuery({
    queryKey: ["promotion_users"],
    queryFn: () => Axios.get("users"),
    onError: (error) => {
      console.log("Error occured", error);
    },
  });
