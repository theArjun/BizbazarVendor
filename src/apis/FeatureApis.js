import { useQuery } from "@tanstack/react-query";
import Axios from "../config/apiConfig";
export const useGetFeatures = () =>
  useQuery({
    queryKey: ["features"],
    queryFn: () => Axios.get("features"),
    onError: (error) => console.log(error),
  });
