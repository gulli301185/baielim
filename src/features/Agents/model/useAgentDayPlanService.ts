import { IDayPlan, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const useAgentDayPlanService = () => {
  const axiosReq = useAxiosRequest();

  const { agentID } = useParams();
  const [dayPlans, setDayPlans] = useState<IDayPlan[]>([]);
  const [status, setStatus] = useState<Status>('initial');
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const getAgentDayPlans = async () => {
    try {
      setStatus('loading');

      const response = await axiosReq.get<{
        results: IDayPlan[];
        count: number;
      }>(`/user/dayPlan/?agent=${agentID}&ordering=day&page=${page}`);

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
    getAgentDayPlans();
  }, [agentID, page]);

  return { dayPlans, status, count, handleChangePage, page };
};

export default useAgentDayPlanService;
