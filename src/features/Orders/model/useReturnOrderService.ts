import { IOrderReturn, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const useReturnOrderService = () => {
  const { orderID } = useParams();
  const axiosReq = useAxiosRequest();

  const [returnOrder, setReturnOrder] = useState<IOrderReturn[]>([]);
  const [status, setStatus] = useState<Status>('initial');
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const getOrderReturn = async () => {
    setStatus('loading');
    try {
      const response = await axiosReq.get<{
        results: IOrderReturn[];
        count: number;
      }>(`/core/return_order/?order=${orderID}`);

      setCount(response.data.count);
      setReturnOrder(response.data.results);
      setStatus('success');
    } catch (error) {
      setReturnOrder([]);
      setStatus('error');
      toastError('Возникла ошибка. Пожалуйста, повторите попытку позже');
    }
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  useEffect(() => {
    getOrderReturn();
  }, [orderID]);

  return {
    page,
    count,
    status,
    returnOrder,
    handleChangePage,
  };
};

export default useReturnOrderService;
