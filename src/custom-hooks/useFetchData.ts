import { useState, useEffect } from 'react';
import { getProtected } from '../server-calls/get-protected'

export const useGetData = (token: string) => {
  const [data, setData] = useState<any>([]);

  async function handleDataFetch () {
    const result = await getProtected(token);
    console.log(result.user)
    setData(result.user[0]);
  }

  useEffect(() => {
    handleDataFetch();
  }, [])
  
  return {data, getData:handleDataFetch}
}