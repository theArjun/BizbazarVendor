import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
const userInfo = JSON.parse(sessionStorage.getItem("userinfo"));
const ITEM_PER_PAGE = 50;
export const useGetCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => Axios.get(`categories?items_per_page=1000000`),
    refetchOnWindowFocus: false,
  });
export const useGetCategoryByID = (id) =>
  useQuery({
    queryKey: ["categories", id],
    queryFn: () => Axios.get(`CategoryData/${id}`),
    refetchOnWindowFocus: false,
  });
export const useGetNestedCategories = () =>
  useQuery({
    queryKey: ["VendorCategories"],
    queryFn: () => Axios.get(`VendorCategories?company_id=${userInfo.id}`),
    refetchOnWindowFocus: false,
  });
export const useGetCategoryProducts = (id, params) =>
  useInfiniteQuery({
    queryKey: ["category_products", id, params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `categories/${id}/products?page=${pageParam}&&items_per_page=${ITEM_PER_PAGE}&status=${params.status}&price_from=${params.price_from}&price_to=${params.price_to}&q=${params.product_name}&sort_order=${params.sort_order}&sort_by=${params.sort_by}`
      ),
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.products?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor =
        Number(pages.at(-1)?.data?.params?.page) + 1);
    },
  });
export const useGetCategoryFee = (id) =>
  useQuery({
    queryKey: ["CategoriesFee", id],
    queryFn: () => Axios.get(`CategoriesFee/${id}`),
    refetchOnWindowFocus: false,
  });
