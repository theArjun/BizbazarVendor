import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";
export const useGetLogs = (params) =>
  useQuery({
    queryKey: ["logs", params],
    queryFn: () =>
      apicall({
        url: `Logs?isSearch=Y&period=${params.period}&page=${params.page}&time_from=${params.time_from}&time_to=${params.time_to}`,
      }),
  });
