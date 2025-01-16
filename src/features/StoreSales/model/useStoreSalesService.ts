import { IStoreSales, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const useStoreSalesService = () => {
  const axiosReq = useAxiosRequest();

  const [stats, setStats] = useState<IStoreSales[]>([]);
  const [status, setStatus] = useState<Status>('initial');

  const { handleSubmit, reset, control, register } = useForm<FieldValues>({
    defaultValues: {
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      startSum: 0,
      endSum: 0,
    },
  });

  const fetchStoreSales = async (params: Partial<FieldValues> = {}) => {
    try {
      setStatus('loading');

      const {
        start_date = dayjs().format('YYYY-MM-DD'),
        end_date = dayjs().format('YYYY-MM-DD'),
        startSum = 0,
        endSum = 0,
      } = params;

      const response = await axiosReq.post<{ data: IStoreSales[] }>(
        '/core/stores_orders/',
        {
          dateStart: start_date,
          dateEnd: end_date,
          startSum: +startSum,
          endSum: +endSum,
        }
      );

      //@ts-ignore
      const formattedData = response.data.map((item, index) => ({
        id: item.store?.id || index,
        ...item,
      }));

      setStats(formattedData);
      setStatus('success');
    } catch {
      setStats([]);
      setStatus('error');
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    fetchStoreSales(formData);
  };

  const handleResetFields = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reset();
    fetchStoreSales();
  };

  useEffect(() => {
    fetchStoreSales();
  }, []);

  return {
    stats,
    status,
    control,
    onSubmit,
    register,
    handleSubmit,
    handleResetFields,
  };
};

export default useStoreSalesService;
