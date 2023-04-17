import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
import { notification } from "antd";
const ITEM_PER_PAGE = 50;
// Getting orders
export const useGetOrders = (params) =>
  useInfiniteQuery({
    queryKey: ["orders", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `orders?isSearch=Y&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&cname=${params.cname}&email=${params.email}&phone=${params.phone}&order_id=${params.order_id}&total_from=${params.total_from}&total_to=${params.total_to}&sort_order=${params.sort_order}&sort_by=${params.sort_by}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.orders?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor =
        Number(pages.at(-1)?.data?.params?.page) + 1);
    },
  });
// change order status
export const useChangeOrderStatus = () =>
  useMutation({
    mutationFn: (data) => Axios.put(`orders/${data.order_id}`, data),
    onSuccess: (res) => {
      notification.success({ message: "Order status changed successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to change",
        description: err.message,
      });
    },
  });
// Get a particular order details
export const useGetOrderByID = (id) =>
  useQuery({
    queryKey: ["single_order", id],
    queryFn: () => Axios.get(`VendorOrder/${id}`),
  });

// Lets update order details
export const useUpdateOrder = () =>
  useMutation({
    mutationFn: (data) => Axios.put(`VendorOrder/${data.order_id}`, data),
    onSuccess: (res) => {
      notification.success({ message: "Your changes applied successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to update ",
        description: err.message,
      });
    },
  });

// Get managers
export const useGetManager = () =>
  useQuery({
    queryKey: ["vendorManager"],
    queryFn: () => Axios.get(`VendorManager`),
    onError: (err) => {
      console.log("We are  not able t get vendor manager", err.message);
    },
  });

// Get managers
export const useGetCarriers = () =>
  useQuery({
    queryKey: ["vendorCarriers"],
    queryFn: () => Axios.get(`VendorCarrier`),
    onError: (err) => {
      console.log("We are  not able t get vendor carriers", err.message);
    },
  });

// Getting Tweak Data
export const useGetTweakData = (id) =>
  useQuery({
    queryKey: ["tweak_information", id],
    queryFn: () => Axios.get(`VendorOrder/${id}?tweak_send_invoice=1`),
    refetchOnWindowFocus: false,
  });

// Update tweak  information

export const useUpdateTweak = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`VendorOrder/`, data),
    onSuccess: (res) => {
      notification.success({ message: "Send invoice successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to send ",
        description: err.message,
      });
    },
  });
// Getting call requests
export const useGetCallRequests = () =>
  useInfiniteQuery({ queryKey: ["call_requests"] });
