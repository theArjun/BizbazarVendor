import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
const ITEM_PER_PAGE = 50;
export const useAddProduct = () =>
  useMutation((data) =>
    apicall({
      method: "post",
      url: "BulkProducts",
      data,
    })
  );
export const useGetProducts = (params) =>
  useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam = 1 }) =>
      apicall({
        url: `products?page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&status=${params.status}&q=${params.product_name}&cid=${params.category}&price_from=${params.price_from}&price_to=${params.price_to}&sort_order=${params.sort_order}&sort_by=${params.sort_by}`,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.products?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor =
        Number(pages.at(-1)?.data?.params?.page) + 1);
    },
  });
// Delete single product
export const useDeleteSingleProduct = () =>
  useMutation((id) => apicall({ method: "delete", url: `products/${id}` }));
// Delete bulk products
export const useDeleteBulkProducts = () =>
  useMutation((data) =>
    apicall({ method: "delete", url: `BulkProducts`, data: data })
  );
// ChangeProductStatus
export const useUpdateProductStatus = () =>
  useMutation((data) =>
    apicall({
      method: "put",
      url: `products/${data?.id}`,
      data: {
        status: data?.status,
      },
    })
  );

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["single_product", id],
    queryFn: () => apicall({ url: `products/${id}` }),
  });
export const useUpdateProduct = () =>
  useMutation((data) =>
    apicall({
      url: `VendorProducts/${data.product_id}`,
      method: "put",
      data: data,
    })
  );
//  for seo tab
export const useGetSeoPath = (id) =>
  useQuery({
    queryKey: ["seo_path"],
    queryFn: () => apicall({ url: `products/${id}/ProductSeo` }),
    onError: (error) => console.log(error),
  });
export const useUpdateSeoPath = () =>
  useMutation((data) =>
    apicall({ url: `products/${data.id}`, data: data.data, method: "put" })
  );

// for quantity discounts
export const useUpdateDiscounts = () =>
  useMutation((data) =>
    apicall({ url: `products/${data.id}`, data: data.data, method: "put" })
  );

// for review
export const useGetProductReviews = (id) =>
  useQuery({
    queryKey: ["product_reviews", id],
    queryFn: () => apicall({ url: `ProductReview?product_id=${id}` }),
  });
// get product Features

export const useGetProductFeatures = (id) =>
  useQuery({
    queryKey: ["product_features", id],
    queryFn: () => apicall({ url: `products/${id}/ProductFeature` }),
    onError: (err) => console.log(err),
  });
// Function  for bulk addition
export const useCreateBulkProducts = () =>
  useMutation((data) =>
    apicall({ url: `BulkProducts`, data: data, method: "post" })
  );
