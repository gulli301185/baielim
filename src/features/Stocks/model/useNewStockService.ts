import { useAddStockMutation } from '@/app/slices/stockApi';
import { IImage } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewStockService = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosRequest();

  const { control, handleSubmit } = useForm();
  const [addStock, { isLoading }] = useAddStockMutation();
  const [imgForShow, setImgForShow] = useState('');

  const onSubmit: SubmitHandler<FieldValues> = async ({
    title,
    deadline,
    description,
    photo,
  }: FieldValues) => {
    try {
      let link: IImage | any = '';
      if (photo) {
        const { success, data } = await uploadIMG({ photo, axiosInstance });

        if (!success) throw new Error(data);

        link = data;
      }

      const dataToSend = {
        title,
        deadline,
        description,
        photo: link.image,
      };

      await addStock(dataToSend).unwrap();

      navigate(-1);
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    setImgForShow,
    imgForShow,
    isLoading,
  };
};

export default useNewStockService;
