import { useInfiniteQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
const ITEM_PER_PAGE = 50;
export const useGetLogs = (params) =>
  useInfiniteQuery({
    queryKey: ["logs", params],
    queryFn: ({ pageParam = 1 }) =>
      apicall({
        url: `Logs?isSearch=Y&period=${params.period}&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&time_from=${params.time_from}&time_to=${params.time_to}`,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.logs?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage.data?.search?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });
