import { useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
const userInfo = JSON.parse(localStorage.getItem("userinfo"));
export const useGetCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => Axios.get(`categories?items_per_page=1000000`),
    refetchOnWindowFocus: false,
  });
export const useGetCategoryByID = (id) =>
  useQuery({
    queryKey: ["categories", id],
    queryFn: () => Axios.get(`categories/${id}`),
    refetchOnWindowFocus: false,
  });
export const useGetNestedCategories = () =>
  useQuery({
    queryKey: ["VendorCategories"],
    queryFn: () => Axios.get(`VendorCategories?company_id=${userInfo.id}`),
    refetchOnWindowFocus: false,
  });
