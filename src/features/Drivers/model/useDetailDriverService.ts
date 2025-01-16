import { useGetDriverQuery } from '@/app/slices/driverApi';
import { useParams } from 'react-router-dom';

const useDetailDriverService = () => {
  const { driverID } = useParams();
  const { data, isFetching, isError, isLoading } = useGetDriverQuery(driverID);

  return { data, isFetching, isError, isLoading };
};

export default useDetailDriverService;
