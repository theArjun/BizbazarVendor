import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import Axios from "../config/apiConfig";
const ITEMS_PER_PAGE = 50;
export const useGetReviews = (params) =>
  useInfiniteQuery({
    queryKey: ["reviews", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `ProductReview?page=${pageParam}&items_per_page=${ITEMS_PER_PAGE}&name=${params.name}&rating=${params.rating}&message=${params.message}&has_images=${params.has_images}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (Object.values(lastPage?.data?.reviews).length < ITEMS_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor =
        Number(pages.at(-1)?.data?.params?.page) + 1);
    },
  });
export const useGetReviewByID = (id) =>
  useQuery({
    queryKey: ["single_review", id],
    queryFn: () => Axios.get(`ProductReview?product_review_id=${id}`),
  });
export const useUpdateReply = () =>
  useMutation({
    mutationFn: (data) =>
      Axios.put(
        `ProductReview/${data.product_review_data.product_review_id}`,
        data
      ),
    onSuccess: (res) => {
      notification.success({ message: "Reply updated successfully!" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to  reply",
        description: err.message,
      });
    },
  });
