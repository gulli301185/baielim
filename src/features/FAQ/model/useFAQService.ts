import { useGetFAQQuery } from '@/app/slices/faqApi';
import { useSearchParams } from 'react-router-dom';

const useFAQService = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError, isFetching } = useGetFAQQuery(page);

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  return { data, isLoading, isError, isFetching, handleChangePage, page };
};

export default useFAQService;
