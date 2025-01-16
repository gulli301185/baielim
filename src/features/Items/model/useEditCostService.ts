import { ICosts, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type CloseParams = {
  id: number;
  index: number;
} | null;

const useEditCostService = ({
  handleClose,
  setOldCosts,
  open,
}: {
  open: CloseParams;
  handleClose: (params: CloseParams) => void;
  setOldCosts: any;
}) => {
  const axiosReq = useAxiosRequest();
  const [status, setStatus] = useState<Status>('initial');

  const { control, handleSubmit } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          cost: data.cost,
          bonusAmount: data.bonusAmount,
        };
      } else {
        return null;
      }
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({
    cost,
    bonusAmount,
  }: FieldValues) => {
    setStatus('loading');

    try {
      await axiosReq.patch<ICosts>(`/core/cost/${open?.id}/`, {
        cost,
        bonusAmount,
      });

      setOldCosts((prevCosts: any) =>
        prevCosts.map((elem: any) =>
          elem.id === open?.id ? { ...elem, cost, bonusAmount } : elem
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
      const { data } = await axiosReq.get(`/core/cost/${open?.id}/`);
      setStatus('success');
      return { success: true, data };
    } catch (error) {
      setStatus('error');
      return { success: false, data: undefined };
    }
  };

  return {
    status,
    control,
    onSubmit,
    handleSubmit,
  };
};

export default useEditCostService;
