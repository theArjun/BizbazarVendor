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
