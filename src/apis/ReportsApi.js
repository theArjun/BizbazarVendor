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
