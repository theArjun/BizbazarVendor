import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
const ITEMS_PER_PAGE = 50;
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
export const useGetSalesReportTableData = (report_id, table_id, params) => {
  return useQuery({
    queryKey: ["SingleReport", report_id, table_id, params],
    queryFn: () =>
      Axios.get(
        `SalesReport/${report_id}?table_id=${table_id}&count=${params.count}&begin=0`
      ),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
