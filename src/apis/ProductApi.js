import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
import { notification } from "antd";
const ITEM_PER_PAGE = 50;
export const useAddProduct = () =>
  useMutation({
    mutationFn: (data) => Axios.post(`BulkProducts`, data),
    onSuccess: (res) => {
      notification.success({ message: "Product added successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to add",
        description: err.message,
      });
    },
  });
export const useGetProducts = (params) =>
  useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `products?page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&status=${params.status}&q=${params.product_name}&cid=${params.category}&price_from=${params.price_from}&price_to=${params.price_to}&sort_order=${params.sort_order}&sort_by=${params.sort_by}`
      ),
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
  useMutation({
    mutationFn: (id) => Axios.delete(`products/${id}`),
    onSuccess: (res) => {
      notification.success({ message: "Product deleted successfully!" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to delete",
        description: err.message,
      });
    },
  });
// Delete bulk products
export const useDeleteBulkProducts = () =>
  useMutation({
    mutationFn: (data) => {
      return Axios.delete(`BulkProducts`, { data: data });
    },
    onSuccess: (res) => {
      notification.success({ message: "Products deleted successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to delete",
        description: err.message,
      });
    },
  });
// ChangeProductStatus
export const useUpdateProductStatus = () =>
  useMutation({
    mutationFn: (data) =>
      Axios.put(`products/${data?.id}`, {
        status: data?.status,
      }),
    onSuccess: (res) => {
      notification.success({
        message: "Status have been changed successfully",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to  change status",
        description: err.message,
      });
    },
  });

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["single_product", id],
    queryFn: () => Axios.get(`products/${id}`),
  });
export const useUpdateProduct = () =>
  useMutation({
    mutationFn: (data) => Axios.put(`VendorProducts/${data.product_id}`, data),
    onSuccess: (res) => {
      notification.success({ message: "Changes have been saved successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to update product",
        description: err.message,
      });
    },
  });
//  for seo tab
export const useGetSeoPath = (id) =>
  useQuery({
    queryKey: ["seo_path"],
    queryFn: () => Axios.get(`products/${id}/ProductSeo`),
  });
// update function for updating seo path
export const useUpdateSeoPath = () =>
  useMutation({
    mutationFn: (data) => Axios.put(`products/${data.id}`, data.data),
    onSuccess: (res) => {
      notification.success({
        message: "Changes have been saved successfully!",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to update",
        description: err.message,
      });
    },
  });

// for quantity discounts
export const useUpdateDiscounts = () =>
  useMutation({
    mutationFn: (data) => Axios.put(`products/${data.id}`, data.data),
    onSuccess: (res) => {
      notification.success({
        message: "Changes have been saved successfully!",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to update",
        description: err.message,
      });
    },
  });

// for review
export const useGetProductReviews = (id) =>
  useQuery({
    queryKey: ["product_reviews", id],
    queryFn: () => Axios.get(`ProductReview?product_id=${id}`),
  });
// get product Features

export const useGetProductFeatures = (id) =>
  useQuery({
    queryKey: ["product_features", id],
    queryFn: () => Axios.get(`products/${id}/ProductFeature`),
  });
// Function  for bulk addition
export const useCreateBulkProducts = () =>
  useMutation({
    mutationKey: ["add_bulk_products"],
    mutationFn: (data) => Axios.post(`BulkProducts`, data),
    onSuccess: (res) => {
      notification.success({ message: "Products added successfully" });
    },
    onError: (err) => {
      notification.error({
        message: "Failed to add",
        description: err.message,
      });
    },
  });
