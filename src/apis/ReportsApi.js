import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useGetMonthlyReport = (params) =>
  useQuery({
    queryKey: ["monthly_order_report", params],
    queryFn: () =>
      apicall({
        url: `MonthlyOrderReport?order_id=${params.order_id}&status_id=${params.status_id}&user_type=${params.user_type}&usergroup_id=${params.usergroup_id}&time_from=${params.time_from}&time_to=${params.time_to}`,
      }),
  });
export const useGetVendorTransactionDetails = (params) =>
  useQuery({
    queryKey: ["vendor_transaction_details", params],
    queryFn: () =>
      apicall({
        url: `VendorTransactionDetail?vendor=${params.vendor}&time_from=${params.time_from}&time_to=${params.time_to}`,
      }),
  });
export const useGetCouponVoucherReport = (params) =>
  useQuery({
    queryKey: ["coupon_voucher_report", params],
    queryFn: () =>
      apicall({
        url: `CouponVoucherReport?isSearch=Y&page=${params.page}&items_per_page=20&order_id=${params.order_id}&${params.date}&status_id=${params.status_id}`,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
export const useGetGiftCards = (params) =>
  useQuery({
    queryKey: ["gift_cards", params],
    queryFn: () =>
      apicall({
        url: `GiftCardsReport?isSearch=Y&gift_card_number=${params.gift_card_number}&issued_time_from=${params.issued_time_from}&issued_time_to=${params.issued_time_to}&used_time_from=${params.used_time_from}&used_time_to=${params.used_time_to}`,
      }),
  });
export const useGetOrderDetails = (params) =>
  useQuery({
    queryKey: ["order_details", params],
    queryFn: () =>
      apicall({
        url: `OrderDetailReport?order_id=${params.order_id}&vendor_name=${params.vendor_name}&shipping_customer_name=${params.shipping_customer_name}&${params.date}`,
      }),
  });
