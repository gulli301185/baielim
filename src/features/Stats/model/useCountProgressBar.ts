import { ITotalCountOfOrders } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useEffect, useState } from 'react';

const useCountProgressBar = () => {
  const axiosReq = useAxiosRequest();

  const [stats, setStats] = useState<ITotalCountOfOrders>();

  const getTotalCountOfOrders = async () => {
    try {
      const response = await axiosReq.get<ITotalCountOfOrders>(
        'core/totalCount_of_orders/'
      );
      setStats(response.data);
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  useEffect(() => {
    getTotalCountOfOrders();
  }, []);

  return { stats };
};

export default useCountProgressBar;
