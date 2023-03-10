import { useMutation, useQuery } from "@tanstack/react-query";
import { apicall } from "../utils/apicall/apicall";

export const useGetThemes = () =>
  useQuery({
    queryKey: ["themes"],
    queryFn: () => apicall({ url: `Themes` }),
    onError: (err) => console.log(err),
  });

  export const useUpdateTheme = () =>
  useMutation((data) =>
    apicall({
      url: `Themes`,
      method: "post",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": true,
      },
    })
  );