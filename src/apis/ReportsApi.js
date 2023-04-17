import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
import { apicall2 } from "../utils/apicall/apicall2";
const ITEM_PER_PAGE = 50;
// getting monthly order report
export const useGetMonthlyReport = (params) =>
  useInfiniteQuery({
    queryKey: ["monthly_order_report", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `MonthlyOrderReport?page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&order_id=${params.order_id}&status_id=${params.status_id}&user_type=${params.user_type}&usergroup_id=${params.usergroup_id}&time_from=${params.time_from}&time_to=${params.time_to}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (Object.values(lastPage?.data?.report || {})?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage.data?.search?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });
// Getting vendor transaction details
export const useGetVendorTransactionDetails = (params) =>
  useInfiniteQuery({
    queryKey: ["vendor_transaction_details", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `VendorTransactionDetail?isSearch=Y&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&vendor=${params.vendor}&time_from=${params.time_from}&time_to=${params.time_to}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.report?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage?.data?.search?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });
// getting  coupon voucher reports
export const useGetCouponVoucherReport = (params) =>
  useInfiniteQuery({
    queryKey: ["coupon_voucher_report", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `CouponVoucherReport?isSearch=Y&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&order_id=${params.order_id}&${params.date}&status_id=${params.status_id}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.report?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage?.data?.search?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });
// Getting gift cards
export const useGetGiftCards = (params) =>
  useInfiniteQuery({
    queryKey: ["gift_cards", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `GiftCardsReport?isSearch=Y&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&gift_card_number=${params.gift_card_number}&issued_time_from=${params.issued_time_from}&issued_time_to=${params.issued_time_to}&used_time_from=${params.used_time_from}&used_time_to=${params.used_time_to}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.report?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage?.data?.search?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });
// Getting order details
export const useGetOrderDetails = (params) =>
  useInfiniteQuery({
    queryKey: ["order_details", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `OrderDetailReport?isSearch=Y&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&order_id=${params.order_id}&vendor_name=${params.vendor_name}&shipping_customer_name=${params.shipping_customer_name}&${params.date}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.report?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage?.data?.search?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });
// Getting product count report
export const useGetProductCountReport = () =>
  useQuery({
    queryKey: ["vendor_count_report"],
    queryFn: () => apicall2({ preurl: `VendorCountReport` }),
    onError: (error) => console.log(error),
  });
