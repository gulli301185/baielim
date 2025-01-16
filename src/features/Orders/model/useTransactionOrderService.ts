import { ITransactionOrder, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';

type Props = {
  store?: number | string;
};

const useTransactionOrderService = () => {
  const { orderID } = useParams();
  const axiosReq = useAxiosRequest();

  const [transactionOrder, setTransactionOrder] = useState<ITransactionOrder[]>(
    []
  );
  const [status, setStatus] = useState<Status>('initial');
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { handleSubmit, reset, control, getValues } = useForm();
  const values = getValues();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    store,
  }: FieldValues) => {
    handleChangePage(1);
    getTransactionOrder({
      store: store.id,
    });
  };

  const getTransactionOrder = async ({
    store = values.store?.id || '',
  }: Props) => {
    setStatus('loading');

    try {
      const response = await axiosReq.get<{
        results: ITransactionOrder[];
        count: number;
      }>(
        `/core/transactionOrder/?order=${orderID}&store=${store}&page=${page}`
      );

      setCount(response.data.count);
      setTransactionOrder(response.data.results);
      setStatus('success');
    } catch (error) {
      setTransactionOrder([]);
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
    });
    getTransactionOrder({});
  };

  useEffect(() => {
    getTransactionOrder({
      store: values.store?.id || '',
    });
  }, [page]);

  return {
    page,
    count,
    status,
    control,
    onSubmit,
    handleSubmit,
    transactionOrder,
    handleChangePage,
    handleResetFields,
  };
};

export default useTransactionOrderService;
