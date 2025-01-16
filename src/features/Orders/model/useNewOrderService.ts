import { ICount, IFilter, IOrders, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const useNewOrderService = () => {
  const axiosReq = useAxiosRequest();

  const [orders, setOrders] = useState<IOrders[]>([]);
  const [countOrders, setCountOrders] = useState<ICount | null>(null);
  const [status, setStatus] = useState<Status>('initial');
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState(false);
  const [count, setCount] = useState(0);
  const [orderID, setOrderID] = useState<number | null>(null);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [waybill, setWaybill] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { handleSubmit, reset, control, getValues } = useForm();
  const values = getValues();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    agent,
    store,
    driver,
    costType,
    start_date,
    end_date,
  }: FieldValues) => {
    handleChangePage(1);
    getOrders({
      agent: agent?.id,
      store: store?.id,
      driver: driver?.id,
      costType: costType?.id,
      start_date,
      end_date,
    });
  };

  const getOrders = async ({
    agent = '',
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
        `/core/order_second/?agent=${agent}&status=new` +
          `&store=${store}&driver=${driver}&costType=${costType}&start_date=${start_date}` +
          `&end_date=${end_date}&ordering=-dateCreated&page=${page}`
      );

      const responseCount = await axiosReq.post<ICount>('/core/count_orders/', {
        status: 'new',
        store: store || null,
        agent: agent || null,
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

  const handleCancelOrder = async (orderID: number) => {
    const orderCancel = toast.loading(
      'Отменение заказа в процессе. Пожалуйста, подождите.'
    );

    try {
      await axiosReq.patch<IOrders>(`/core/order/${orderID}/`, {
        status: 'cancelled',
      });

      toast.update(orderCancel, {
        render: 'Заказ успешно отменён.',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      getOrders({
        agent: values.agent?.id || '',
        store: values.store?.id || '',
        driver: values.driver?.id || '',
        costType: values.costType?.id || '',
        start_date: values.start_date || '',
        end_date: values.end_date || '',
      });
    } catch (error: any) {
      toast.update(orderCancel, {
        render:
          error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
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
      store: { label: '', id: '' },
      driver: { label: '', id: '' },
      costType: { label: '', id: '' },
      start_date: '',
      end_date: '',
    });
    getOrders({});
  };

  const getOrdersAfterOneC = () => {
    getOrders({
      agent: values.agent?.id || '',
      store: values.store?.id || '',
      driver: values.driver?.id || '',
      costType: values.costType?.id || '',
      start_date: values.start_date || '',
      end_date: values.end_date || '',
    });
  };

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleMap = () => {
    setMap((prev) => !prev);
  };

  const handleWaybill = () => {
    setWaybill('');
  };

  const handleCloseOrderModal = (value: number | null) => {
    setOrderID(value);
  };

  useEffect(() => {
    getOrders({
      agent: values.agent?.id || '',
      store: values.store?.id || '',
      driver: values.driver?.id || '',
      costType: values.costType?.id || '',
      start_date: values.start_date || '',
      end_date: values.end_date || '',
    });
  }, [page]);

  return {
    map,
    page,
    open,
    count,
    orders,
    status,
    control,
    waybill,
    orderID,
    onSubmit,
    handleMap,
    setWaybill,
    handleClose,
    countOrders,
    handleSubmit,
    handleWaybill,
    handleChangePage,
    rowSelectionModel,
    handleCancelOrder,
    handleResetFields,
    getOrdersAfterOneC,
    setRowSelectionModel,
    handleCloseOrderModal,
  };
};

export default useNewOrderService;
