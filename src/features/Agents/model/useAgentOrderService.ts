import { ICount, IFilter, IOrders, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';

const useAgentOrderService = (orderStatus: string) => {
  const axiosReq = useAxiosRequest();
  const { agentID } = useParams();

  const [orders, setOrders] = useState<IOrders[]>([]);
  const [countOrders, setCountOrders] = useState<ICount>();
  const [status, setStatus] = useState<Status>('initial');
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { handleSubmit, reset, control, getValues } = useForm();
  const values = getValues();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    store,
    driver,
    costType,
    start_date,
    end_date,
  }: FieldValues) => {
    handleChangePage(1);
    getAgentOrders({
      store: store?.id,
      driver: driver?.id,
      costType: costType?.id,
      start_date,
      end_date,
    });
  };

  const getAgentOrders = async ({
    store = '',
    driver = '',
    costType = '',
    start_date = '',
    end_date = '',
  }: IFilter) => {
    try {
      setStatus('loading');

      const response = await axiosReq.get<{
        results: IOrders[];
        count: number;
      }>(
        `/core/order/?agent=${agentID}&status=${orderStatus}` +
          `&store=${store}&driver=${driver}&costType=${costType}` +
          `&start_date=${start_date}&end_date=${end_date}&page=${page}`
      );

      const responseCount = await axiosReq.post('/core/count_orders/', {
        status: orderStatus,
        store: store || null,
        agent: agentID,
        driver: driver || null,
        paymentStatuses: null,
        costType: costType || null,
        start_date: start_date || null,
        end_date: end_date || null,
      });

      setCount(response.data.count);
      setCountOrders(responseCount.data);
      setOrders(response.data.results);
      setStatus('success');
    } catch (error) {
      setOrders([]);
      setStatus('error');
    }
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  const handleResetFields = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    reset({
      store: { label: '', id: '' },
      driver: { label: '', id: '' },
      costType: { label: '', id: '' },
      start_date: '',
      end_date: '',
    });
    getAgentOrders({});
  };

  useEffect(() => {
    getAgentOrders({
      store: values.store?.id || '',
      driver: values.driver?.id || '',
      costType: values.costType?.id || '',
      start_date: values.start_date || '',
      end_date: values.end_date || '',
    });
  }, [agentID, page]);

  return {
    page,
    open,
    count,
    orders,
    status,
    control,
    onSubmit,
    countOrders,
    handleSubmit,
    handleChangePage,
    handleResetFields,
  };
};

export default useAgentOrderService;
