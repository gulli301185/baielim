import { IOrderHistory, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const useOrderHistoryOrderService = () => {
  const { orderID } = useParams();
  const axiosReq = useAxiosRequest();

  const [history, setHistory] = useState<IOrderHistory[]>([]);
  const [status, setStatus] = useState<Status>('initial');
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const getOrderHistory = async () => {
    setStatus('loading');
    try {
      const response = await axiosReq.get<{
        results: IOrderHistory[];
        count: number;
      }>(`/core/orderHistory/?order=${orderID}`);

      setCount(response.data.count);
      setHistory(response.data.results);
      setStatus('success');
    } catch (error) {
      setHistory([]);
      setStatus('error');
      toastError('Возникла ошибка. Пожалуйста, повторите попытку позже');
    }
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  useEffect(() => {
    getOrderHistory();
  }, [orderID]);

  return {
    page,
    count,
    status,
    history,
    handleChangePage,
  };
};

export default useOrderHistoryOrderService;
