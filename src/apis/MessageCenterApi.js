import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
const ITEM_PER_PAGE = 5;
export const getVendorAdminMessages = (data) =>
  useInfiniteQuery({
    queryKey: ["admin_messages", data],
    queryFn: ({ pageParam = 1 }) =>
      apicall({
        url: `MessageCenter?page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&communication_type=vendor_to_admin&period=C&time_from=${data.time_from}&time_to=${data.time_to}`,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (
        Object.values(lastPage?.data?.threads || {})?.length < ITEM_PER_PAGE
      ) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage?.data?.search?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });

export const getMessageThread = (id) =>
  useQuery({
    queryKey: ["admin_messages", id],
    queryFn: () =>
      apicall({
        url: `MessageCenter?communication_type=vendor_to_admin&thread_id=${id}`,
      }),
  });
export const useCreateAdminMessage = () =>
  useMutation((data) =>
    apicall({ url: `MessageCenter`, method: "post", data: data })
  );
// This function is used to send both customer and admin message
export const useSendAdminMessage = () =>
  useMutation((data) =>
    apicall({
      url: `MessageCenter/${data.message.thread_id}`,
      method: "put",
      data: data,
    })
  );
// getting customer messages
export const getVendorCustomerMessages = (data) =>
  useInfiniteQuery({
    queryKey: ["customer_messages", data],
    queryFn: ({ pageParam = 1 }) =>
      apicall({
        url: `MessageCenter?page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&communication_type=vendor_to_customer&period=C&customer_name=${data.customer_name}&time_from=${data.time_from}&time_to=${data.time_to}`,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (
        Object.values(lastPage?.data?.threads || {})?.length < ITEM_PER_PAGE
      ) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage?.data?.search?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });

export const getCustomerMessageThread = (id) =>
  useQuery({
    queryKey: ["customer_messages", id],
    queryFn: () =>
      apicall({
        url: `MessageCenter?communication_type=vendor_to_customer&thread_id=${id}`,
      }),
  });
