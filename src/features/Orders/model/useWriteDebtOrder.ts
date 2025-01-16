import { Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

type Props = {
  open: number | null;
  handleClose: (value: number | null) => void;
  fetchData: () => void;
};

const useWriteDebtOrder = ({ handleClose, open, fetchData }: Props) => {
  const { orderID } = useParams();
  const axiosReq = useAxiosRequest();

  const [status, setStatus] = useState<Status>('initial');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    comment,
    sum,
  }: FieldValues) => {
    setStatus('loading');

    try {
      const parsedSum = parseInt(sum);

      const dataToSend = {
        comment,
        sum: parsedSum,
        order: parseInt(orderID!),
      };

      const remainingDebt = open! - parsedSum;

      await axiosReq.patch(`/core/order/${orderID}/`, {
        amountLeft: remainingDebt,
      });
      await axiosReq.post('/core/transactionOrder/', dataToSend);

      setStatus('success');
      handleClose(null);
      fetchData();
    } catch (error) {
      setStatus('error');
    }
  };

  return { handleSubmit, control, onSubmit, status, errors };
};

export default useWriteDebtOrder;
