import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import Axios from "../config/apiConfig";
export const useGetShippingMethods = () => {
  let items_per_page = 50;
  try {
    return useInfiniteQuery({
      queryKey: ["shippings"],
      queryFn: ({ pageParam = 1 }) =>
        Axios.get(
          `ShippingMethod?page=${pageParam}&items_per_page=${items_per_page}`
        ),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        const hasMore = pages?.at(-1)?.data?.shippings?.length;
        if (hasMore < items_per_page) return;
        const nextPage = parseInt(lastPage?.data?.params?.page) + 1;
        return (lastPage.nextCursor = nextPage);
      },
    });
  } catch (err) {
    console.log("Something went wrong! ", err.message);
  }
};
export const useCreateShippingMethods = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`ShippingMethod`, data),
    onSuccess: (res) => {
      notification.success({ message: "Shipping method created successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to create. ",
        description: err.message,
      });
    },
  });
export const useGetShippingMethodByID = (id) =>
  useQuery({
    queryKey: ["single_shipping_method", id],
    refetchOnWindowFocus: false,
    queryFn: () => Axios.get(`ShippingMethod/${id}`),
  });

// Deleting shipping method
export const useDeleteShippingMethod = () =>
  useMutation({
    mutationFn: (data) => Axios.delete(`ShippingMethod/`, { data: data }),
    onSuccess: (res) => {
      notification.success({ message: "Shipping method deleted successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to delete. ",
        description: err.message,
      });
    },
  });

// Changing status of shipping method
export const useChangeShippingMethodStatus = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`StatusTool/`, data),
    onSuccess: (res) => {
      notification.success({
        message: "Shipping method status changed successfully",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to change status. ",
        description: err.message,
      });
    },
  });
export const useGetCarriers = () =>
  useQuery({
    queryKey: ["carriers"],
    queryFn: () => Axios.get(`ShippingMethod?carriers=1`),
    refetchOnWindowFocus: false,
  });
// Getting  vendor carriers
export const useGetVendorCarriers = () =>
  useQuery({
    queryKey: ["vendor_carriers"],
    queryFn: () => Axios.get(`VendorCarrier`),
    refetchOnWindowFocus: false,
  });
export const useUpdateShippingMethod = () => {
  return useMutation({
    mutationFn: (data) => Axios.post(`ShippingMethod`, data),
    onSuccess: (res) => {
      notification.success({ message: "Shipping method updated successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to update. ",
        description: err.message,
      });
    },
  });
};
export const useGetCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: () => Axios.get(`ShippingMethod?countries=1`),
    refetchOnWindowFocus: false,
  });
export const useGetStates = () =>
  useQuery({
    queryKey: ["states"],
    queryFn: () => Axios.get(`ShippingMethod?states=1`),
    refetchOnWindowFocus: false,
  });

export const useGetRecipient = () =>
  useQuery({
    queryKey: ["shipping_recipient"],
    queryFn: () => Axios.get(`ShippingMethod?recipient=1`),
    refetchOnWindowFocus: false,
  });
export const useGetSender = () =>
  useQuery({
    queryKey: ["shipping_sender"],
    queryFn: () => Axios.get(`ShippingMethod?sender=1`),
    refetchOnWindowFocus: false,
  });
export const useGetStoreFrontData = (id) =>
  useQuery({
    queryKey: ["storefronts"],
    queryFn: () => Axios.get(`ShippingMethod/${id}?storefronts=1`),
    refetchOnWindowFocus: false,
  });
