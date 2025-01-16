import { db } from '@/app/firebase';
import { Status } from '@/shared/types';
import { toastError, toastSuccess } from '@/shared/utils/helpers/toastify';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const useNewDeletionRequestService = ({ shamal }: { shamal: boolean }) => {
  const [status, setStatus] = useState<Status>('initial');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    phone,
    comment,
  }: FieldValues) => {
    setStatus('loading');

    try {
      const requestRef = collection(
        db,
        shamal ? 'deletion_req_shamal' : 'deletion_req'
      );
      await addDoc(requestRef, {
        phone,
        comment: comment || '',
      });

      reset({
        phone: '',
        comment: '',
      });
      setStatus('success');
      toastSuccess('Запрос на удаление персональных данных успешно отправлен');
    } catch (error) {
      setStatus('error');
      toastError('Возникла ошибка. Пожалуйста, повторите попытку позже');
    }
  };

  return { handleSubmit, control, onSubmit, status, errors };
};

export default useNewDeletionRequestService;
