import { IStoreDayPlan, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const useStoreDayPlanService = () => {
  const axiosReq = useAxiosRequest();

  const { storeID } = useParams();
  const [dayPlans, setDayPlans] = useState<IStoreDayPlan[]>([]);
  const [status, setStatus] = useState<Status>('initial');
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const getStoreDayPlans = async () => {
    try {
      setStatus('loading');

      const response = await axiosReq.get<{
        results: IStoreDayPlan[];
        count: number;
      }>(`/user/storePlan/?store=${storeID}&page=${page}`);

      setCount(response.data.count);
      setDayPlans(response.data.results);
      setStatus('success');
    } catch (error) {
      setDayPlans([]);
      setStatus('error');
    }
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  useEffect(() => {
    getStoreDayPlans();
  }, [storeID, page]);

  return { dayPlans, status, count, handleChangePage, page };
};

export default useStoreDayPlanService;
