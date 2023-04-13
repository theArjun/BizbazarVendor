import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
const ITEMS_PER_PAGE = 50;
export const useGetReviews = (params) =>
  useInfiniteQuery({
    queryKey: ["reviews", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `ProductReview?page=${pageParam}&items_per_page=${ITEMS_PER_PAGE}$name=${params.name}&rating=${params.rating}&message=${params.message}&has_images=${params.has_images}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.products?.length < ITEMS_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor =
        Number(pages.at(-1)?.data?.params?.page) + 1);
    },
  });
