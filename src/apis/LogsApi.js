import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useGetLogs = (params) =>
  useQuery({
    queryKey: ["logs", params],
    keepPreviousData: true,
    queryFn: () =>
      apicall({
        url: `Logs?${params}`,
      }),
  });
