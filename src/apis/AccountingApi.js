import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
import { notification } from "antd";
const ITEM_PER_PAGE = 50;
// getting userInformation
let { id } = JSON.parse(sessionStorage.getItem("userinfo"));
// Getting Accounting transaction  data
export const useGetTransactions = (params) =>
  useInfiniteQuery({
    queryKey: ["transactions", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `BizbazarAccounting/${id}?page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&payout_type=${params.payout_type}&approval_status=${params.approval_status}&time_from=${params.time_from}&time_to=${params.time_to}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = pages.length + 1);
    },
  });
// Getting Accounting withdrawal  data
export const useGetWithdrawals = (params) =>
  useInfiniteQuery({
    queryKey: ["withdrawals", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `BizbazarAccounting/${id}?is_search=Y&selected_section=withdrawals&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&approval_status=${params.approval_status}&time_from=${params.time_from}&time_to=${params.time_to}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = pages.length + 1);
    },
  });
export const useCreateNewWithdrawal = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`BizbazarAccounting`, data),
    onSuccess: (res) => {
      notification.success({ message: "withdrawal created successfully!" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to create",
        description: err.message,
      });
    },
  });
