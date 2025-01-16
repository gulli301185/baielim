import { IStoreDayPlan, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const useEditStoreDayPlan = ({
  setStorePlans,
  handleClose,
  open,
}: {
  setStorePlans: (value: any) => void;
  handleClose: (id: string) => void;
  open: string;
}) => {
  const axiosInstance = useAxiosRequest();

  const [isLoading, setLoading] = useState<Status>('initial');

  const { control, handleSubmit } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          comment: data.comment,
          madeOrder: data.madeOrder,
          status: data.status,
          store: { label: data.store.name, id: data.store.id },
        };
      } else {
        return null;
      }
    },
  });

  const fetchData = async () => {
    setLoading('loading');

    try {
      const { data } = await axiosInstance.get<IStoreDayPlan>(
        `/user/storePlan/${open}/`
      );
      setLoading('success');
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({
    comment,
    madeOrder,
    status,
    store,
  }: FieldValues) => {
    try {
      const dataToSend = {
        comment,
        madeOrder,
        status,
        store: `${store.id}`,
      };

      const response = await axiosInstance.patch<IStoreDayPlan>(
        `/user/storePlan/${open}/`,
        dataToSend
      );

      setStorePlans((prevPlans: IStoreDayPlan[]) =>
        prevPlans.map((plan) =>
          plan.id === response.data.id ? response.data : plan
        )
      );

      handleClose('');
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  return {
    control,
    onSubmit,
    isLoading,
    handleSubmit,
  };
};

export default useEditStoreDayPlan;
