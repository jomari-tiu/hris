import axios from "axios";
import { getCookie } from "cookies-next";
import { useQuery, useMutation, useQueryClient } from "react-query";

// const queryClient = useQueryClient();

export const usePost = (
  onSucces: any,
  onError: any,
  endpoint: string,
  id: boolean | string | number,
  toRefetchNameQuery: string,
  noHeader?: boolean
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: any) => {
      if (id) {
        payload._method = "PUT";
      }
      if (noHeader) {
        return axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${endpoint}${id ? `/${id}` : ""}`,
          payload
        );
      }
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}${id ? `/${id}` : ""}`,
        payload,
        {
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(toRefetchNameQuery);
        onSucces(response);
      },
      onError: onError,
    }
  );
};

export const usePostFile = (
  onSucces: any,
  onError: any,
  endpoint: string,
  update: boolean
) => {
  return useMutation(
    (payload: any) => {
      if (update) {
        payload._method = "PUT";
      }
      const formData = new FormData();
      const arrayData: any = [];
      const keys = Object.keys(payload);
      keys.forEach((key) => {
        arrayData.push({
          key: key,
          keyData: payload[key],
        });
      });
      arrayData.map(({ key, keyData }: any) => {
        formData.append(key, keyData);
      });

      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        }
      );
    },
    {
      onSuccess: onSucces,
      onError: onError,
    }
  );
};

export const useRemove = (
  onSucces: any,
  onError: any,
  endpoint: string,
  toRefetchNameQuery: string
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: any) => {
      return axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}/${id}`,
        {
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(toRefetchNameQuery);
        queryClient.invalidateQueries(`${toRefetchNameQuery}-archive`);
        onSucces();
      },
      onError: onError,
    }
  );
};

export const useFetch = (name: string, queryKey: any[], endpoint: string) => {
  return useQuery(
    queryKey,
    () => {
      return axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};
export const useFetchDetail = (name: string, endpoint: string, id: any) => {
  return useQuery(
    [name, id],
    () => {
      return axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}/${id}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      enabled: !!id,
    }
  );
};

export const restore = (onSuccess: any, onError: any, endpoint: string) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
    .then(function (response) {
      onSuccess(response);
    })
    .catch(function (error) {
      onError(error);
    });
};
