import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type Data<T> = T | null;
type ErrorType = AxiosError | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

type RequestInput = string | string[];

export const useApiRequest = <T>(input: RequestInput): Params<T[]> => {
  const [data, setData] = useState<Data<T[]>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        if (typeof input === "string") {
          const response = await axios.get<T>(input, { signal: controller.signal });
          setData([response.data]);
        } else {
          const requests = input.map((url) => axios.get<T>(url, { signal: controller.signal }));
          const results = await Promise.all(requests);
          setData(results.map((res) => res.data));
        }
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err as AxiosError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [JSON.stringify(input)]); 

  return { data, loading, error };
};
