import { useCallback, useState } from "react";
import { api } from "../utils/api";

interface HttpData {
  body?: any;
  params?: any;
}

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

const useHttp = () => {
  const [httpState, setHttpState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback(
    async (
      request: HttpMethod,
      url: string,
      data: HttpData = { body: null, params: null }
    ) => {
      setHttpState((prevState) => ({ ...prevState, loading: true }));

      try {
        let response;

        if (request === "get") {
          response = await api[request](url, { params: data.params });
        } else {
          response = await api[request](url, data.body, {
            params: data.params,
          });
        }

        setHttpState({ data: response.data, loading: false, error: null });
        return response.data;
      } catch (err: any) {
        setHttpState({ data: null, loading: false, error: err });
        throw err;
      }
    },
    []
  );

  return { sendRequest, ...httpState };
};

export default useHttp;
