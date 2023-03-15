import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useGetMonthlyReport = () =>
  useQuery({
    queryKey: ["monthly_order_report"],
    queryFn: () =>
      apicall({
        url: `MonthlyOrderReport`,
      }),
  });
