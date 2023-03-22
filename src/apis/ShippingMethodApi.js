import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";

export const useGetShippingMethods = () => {
  let items_per_page = 30;
  try {
    return useInfiniteQuery({
      queryKey: ["shippings"],
      queryFn: ({ pageParam = 1 }) =>
        apicall({
          url: `ShippingMethod?page=${pageParam}&items_per_page=${items_per_page}`,
        }),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        const hasMore = pages?.at(-1)?.data?.shippings?.length;
        if (hasMore < items_per_page) return;
        const nextPage = parseInt(lastPage?.data?.params?.page) + 1;
        return (lastPage.nextCursor = nextPage);
      },
    });
  } catch (err) {
    console.log("Something went wrong! ", err.message);
  }
};
export const useCreateShippingMethods = () =>
  useMutation((data) =>
    apicall({
      url: `ShippingMethod`,
      method: "post",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": true,
      },
    })
  );
export const useGetShippingMethodByID = (id) =>
  useQuery({
    queryKey: ["single_shipping_method", id],
    queryFn: () =>
      apicall({
        url: `ShippingMethod/${id}`,
      }),
  });

export const useGetCarriers = () =>
  useQuery({
    queryKey: ["carriers"],
    queryFn: () =>
      apicall({
        url: `ShippingMethod?carriers=1`,
      }),
  });

export const useUpdateShippingMethod = () => {
  return useMutation((data) =>
    apicall({
      url: `ShippingMethod`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": true,
      },
    })
  );
};
