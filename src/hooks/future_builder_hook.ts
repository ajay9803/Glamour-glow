import { useEffect, useState } from "react";

const useFutureBuilder = (url: string) => {
  console.log(url);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setData(null);
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 404) {
          const error = new Error(data.message);
          setError(error);
        } else {
          setData(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    isLoading,
    error,
    data,
  };
};

export default useFutureBuilder;
