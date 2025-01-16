import { ICount, IFilter, IOrders, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';

const useStoreOrderService = (orderStatus: string) => {
  const axiosReq = useAxiosRequest();
  const { storeID } = useParams();

  const [orders, setOrders] = useState<IOrders[]>([]);
  const [countOrders, setCountOrders] = useState<ICount>();
  const [status, setStatus] = useState<Status>('initial');
  const [count, setCount] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { handleSubmit, reset, control, getValues } = useForm();
  const values = getValues();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    agent,
    driver,
    costType,
    start_date,
    end_date,
  }: FieldValues) => {
    handleChangePage(1);
    getStoreOrders({
      agent: agent?.id,
      driver: driver?.id,
      costType: costType?.id,
      start_date,
      end_date,
    });
  };

  const getStoreOrders = async ({
    agent = '',
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
        `/core/order/?agent=${agent}&status=${
          orderStatus === 'debt' ? 'new' : orderStatus
        }${
          orderStatus === 'debt' ? '&paymentStatuses=half%2C+not_paid' : ''
        }&store=${storeID}&driver=${driver}&costType=${costType}
        &start_date=${start_date}&end_date=${end_date}&ordering=${
          orderStatus === 'debt' ? 'dateCreated' : '-dateCreated'
        }&page=${page}`
      );

      const responseCount = await axiosReq.post('/core/count_orders/', {
        status: orderStatus === 'debt' ? 'new' : orderStatus,
        store: storeID,
        agent: agent || null,
        driver: driver || null,
        paymentStatuses: orderStatus === 'debt' ? 'half,not_paid' : null,
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
      agent: { label: '', id: '' },
      driver: { label: '', id: '' },
      costType: { label: '', id: '' },
      start_date: '',
      end_date: '',
    });
    getStoreOrders({});
  };

  useEffect(() => {
    getStoreOrders({
      agent: values.agent?.id || '',
      driver: values.driver?.id || '',
      costType: values.costType?.id || '',
      start_date: values.start_date || '',
      end_date: values.end_date || '',
    });
  }, [storeID, page]);

  return {
    page,
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

export default useStoreOrderService;
