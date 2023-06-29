import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
export const useGetSalesReport = () =>
  useQuery({
    queryKey: ["SalesReport"],
    queryFn: () => Axios.get("SalesReport"),
    refetchOnWindowFocus: false,
  });
export const useGetSingleSalesReport = (id) => {
  return useQuery({
    queryKey: ["SingleReport", id],
    queryFn: () => Axios.get(`SalesReport/${id}`),
    refetchOnWindowFocus: false,
  });
};
export const useGetSalesReportTableData = (report_id, table_id) => {
  return useQuery({
    queryKey: ["SingleReport", report_id, table_id],
    queryFn: () =>
      Axios.get(
        `SalesReport/${report_id}?table_id=${table_id}&page=1&items_per_page=10`
      ),
    refetchOnWindowFocus: false,
  });
};
