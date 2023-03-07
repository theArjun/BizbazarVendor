import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useAddProduct = () =>
  useMutation((data) =>
    apicall({
      method: "post",
      url: "BulkProducts",
      data,
    })
  );
export const useGetProducts = (url) =>
  useQuery({
    queryKey: ["products", url],
    queryFn: () => apicall({ url: url }),
  });

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["single_product", id],
    queryFn: () => apicall({ url: `products/${id}` }),
    onSuccess: (re) => console.log("refetch"),
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
    onError:(err)=> console.log(err)
  });
