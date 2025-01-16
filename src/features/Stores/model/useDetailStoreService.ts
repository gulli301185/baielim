import { useGetStoreQuery } from '@/app/slices/storeApi';
import { useParams } from 'react-router-dom';

const useDetailStoreService = () => {
  const { storeID } = useParams();
  const { data, isFetching, isError, isLoading } = useGetStoreQuery(storeID);

  return { data, isFetching, isError, isLoading };
};

export default useDetailStoreService;
