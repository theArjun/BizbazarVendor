import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { notification } from "antd";
import Axios from "../config/apiConfig";
const ITEM_PER_PAGE = 50;
// Getting orders
export const useGetCallRequests = (params) =>
  useInfiniteQuery({
    queryKey: ["call_requests", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `call_requests?isSearch=Y&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&name=${params.name}&id=${params.id}&phone=${params.phone}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.call_requests?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor =
        Number(pages.at(-1)?.data?.params?.page) + 1);
    },
  });
