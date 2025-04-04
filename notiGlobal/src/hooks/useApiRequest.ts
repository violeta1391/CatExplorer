import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type Data<T> = T | null;
type ErrorType = AxiosError | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

export const useApiRequest = <T>(url: string): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    axios
      .get<T>(url, { signal: controller.signal })
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

