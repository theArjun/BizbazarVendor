import { useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
export const useGetCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => Axios.get(`categories`),
  });
