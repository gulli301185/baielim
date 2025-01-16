import { useAddCategoryMutation } from '@/app/slices/categoryApi';
import { Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewCategoryService = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [loading, setLoading] = useState<Status>('initial');
  const [imgForShow, setImgForShow] = useState('');

  const onSubmit: SubmitHandler<FieldValues> = async ({
    name,
    nameKg,
    nameEn,
    icon,
  }: FieldValues) => {
    setLoading('loading');

    try {
      let link: any = '';
      if (icon) {
        const { success, data } = await uploadIMG({
          photo: icon,
          axiosInstance,
        });

        if (!success) throw new Error(data);

        link = data;
      }

      const dataToSend = {
        name,
        nameKg,
        nameEn,
        icon: link.image,
      };

      await addCategory(dataToSend).unwrap();

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
    imgForShow,
    setImgForShow,
    handleSubmit,
  };
};

export default useNewCategoryService;
