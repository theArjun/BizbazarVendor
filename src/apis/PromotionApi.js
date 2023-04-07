import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
const ITEM_PER_PAGE = 50;
export const useUpdatePromotion = () =>
  useMutation((data) =>
    apicall({
      url: `Promotions`,
      method: "post",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": true,
      },
    })
  );
export const useDeletePromotions = () =>
  useMutation((data) =>
    apicall({
      url: `Promotions`,
      data: data,
      method: "delete",
    })
  );
export const useChangePromotionStatus = () =>
  useMutation((data) =>
    apicall({
      url: "StatusTool",
      data: data,
      method: "post",
    })
  );
export const useGetPromotions = () =>
  useInfiniteQuery({
    queryKey: ["promotions"],
    queryFn: ({ pageParam = 1 }) =>
      apicall({
        url: `Promotions?page=${pageParam}&items_per_page=${ITEM_PER_PAGE}`,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.promotions?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor = parseInt(lastPage.data?.params?.page) + 1);
    },
    refetchOnWindowFocus: false,
  });

export const useDeletePromotionImage = () =>
  useMutation((data) =>
    apicall({ url: `ImageUploads`, data: data, method: "delete" })
  );

export const useGetPromotionById = (id) =>
  useQuery({
    queryKey: ["single_promotion", id],
    queryFn: () =>
      apicall({
        url: `Promotions?promotion_id=${id}&extend[]=get_images&expand=1`,
      }),
    onSuccess: (res) => console.log(id),
  });

export const useGetPromotionProducts = () =>
  useQuery({
    queryKey: ["promotion_products"],
    queryFn: () => apicall({ url: `VendorProducts?get_short_list_only=1` }),
  });
export const useGetPromotionCategories = () =>
  useQuery({
    queryKey: ["promotion_categories"],
    queryFn: () =>
      apicall({
        url: `categories`,
      }),
  });

export const useGetPromotionUsers = () =>
  useQuery({
    queryKey: ["promotion_users"],
    queryFn: () =>
      apicall({
        url: `users`,
      }),
    onError: (error) => {
      console.log("Error occured", error);
    },
  });
