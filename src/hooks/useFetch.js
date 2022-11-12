import { useState, useEffect, useCallback } from "react";
import axios from "axios";



function useFetch(pageNumber) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const apiURL='http://localhost:5000/public/api/v1/questions/';

  const sendQuery = useCallback(async (pageNumber) => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(apiURL+pageNumber);
      setHasMore(res.data.length > 0);
      setList((prev) => [...prev, ...res.data]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    sendQuery(pageNumber);
  }, [pageNumber]);

  return { loading, error, list, hasMore };
}

export default useFetch;

