'use client'

import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import Dashboard from "./Dashboard"

export default function Page() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://manaopili-dashboard.vercel.app/api/dashboard/");
      setData(response?.data?.data || []);
      setError(null);
    } catch (err) {
      console.error('Data fetch error:', err);
      setError(err.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  fetchReseter = () => {
    const data = axios.get('https://manaopili-backend.onrender.com/')
    return data
  }

  useEffect(() => {
    const controller = new AbortController();
    
    const startPeriodicFetch = () => {
      fetchData();

      const intervalId = setInterval(fetchReseter, 10000);
      
      return () => {
        clearInterval(intervalId);
        controller.abort();
      };
    };

    const cleanup = startPeriodicFetch();
    
    return () => {
      cleanup();
    };
  }, [fetchData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <Dashboard data={data.length ? data : []} />
    </div>
  )
}