import { useIsFetching } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";

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
