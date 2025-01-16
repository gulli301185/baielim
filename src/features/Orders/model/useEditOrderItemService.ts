import { Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  open: number | null;
  handleClose: (value: number | null) => void;
  setOldItems: any;
};

const useEditOrderItemService = ({ handleClose, open, setOldItems }: Props) => {
  const axiosReq = useAxiosRequest();

  const [status, setStatus] = useState<Status>('initial');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          items: {
            label: data.item.name,
            id: data.item.id,
          },
          count: data.count,
        };
      } else {
        return null;
      }
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({
    count,
  }: FieldValues) => {
    setStatus('loading');

    try {
      await axiosReq.patch(`/core/orderItem/${open}/`, { count });

      setOldItems((prevItems: any) =>
        prevItems.map((item: any) =>
          item.id === open ? { ...item, count } : item
        )
      );

      setStatus('success');
      handleClose(null);
    } catch (error: any) {
      setStatus('error');
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const fetchData = async () => {
    setStatus('loading');

    try {
      const { data } = await axiosReq.get(`/core/orderItem/${open}/`);
      setStatus('success');
      return { success: true, data };
    } catch (error) {
      setStatus('error');
      return { success: false, data: undefined };
    }
  };

  return { status, handleSubmit, control, errors, onSubmit };
};

export default useEditOrderItemService;
