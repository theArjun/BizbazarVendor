import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";

export const useGetCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => apicall({ url: `categories` }),
    onError: (error) => console.log(error),
  });
