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
    refetchOnWindowFocus: false,
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
export const useGetCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      apicall({
        url: `ShippingMethod?countries=1`,
      }),
  });
export const useGetStates = () =>
  useQuery({
    queryKey: ["states"],
    queryFn: () =>
      apicall({
        url: `ShippingMethod?states=1`,
      }),
  });

export const useGetRecipient = () =>
  useQuery({
    queryKey: ["shipping_recipient"],
    queryFn: () =>
      apicall({
        url: `ShippingMethod?recipient=1`,
      }),
  });
export const useGetSender = () =>
  useQuery({
    queryKey: ["shipping_sender"],
    queryFn: () =>
      apicall({
        url: `ShippingMethod?sender=1`,
      }),
  });
export const useGetStoreFrontData = (id) =>
  useQuery({
    queryKey: ["storefronts"],
    queryFn: () =>
      apicall({
        url: `ShippingMethod/${id}?storefronts=1`,
      }),
  });
