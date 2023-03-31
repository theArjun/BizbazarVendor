import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useGetDashboardData = (params) =>
  useQuery({
    queryKey: ["dashboard", params],
    keepPreviousData: true,
    queryFn: () =>
      apicall({
        url: `Dashboard?${params}`,
      }),
  });
