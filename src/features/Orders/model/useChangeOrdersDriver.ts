import { Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError, toastSuccess } from '@/shared/utils/helpers/toastify';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  rowSelectionModel: GridRowSelectionModel;
  handleClose: () => void;
  getNewOrders: ({}: any) => void;
};

const useChangeOrdersDriver = ({
  rowSelectionModel,
  handleClose,
  getNewOrders,
}: Props) => {
  const axiosInstance = useAxiosRequest();

  const [status, setStatus] = useState<Status>('initial');

  const { control, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    driver,
  }: FieldValues) => {
    setStatus('loading');
    try {
      const promises = rowSelectionModel.map((order) =>
        axiosInstance.patch(`/core/order/${order}/`, {
          driver: driver?.id,
        })
      );

      await Promise.all(promises);

      setStatus('success');
      toastSuccess('Все выбранные заказы успешно обновлены новым водителем');
      handleClose();
      getNewOrders({});
    } catch (error: any) {
      setStatus('error');
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  return {
    status,
    control,
    onSubmit,
    handleSubmit,
  };
};

export default useChangeOrdersDriver;
