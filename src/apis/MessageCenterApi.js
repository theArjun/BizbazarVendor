import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";

export const getVendorAdminMessages = (data) =>
  useQuery({
    queryKey: ["admin_messages", data],
    queryFn: () =>
      apicall({
        url: `MessageCenter?communication_type=vendor_to_admin&period=C&time_from=${data.time_from}&time_to=${data.time_to}`,
      }),
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
export const getVendorCustomerMessages = (data) =>
  useQuery({
    queryKey: ["customer_messages", data],
    queryFn: () =>
      apicall({
        url: `MessageCenter?communication_type=vendor_to_customer&period=C&customer_name=${data.customer_name}&time_from=${data.time_from}&time_to=${data.time_to}`,
      }),
  });

export const getCustomerMessageThread = (id) =>
  useQuery({
    queryKey: ["customer_messages", id],
    queryFn: () =>
      apicall({
        url: `MessageCenter?communication_type=vendor_to_customer&thread_id=${id}`,
      }),
  });
