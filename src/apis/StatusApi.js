import { useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
export const useGetStatuses = () =>
  useQuery({
    queryKey: ["statuses"],
    queryFn: () => Axios.get("statuses"),
  });
