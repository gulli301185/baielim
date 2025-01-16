import { useAddFAQMutation } from '@/app/slices/faqApi';
import { Status } from '@/shared/types';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewFAQService = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addFAQ, { isLoading }] = useAddFAQMutation();
  const [loading, setLoading] = useState<Status>('initial');

  const onSubmit: SubmitHandler<FieldValues> = async ({
    priority,
    question,
    answer,
  }: FieldValues) => {
    setLoading('loading');

    try {
      const dataToSend = {
        priority,
        question,
        answer,
      };

      await addFAQ(dataToSend).unwrap();

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

  return { control, handleSubmit, errors, onSubmit, isLoading, loading };
};

export default useNewFAQService;
