import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { fetchAllStoreCoordinates, IStoreCoordinate } from './fetchAllData';

const useMapStoreService = () => {
  const axiosReq = useAxiosRequest();
  const [allData, setAllData] = useState<IStoreCoordinate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllStoreCoordinates(axiosReq);
        setAllData(data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { allData, loading, error };
};

export default useMapStoreService;
