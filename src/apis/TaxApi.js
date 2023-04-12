import { useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";

export const useGetTaxes = () =>
  useQuery({
    queryKey: ["taxes"],
    queryFn: () => Axios.get("taxes"),
    refetchOnWindowFocus: false,
  });
