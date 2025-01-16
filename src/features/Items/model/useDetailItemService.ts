import { useGetItemQuery } from '@/app/slices/itemApi';
import { useParams } from 'react-router-dom';

const useDetailItemService = () => {
  const { itemID } = useParams();
  const {
    data: item,
    isFetching,
    isError,
    isLoading,
  } = useGetItemQuery(itemID);

  return { item, isFetching, isError, isLoading };
};

export default useDetailItemService;
