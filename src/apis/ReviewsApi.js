import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
const useGetReviews = (params) =>
  useInfiniteQuery({
    queryKey: ["reviews", params],
    queryFn: () => apicall({ url: ``, method: "get" }),
  });
