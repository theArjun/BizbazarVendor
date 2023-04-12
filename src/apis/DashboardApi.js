import { useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
export const useGetDashboardData = (params) =>
  useQuery({
    queryKey: ["dashboard", params],
    keepPreviousData: true,
    queryFn: () => Axios.get(`Dashboard?${params}`),
  });
