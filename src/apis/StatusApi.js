import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useGetStatuses = () =>
  useQuery({
    queryKey: ["statuses"],
    queryFn: () =>
      apicall({
        url: `statuses`,
      }),
  });
