import { useAddRegionMutation } from '@/app/slices/regionApi';
import { Status } from '@/shared/types';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewRegionService = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addRegion, { isLoading }] = useAddRegionMutation();
  const [loading, setLoading] = useState<Status>('initial');

  const onSubmit: SubmitHandler<FieldValues> = async ({
    name,
  }: FieldValues) => {
    setLoading('loading');

    try {
      const dataToSend = {
        name,
      };

      await addRegion(dataToSend).unwrap();

      setLoading('success');
      navigate(-1);
    } catch (error: any) {
      setLoading('error');
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  return {
    errors,
    control,
    loading,
    onSubmit,
    isLoading,
    handleSubmit,
  };
};

export default useNewRegionService;
