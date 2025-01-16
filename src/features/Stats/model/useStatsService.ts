import { useGetItemMarginsQuery } from '@/app/slices/itemApi';
import { IStatistic, IStatisticItems, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  store?: string | null;
  agent?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  costType?: string | null;
};

const useStatsService = () => {
  const axiosReq = useAxiosRequest();

  const [stats, setStats] = useState<IStatistic[]>([]);
  const [itemsStats, setItemsStats] = useState<IStatisticItems[]>([]);
  const [status, setStatus] = useState<Status>('initial');
  const { data = [] } = useGetItemMarginsQuery();

  const { handleSubmit, reset, control } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    store,
    agent,
    start_date,
    end_date,
    costType,
  }: FieldValues) => {
    getOrdersStats({
      store: store?.id,
      agent: agent?.id,
      costType: costType?.id,
      start_date,
      end_date,
    });
  };

  const getOrdersStats = async ({
    store = null,
    agent = null,
    costType = null,
    start_date = null,
    end_date = null,
  }: Props) => {
    try {
      setStatus('loading');
      const [responseOrders, responseItems] = await Promise.all([
        axiosReq.post<{ data: IStatistic[] }>('/core/orders_statistic/', {
          store,
          agent,
          costType,
          start_date,
          end_date,
        }),
        axiosReq.post<{ data: Record<string, IStatisticItems> }>(
          '/core/count_items/',
          {
            store,
            agent,
            costType,
            start_date,
            end_date,
          }
        ),
      ]);

      //@ts-ignore
      const itemsWithNames: IStatisticItems[] = Object.entries(
        responseItems.data
      ).map(([key, value]) => ({
        ...value,
        name: key,
      }));

      setStats(responseOrders.data.data);
      setItemsStats(itemsWithNames);
      setStatus('success');
    } catch (error) {
      setStats([]);
      setItemsStats([]);
      setStatus('error');
    }
  };

  const handleResetFields = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    reset({
      store: { label: '', id: '' },
      agent: { label: '', id: '' },
      costType: { label: '', id: '' },
      start_date: '',
      end_date: '',
    });
    getOrdersStats({});
  };

  useEffect(() => {
    getOrdersStats({});
  }, []);

  return {
    data,
    stats,
    status,
    control,
    onSubmit,
    itemsStats,
    handleSubmit,
    handleResetFields,
  };
};

export default useStatsService;
