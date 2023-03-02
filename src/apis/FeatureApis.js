import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useGetFeatures = () =>
  useQuery({
    queryKey: ["features"],
    queryFn: () =>
      apicall({
        url: `features`,
      }),
    onError: (error) => console.log(error),
  });
