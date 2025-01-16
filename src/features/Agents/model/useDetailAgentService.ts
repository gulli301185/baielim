import { useGetAgentQuery } from '@/app/slices/agentApi';
import { useParams } from 'react-router-dom';

const useDetailAgentService = () => {
  const { agentID } = useParams();
  const { data, isFetching, isError, isLoading } = useGetAgentQuery(agentID);

  return { data, isFetching, isError, isLoading };
};

export default useDetailAgentService;
