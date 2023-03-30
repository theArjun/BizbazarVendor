import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useGetDashboardData = () =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: () => apicall({ url: `Dashboard` }),
  });
