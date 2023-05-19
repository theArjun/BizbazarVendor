import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { notification } from "antd";
import Axios from "../config/apiConfig";
const ITEM_PER_PAGE = 50;
// Getting list of  available shipments
export const useGetShipments = (params) =>
  useInfiniteQuery({
    queryKey: ["shipments", params],
    queryFn: ({ pageParam = 1 }) =>
      Axios.get(
        `shipments?isSearch=Y&page=${pageParam}&items_per_page=${ITEM_PER_PAGE}&cname=${params?.cname}&order_id=${params?.order_id}&is_full_shipped=${params?.full_order_shipment}&status=${params?.status}&sort_by=${params?.sort_by}&sort_order=${params?.sort_order}`
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.shipments?.length < ITEM_PER_PAGE) {
        return;
      }
      return (lastPage.nextCursor =
        Number(pages.at(-1)?.data?.params?.page) + 1);
    },
  });
// Getting single shipment using id params
export const useGetSingleShipment = (id) =>
  useQuery({
    queryKey: ["single_shipment"],
    queryFn: () => Axios.get(`shipments/${id}`),
  });
