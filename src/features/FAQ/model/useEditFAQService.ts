import { useEditFAQMutation } from '@/app/slices/faqApi';
import { IFAQ, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditFAQService = () => {
  const navigate = useNavigate();
  const { faqID } = useParams();
  const axiosInstance = useAxiosRequest();

  const [editFAQ, { isLoading }] = useEditFAQMutation();
  const [loading, setLoading] = useState<Status>('initial');

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          question: data?.question,
          answer: data?.answer,
          priority: data?.priority,
          id: data?.id,
        };
      } else {
        return null;
      }
    },
  });

  const fetchData = async () => {
    setLoading('loading');

    try {
      const { data } = await axiosInstance.get<IFAQ>(`/category/FAQ/${faqID}/`);
      setLoading('success');
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  const values = getValues();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    priority,
    question,
    answer,
  }: FieldValues) => {
    setLoading('loading');

    try {
      const dataToSend = {
        id: values.id || faqID,
        priority,
        question,
        answer,
      };

      await editFAQ(dataToSend).unwrap();

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

  return { isLoading, control, loading, handleSubmit, onSubmit, errors };
};

export default useEditFAQService;
