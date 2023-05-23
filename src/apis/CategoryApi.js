import { useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
export const useGetCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => Axios.get(`categories?items_per_page=1000000`),
    refetchOnWindowFocus: false,
  });
